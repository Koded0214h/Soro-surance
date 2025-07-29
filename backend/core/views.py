from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status, generics
from rest_framework.permissions import AllowAny, IsAdminUser
import requests, time
import os

from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.contrib.auth import get_user_model

from .serializers import (
    RegisterSerializer, ClaimSerializer,
    AttachmentSerializer
)
from .models import (
    Claim, Attachment
)
from .utils.send_email import send_claim_confirmation_email

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

class VoiceToTextView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        audio_file = request.FILES.get('audio')
        if not audio_file:
            return Response({'error': 'No audio file provided.'}, status=400)

        headers = {
            "authorization": settings.ASSEMBLYAI_API_KEY,
        }

        # Upload audio file to AssemblyAI
        upload_response = requests.post(
            'https://api.assemblyai.com/v2/upload',
            headers=headers,
            files={'file': audio_file}
        )

        if upload_response.status_code != 200:
            return Response({'error': 'Failed to upload audio.'}, status=500)

        upload_url = upload_response.json().get('upload_url')

        # Start transcription
        transcribe_response = requests.post(
            'https://api.assemblyai.com/v2/transcript',
            json={"audio_url": upload_url},
            headers=headers
        )

        transcript_id = transcribe_response.json().get('id')
        if not transcript_id:
            return Response({'error': 'Transcription request failed.'}, status=500)

        # Polling for result
        while True:
            poll_response = requests.get(
                f'https://api.assemblyai.com/v2/transcript/{transcript_id}',
                headers=headers
            ).json()

            if poll_response['status'] == 'completed':
                return Response({'transcript': poll_response['text']}, status=200)
            elif poll_response['status'] == 'error':
                return Response({'error': 'Transcription failed.'}, status=500)

            time.sleep(2)

class ClaimCreateView(generics.CreateAPIView):
    queryset = Claim.objects.all()
    serializer_class = ClaimSerializer
    permission_classes = [AllowAny]  # Guest-friendly

    def perform_create(self, serializer):
        user = self.request.user if self.request.user.is_authenticated else None
        claim = serializer.save(submitted_by=user)

        # Determine who to send email to
        if user and user.email:
            # Logged-in user
            to_email = user.email
            is_guest = False
        else:
            # Check for guest email passed via request.data (your frontend should send this)
            to_email = self.request.data.get("email")
            is_guest = True

        if to_email:
            send_claim_confirmation_email(claim, to_email, is_guest)

        
class ClaimDetailView(generics.RetrieveAPIView):
    queryset = Claim.objects.all()
    serializer_class = ClaimSerializer
    lookup_field = 'id'
    
class TrackClaimView(APIView):
    def get(self, request):
        claim_id = request.query_params.get('claim_id')
        if not claim_id:
            return Response({"error": "Missing claim_id"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            claim = Claim.objects.get(claim_id=claim_id)
        except Claim.DoesNotExist:
            return Response({"error": "Claim not found"}, status=status.HTTP_404_NOT_FOUND)
        
        return Response({
            "claim_id": claim.claim_id,
            "status": claim.status,
            "type": claim.claim_type,
            "submitted_at": claim.created_at,
            "location": claim.location,
        })
    
class AdminClaimListView(generics.ListAPIView):
    queryset = Claim.objects.all().order_by('-created_at')
    serializer_class = ClaimSerializer
    permission_classes = [IsAdminUser]
    
class AdminClaimUpdateView(generics.UpdateAPIView):
    queryset = Claim.objects.all()
    serializer_class = ClaimSerializer
    permission_classes = [IsAdminUser]
    lookup_field = 'id'

    def patch(self, request, *args, **kwargs):
        claim = self.get_object()
        status_value = request.data.get('status')
        
        if status_value not in ['pending', 'in_review', 'resolved', 'rejected']:
            return Response({'error': 'Invalid status value.'}, status=400)
        
        claim.status = status_value
        claim.save()
        return Response({'message': 'Claim status updated.', 'claim_id': claim.claim_id, 'new_status': claim.status})
    
    
class AttachmentUploadView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, claim_id):
        try:
            claim = Claim.objects.get(claim_id=claim_id)
        except Claim.DoesNotExist:
            return Response({'error': 'Claim not found.'}, status=status.HTTP_404_NOT_FOUND)

        file_obj = request.FILES.get('file')
        if not file_obj:
            return Response({'error': 'No file uploaded.'}, status=status.HTTP_400_BAD_REQUEST)

        # Accepted MIME types
        allowed_types = [
            'image/jpeg', 'image/jpg', 'image/png',
            'image/webp', 'application/pdf', 'video/mp4'
        ]

        # Fallback content type based on file extension
        file_type = file_obj.content_type
        if not file_type:
            ext = os.path.splitext(file_obj.name)[-1].lower()
            ext_to_type = {
                '.jpg': 'image/jpeg',
                '.jpeg': 'image/jpeg',
                '.png': 'image/png',
                '.webp': 'image/webp',
                '.pdf': 'application/pdf',
                '.mp4': 'video/mp4',
            }
            file_type = ext_to_type.get(ext)

        if file_type not in allowed_types:
            return Response({
                'error': f"Invalid file type '{file_type}'. Allowed types: {', '.join(allowed_types)}"
            }, status=status.HTTP_400_BAD_REQUEST)

        attachment = Attachment.objects.create(claim=claim, file=file_obj)
        serializer = AttachmentSerializer(attachment)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
def send_claim_confirmation_email(claim, to_email, is_guest=False):
    subject = f"📝 Claim Submitted: {claim.claim_id}"
    from_email = "Claim Whisperer <no-reply@yourdomain.com>"
    tracker_url = f"http://127.0.0.1:8000/track?claim_id={claim.claim_id}"  # change to your frontend tracker link

    html_content = render_to_string("email/claim_confirmation.html", {
        "user_name": claim.user.first_name if claim.user else "",
        "claim_id": claim.claim_id,
        "status": claim.status,
        "tracker_url": tracker_url,
        "is_guest": is_guest
    })

    email = EmailMultiAlternatives(subject, "", from_email, [to_email])
    email.attach_alternative(html_content, "text/html")
    email.send()