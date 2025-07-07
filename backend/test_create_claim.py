import requests

url = "http://127.0.0.1:8000/api/claims/"

payload = {
    "claim_type": "fire",
    "description": "Fire outbreak destroyed the kitchen and electronics.",
    "location": "Alimosho, Lagos",
    "incident_date": "2025-07-07",
    "voice_transcript": "There was a fire that destroyed our kitchen",
    "email": "guestclaim@example.com"  # Needed for anonymous claimants
}

response = requests.post(url, json=payload)

print("📨 Status Code:", response.status_code)
print("🧾 Response:", response.json())
