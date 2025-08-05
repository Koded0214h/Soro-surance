from rest_framework import serializers
from rest_framework import serializers
from datetime import datetime, timedelta
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
        ]
        read_only_fields = ['id', 'claim_id', 'user', 'status', 'created_at']


class AttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attachment
        fields = ['id', 'file', 'uploaded_at']
        read_only_fields = ['id', 'uploaded_at']

class AdminMetricsSerializer(serializers.Serializer):
    total_claims = serializers.IntegerField()
    approved_claims = serializers.IntegerField()
    flagged_claims = serializers.IntegerField()
    rejected_claims = serializers.IntegerField()
    received_change = serializers.FloatField()
    approved_change = serializers.FloatField()
    flagged_change = serializers.FloatField()
    rejected_change = serializers.FloatField()

class TrendsSerializer(serializers.Serializer):
    months = serializers.ListField(child=serializers.CharField())
    claim_counts = serializers.ListField(child=serializers.IntegerField())
    trend_change = serializers.FloatField()

class FraudSerializer(serializers.Serializer):
    months = serializers.ListField(child=serializers.CharField())
    fraud_scores = serializers.ListField(child=serializers.IntegerField())
    fraud_change = serializers.FloatField()