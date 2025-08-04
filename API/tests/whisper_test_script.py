# IMPORTANT: Do not name this file 'whisper.py' as it will conflict with the library import.
# This is a test script to verify the OpenAI Whisper installation and functionality.
# It assumes you have an audio file named 'voice_claim_yo.mp3' in the same directory.
# If you don't have one, you can create a short one for this test.

import whisper
import os

def test_whisper_transcription(audio_file_path):
    """
    Loads the Whisper model, transcribes an audio file, and prints the result.
    
    Args:
        audio_file_path (str): The path to the audio file to transcribe.
    """
    if not os.path.exists(audio_file_path):
        print(f"Error: Audio file not found at '{audio_file_path}'")
        return
        
    print("Loading Whisper model...")
    try:
        # Load the 'medium' model for better accuracy, especially with less common languages.
        # You can also try 'large' if needed, but it will be slower.
        model = whisper.load_model("medium")
        print("Model loaded successfully.")

        print(f"Transcribing '{audio_file_path}'...")
        # Perform the transcription. We explicitly set the language to Yoruba.
        # The language code for Yoruba is 'yo'.
        result = model.transcribe(audio_file_path, language='yo')
        
        # Print the transcribed text
        print("\nTranscription Result:")
        print("---------------------")
        print(result["text"])
        
    except Exception as e:
        print(f"An error occurred during transcription: {e}")

if __name__ == "__main__":
    # Specify the path to your test audio file
    TEST_AUDIO_FILE = 'voice_claim_yo.mp3' 
    test_whisper_transcription(TEST_AUDIO_FILE)
