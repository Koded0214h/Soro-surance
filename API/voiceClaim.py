import requests

# === CONFIG ===
AUDIO_FILE_PATH = "voice_claim.mp3"  # 🔁 Your recorded voice memo
VOICE_URL = "http://localhost:8000/api/claims/voice/"
CLAIM_URL = "http://localhost:8000/api/claims/"
JWT_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzUxODQ3MjAyLCJpYXQiOjE3NTE4NDY5MDIsImp0aSI6IjkzYTAyNjZjYmQ5MTRiZDViNWRlNzY3ZjZkZDg3MjU3IiwidXNlcl9pZCI6Mn0.b_nuSf6mfk1lrUUafHVX-oE_vCDjHZdDgG91xMYU1yQ"

# === STEP 1: Upload voice and get transcript ===
print("🔁 Uploading voice...")

with open(AUDIO_FILE_PATH, 'rb') as audio_file:
    response = requests.post(
        VOICE_URL,
        headers={"Authorization": f"Bearer {JWT_TOKEN}"} if JWT_TOKEN else {},
        files={"audio": audio_file}
    )

if response.status_code != 200:
    print("❌ Voice upload failed:", response.status_code, response.json())
    exit()

transcript = response.json().get("transcript")
print("✅ Transcript:", transcript)

# === STEP 2: Submit claim ===
claim_data = {
    "description": transcript,
    "location": "Isolo, Lagos",  # 👈 you can change this
    "voice_transcript": transcript
}

print("📤 Submitting claim...")
claim_response = requests.post(
    CLAIM_URL,
    headers={
        "Authorization": f"Bearer {JWT_TOKEN}" if JWT_TOKEN else "",
        "Content-Type": "application/json"
    },
    json=claim_data
)

print("✅ Claim Response:")
print(claim_response.status_code)
print(claim_response.json())
