from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string

def send_claim_confirmation_email(claim, to_email, is_guest=False):
    subject = f"📝 Claim Submitted: {claim.claim_id}"
    from_email = "Soro surance <no-reply@yourdomain.com>"
    tracker_url = f"http://127.0.0.1:8000/track?claim_id={claim.claim_id}"

    user_name = claim.user.first_name if claim.user and claim.user.first_name else "there"

    html_content = render_to_string("email/claim_confirmation.html", {
        "user_name": user_name,
        "claim_id": claim.claim_id,
        "status": claim.status,
        "tracker_url": tracker_url,
        "is_guest": is_guest
    })

    text_content = f"""
    Hello {user_name},

    Thank you for submitting your claim to Soro surance.

    Claim ID: {claim.claim_id}
    Status: {claim.status.title()}

    Track your claim here: {tracker_url}

    { "You submitted as a guest. Login to manage your claims." if is_guest else "" }

    -- Soro surance Team
    """

    email = EmailMultiAlternatives(subject, text_content, from_email, [to_email])
    email.attach_alternative(html_content, "text/html")
    email.send()
