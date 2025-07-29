import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from core.models import Claim
from django.contrib.auth import get_user_model
from datetime import date

User = get_user_model()

def test_claim_submission(user_id=None):
    user = User.objects.get(id=user_id) if user_id else None

    claim = Claim.objects.create(
        user=user,
        submitted_by=user,
        claim_type='fire',
        description='Fire accident at warehouse',
        location='Lagos',
        incident_date=date.today(),
    )

    print(f"✅ Claim created: {claim.claim_id}")

# Run test:
test_claim_submission(user_id=1)  # Logged-in user

# test_claim_submission(user_id=None)  # Anonymous user
