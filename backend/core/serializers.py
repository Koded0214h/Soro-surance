from rest_framework import serializers

from django.contrib.auth import get_user_model

from .models import Claim, Attachment

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = User
        fields = ['email', 'password', 'full_name', 'phone']

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            full_name=validated_data.get('full_name', ''),
            phone=validated_data.get('phone', ''),
            role='registered'
        )
        return user

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
            'created_at'
        ]
        read_only_fields = ['id', 'claim_id', 'user', 'status', 'created_at']


class AttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attachment
        fields = ['id', 'claim', 'file', 'uploaded_at']
        read_only_fields = ['id', 'uploaded_at']
