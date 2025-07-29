# uploadDocToClaim.py
import requests

# === CONFIG ===
claim_id = "CW-8068BD"  # update with valid claim_id
token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzUxODQ5ODExLCJpYXQiOjE3NTE4NDk1MTEsImp0aSI6ImVmOWRmYjM4NmEwZDQ4NmNhMjQwNzEwMzE4MzI4ODRlIiwidXNlcl9pZCI6Mn0.oPQR3i_VS-LIEeDDIFn07hHM9FWZ6qtWvra6mzd6B5M"  # paste your current JWT access token
file_path = "image.jpeg"  # try also .png, .pdf, .mp4

url = f"http://localhost:8000/api/claims/{claim_id}/upload/"
headers = {
    "Authorization": token
}

print(f"📤 Uploading file: {file_path}")
files = {
    'file': open(file_path, 'rb')
}

response = requests.post(url, files=files, headers=headers)

print("Status Code:", response.status_code)
try:
    print("Response:", response.json())
except Exception:
    print("⚠️ Could not decode JSON. Raw response:")
    print(response.text)
