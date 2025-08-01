import logging
import time
import requests
import io
import datetime
import os # Import the os module for API keys
import json # Import json to handle the LLM's response
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from django.conf import settings
from django.core.files.uploadedfile import InMemoryUploadedFile
import uuid
from rest_framework import status, generics
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
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


class VoiceToTextView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        try:
            audio_file = request.FILES.get('audio')
            if not isinstance(audio_file, InMemoryUploadedFile):
                return Response({'error': 'No valid audio file provided.'}, status=400)

            api_key = getattr(settings, 'ASSEMBLYAI_API_KEY', None)
            if not api_key:
                return Response({'error': 'AssemblyAI API key not configured.'}, status=500)
            
            gemini_api_key = os.environ.get('GEMINI_API_KEY', '') # Get Gemini API key from environment variables
            if not gemini_api_key:
                logging.error("GEMINI_API_KEY not found in environment variables.")
                return Response({'error': 'Gemini API key not configured.'}, status=500)

            # Headers for AssemblyAI
            headers = {
                "authorization": api_key,
                "content-type": "application/octet-stream"
            }
            
            # Read the audio file directly without any processing
            audio_data = audio_file.read()

            # Upload audio file to AssemblyAI
            upload_response = requests.post(
                'https://api.assemblyai.com/v2/upload',
                headers=headers,
                data=audio_data
            )

            if upload_response.status_code != 200:
                logging.error(f"AssemblyAI upload failed: {upload_response.text}")
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
                logging.error(f"AssemblyAI transcription request failed: {transcribe_response.text}")
                return Response({'error': 'Transcription request failed.'}, status=500)

            # Polling for result
            while True:
                # Use a new header for the GET request
                poll_headers = {"authorization": api_key}
                poll_response = requests.get(
                    f'https://api.assemblyai.com/v2/transcript/{transcript_id}',
                    headers=poll_headers
                ).json()

                if poll_response['status'] == 'completed':
                    transcript_text = poll_response['text']
                    
                    # --- NEW: Use Gemini LLM to extract claim details from the transcript ---
                    
                    # Define the prompt and JSON schema for the LLM
                    prompt = f"""
                    Extract the following information from the claim transcript:
                    1. A concise summary of the incident (description).
                    2. The type of claim.
                    3. The location of the incident.

                    Transcript: "{transcript_text}"

                    Available claim types are: 'auto', 'fire', 'health', 'theft', 'other'. If a type is not clearly stated, default to 'other'.
                    The location can be a general area or a specific address.
                    """

                    # Define the schema for the LLM's response
                    generation_config = {
                        "responseMimeType": "application/json",
                        "responseSchema": {
                            "type": "OBJECT",
                            "properties": {
                                "description": {"type": "STRING"},
                                "claim_type": {"type": "STRING"},
                                "location": {"type": "STRING"}
                            }
                        }
                    }

                    llm_headers = {
                        "Content-Type": "application/json"
                    }
                    llm_url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key={gemini_api_key}"
                    llm_payload = {
                        "contents": [{"parts": [{"text": prompt}]}],
                        "generationConfig": generation_config
                    }
                    
                    try:
                        llm_response = requests.post(llm_url, headers=llm_headers, data=json.dumps(llm_payload))
                        llm_response.raise_for_status() # Raise an exception for bad status codes
                        llm_data = llm_response.json()
                        
                        # Extract the JSON string from the LLM's response and parse it
                        extracted_json = llm_data['candidates'][0]['content']['parts'][0]['text']
                        extracted_details = json.loads(extracted_json)

                        extracted_description = extracted_details.get('description', '')
                        extracted_claim_type = extracted_details.get('claim_type', 'other')
                        extracted_location = extracted_details.get('location', 'Unspecified')

                    except (requests.RequestException, KeyError, json.JSONDecodeError) as e:
                        logging.error(f"LLM extraction failed: {e}")
                        # Fallback to default values in case of an error
                        extracted_description = transcript_text
                        extracted_claim_type = 'other'
                        extracted_location = 'Unspecified'

                    # --- END LLM extraction ---

                    # Create claim with extracted info
                    # NOTE: Assuming a 'Claim' model exists.
                    # from .models import Claim 
                    claim = Claim.objects.create(
                        user=request.user if request.user.is_authenticated else None, # Set the user
                        submitted_by=request.user if request.user.is_authenticated else None,
                        voice_transcript=transcript_text,
                        description=extracted_description, # Use the extracted description
                        claim_type=extracted_claim_type, # Use the extracted claim type
                        location=extracted_location, # Use the extracted location
                        status="pending",
                        incident_date=datetime.date.today() # Add the current date
                    )

                    return Response({
                        "claim_id": claim.claim_id,  # Use the actual claim ID
                        "transcription": transcript_text,
                        "description": extracted_description,
                        "claim_type": extracted_claim_type,
                        "location": extracted_location,
                        "message": "Claim created successfully."
                    }, status=200)

                elif poll_response['status'] == 'error':
                    logging.error(f"AssemblyAI transcription failed: {poll_response}")
                    return Response({'error': 'Transcription failed.'}, status=500)

                time.sleep(2)
        except Exception as e:
            logging.exception("Exception in VoiceToTextView:")
            return Response({'error': str(e)}, status=500)




class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

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

class UserClaimListView(generics.ListAPIView):
    serializer_class = ClaimSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Claim.objects.filter(submitted_by=user).order_by('-created_at')

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            "full_name": user.full_name,
            "email": user.email,
        })
    
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