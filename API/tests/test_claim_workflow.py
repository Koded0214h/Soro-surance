import requests
import time
import sys

# === CONFIG ===
BASE_URL = "http://localhost:8000/api"
JWT_TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzUzNDQ5MTI2LCJpYXQiOjE3NTM0NDg4MjYsImp0aSI6IjQzODE4YzNjZDM2ZTQzYWJiYTZjYTM5MmVlM2UxOGJkIiwidXNlcl9pZCI6M30.7MXRt2pMjpwCvOsXOvBOGUhe-te_T0RCqC-umnx8tRw"  # 🔐 Replace with a valid token
AUDIO_PATH = "vivian_voice_claim.mp3"        # 🎙️ Use any audio file (local language, pidgin, etc.)
FILE_PATH = "image.jpeg"                     # 🖼️ Try .jpeg, .pdf, .mp4
CLAIM_LOCATION = "Isolo, Lagos"
CLAIM_TYPE = "auto"                          # 🚗 or use "health", "fire", etc. from your DB
INCIDENT_DATE = "2025-07-01"

HEADERS = {
    "Authorization": JWT_TOKEN
}

def safe_exit(message):
    print(f"❌ {message}")
    sys.exit(1)

# === STEP 1: Transcribe Voice ===
print("🎙 Uploading voice file for transcription...")

try:
    with open(AUDIO_PATH, 'rb') as audio:
        voice_response = requests.post(
            f"{BASE_URL}/claims/voice/",
            headers=HEADERS,
            files={"audio": audio}
        )
except FileNotFoundError:
    safe_exit(f"Voice file '{AUDIO_PATH}' not found.")

if voice_response.status_code != 200:
    safe_exit(f"Voice transcription failed: {voice_response.json()}")

data = voice_response.json()
print("✅ Transcribed & Translated:")
print(f"  📜 Original: {data['original_text']}")
print(f"  🌐 Translated: {data['translated_text']}")

# === STEP 2: Submit Claim ===
print("\n📄 Submitting claim...")

claim_payload = {
    "description": data["translated_text"],
    "voice_transcript": data["original_text"],
    "location": CLAIM_LOCATION,
    "claim_type": CLAIM_TYPE,
    "incident_date": INCIDENT_DATE
}

claim_response = requests.post(
    f"{BASE_URL}/claims/",
    headers={**HEADERS, "Content-Type": "application/json"},
    json=claim_payload
)

if claim_response.status_code != 201:
    safe_exit(f"Claim submission failed: {claim_response.json()}")

submitted_claim = claim_response.json()
CLAIM_ID = submitted_claim.get("claim_id")
print(f"✅ Claim submitted with ID: {CLAIM_ID}")

# === STEP 3: Upload Attachment ===
print("\n🖼 Uploading evidence file...")

try:
    with open(FILE_PATH, 'rb') as file:
        file_response = requests.post(
            f"{BASE_URL}/claims/{CLAIM_ID}/upload/",
            headers=HEADERS,
            files={"file": file}
        )
except FileNotFoundError:
    safe_exit(f"Attachment file '{FILE_PATH}' not found.")

if file_response.status_code != 201:
    safe_exit(f"File upload failed: {file_response.json()}")

print("✅ File uploaded:")
print(file_response.json())

# === DONE ===
print("\n🎉 All steps completed successfully!")
