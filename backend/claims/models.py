from django.db import models
from django.conf import settings
import uuid

# Create your models here.

class Attachment(models.Model):
    file = models.FileField(upload_to='attachments/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    claim = models.ForeignKey(  # Add this foreign key
        'Claim', 
        on_delete=models.CASCADE, 
        related_name='attachments',
        null=True,
        blank=True
    )

    def __str__(self):
        if self.claim:
            return f"Attachment for {self.claim.claim_id}"
        return f"Attachment {self.id} (unassigned)"


class Claim(models.Model):
    CLAIM_TYPES = (
        ('auto', 'Auto Accident'),
        ('fire', 'Fire'),
        ('health', 'Health'),
        ('theft', 'Theft'),
        ('other', 'Other'),
    )

    STATUS_CHOICES = (
        ('submitted', 'Submitted'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
        ('pending', 'Pending'),
    )

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    claim_id = models.CharField(max_length=12, unique=True, blank=True)
    claim_type = models.CharField(max_length=20, choices=CLAIM_TYPES)
    description = models.TextField()
    location = models.CharField(max_length=255)
    incident_date = models.DateField()
    voice_transcript = models.TextField(blank=True, null=True)  # Stores the speech-to-text output
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='submitted')
    updated_at = models.DateTimeField(auto_now=True)
    submitted_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='claims'
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.claim_id:
            self.claim_id = f"CW-{uuid.uuid4().hex[:6].upper()}"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.claim_type} @ {self.location} (ID: {self.claim_id})"