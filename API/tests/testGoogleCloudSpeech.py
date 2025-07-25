from google.cloud import speech
import os

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "gcloud.json"

client = speech.SpeechClient()
print("🎉 Google Cloud Speech-to-Text is working!")
