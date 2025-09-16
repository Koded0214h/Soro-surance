from rest_framework import serializers

from .models import Claim, Attachment

class ClaimSerializer(serializers.ModelSerializer):
    class Meta:
        model = Claim
        fields = [
            'id',
            'claim_id',
            'user',
            'claim_type',
            'description',
            'location',
            'incident_date',
            'voice_transcript',
            'status',
        ]
        read_only_fields = ['id', 'claim_id', 'user', 'status', 'created_at']


class AttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attachment
        fields = ['id', 'file', 'uploaded_at', 'claim']
        read_only_fields = ['id', 'uploaded_at']