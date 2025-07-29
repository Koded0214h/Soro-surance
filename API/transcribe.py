import whisper

model = whisper.load_model("small")
result = model.transcribe("vivian_voice_claim.mp3")
print(result["text"])
