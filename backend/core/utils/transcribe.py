import whisper
import tempfile
from googletrans import Translator

model = whisper.load_model("small")  # Load once

def transcribe_and_translate(file):
    with tempfile.NamedTemporaryFile(delete=False, suffix=".mp3") as temp_file:
        for chunk in file.chunks():
            temp_file.write(chunk)
        temp_path = temp_file.name

    # Preprocess
    audio = whisper.load_audio(temp_path)
    audio = whisper.pad_or_trim(audio)
    mel = whisper.log_mel_spectrogram(audio).to(model.device)

    # === Language Detection ===
    detected_lang, probs = model.detect_language(mel)
    confidence = probs[detected_lang]
    print(f"📡 Detected language: {detected_lang} ({confidence*100:.2f}%)")

    # === Transcription ===
    result = model.transcribe(temp_path)
    original_text = result["text"].strip()

    # === Basic sanity check ===
    if not any(c.isalpha() for c in original_text) or len(original_text) < 5:
        return {
            "language": detected_lang,
            "original_text": "[Could not understand audio]",
            "translated_text": "[Could not understand audio]"
        }

    # === Translate (if needed) ===
    translated_text = original_text
    if detected_lang != "en":
        try:
            translator = Translator()
            translation = translator.translate(original_text, src=detected_lang, dest="en")
            translated_text = translation.text
        except Exception as e:
            print(f"⚠️ Translation failed: {e}")
            translated_text = "[Translation failed]"

    return {
        "language": detected_lang,
        "original_text": original_text,
        "translated_text": translated_text
    }
