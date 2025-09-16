import os
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser

from rest_framework import status, generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import get_user_model

from .serializers import (
    ClaimSerializer,
    AttachmentSerializer
)
from .models import (
    Claim, Attachment
)
from .utils.send_email import send_claim_confirmation_email

User = get_user_model()


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
        
class UserClaimListView(generics.ListAPIView):
    serializer_class = ClaimSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Claim.objects.filter(submitted_by=user).order_by('-created_at')
    
    
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