from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
from .models import Claim
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string


@receiver(post_save, sender=Claim)
def send_claim_confirmation(sender, instance, created, **kwargs):
    if created:
        # Determine if user is anonymous
        is_anonymous = not (instance.user and instance.user.email)
        recipient_email = instance.user.email if instance.user and instance.user.email else None

        # You can skip sending if no email at all
        if not recipient_email:
            return

        subject = f"Your Claim (ID: {instance.claim_id}) was submitted"
        from_email = settings.DEFAULT_FROM_EMAIL
        to = [recipient_email]

        context = {
            "claim": instance,
            "is_anonymous": is_anonymous
        }

        html_content = render_to_string("email/claim_confirmation.html", context)
        text_content = f"""
Your insurance claim has been successfully submitted.

Claim ID: {instance.claim_id}
Location: {instance.location}
Date: {instance.incident_date}
Status: {instance.status}

Track your claim: https://your-domain.com/track?claim_id={instance.claim_id}
        """

        msg = EmailMultiAlternatives(subject, text_content, from_email, to)
        msg.attach_alternative(html_content, "text/html")
        msg.send()
