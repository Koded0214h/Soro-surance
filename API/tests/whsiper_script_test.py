#!/usr/bin/env python3
# IMPORTANT: Do not name this file 'whisper.py' as it will conflict with the library import.
# This script tests OpenAI Whisper with explicit Yoruba language settings.

import whisper
import os
import time

def test_whisper_transcription(audio_file_path):
    """
    Tests Whisper transcription with explicit Yoruba language settings.
    
    Args:
        audio_file_path (str): Path to the audio file to transcribe.
    """
    # Verify audio file exists
    if not os.path.exists(audio_file_path):
        print(f"Error: Audio file not found at '{audio_file_path}'")
        print("Please ensure:")
        print("1. The file exists in the current directory")
        print("2. You've typed the filename correctly")
        return
    
    print("\n=== Starting Whisper Yoruba Transcription Test ===")
    print(f"Audio file: {audio_file_path}")
    print(f"File size: {os.path.getsize(audio_file_path)/1024:.2f} KB")
    
    try:
        # Load model - using 'small' as it's better for Yoruba than 'base'
        print("\n[1/3] Loading Whisper small model...")
        start_time = time.time()
        model = whisper.load_model("small")
        load_time = time.time() - start_time
        print(f"Model loaded in {load_time:.2f} seconds")

        # Transcription with explicit Yoruba settings
        print("\n[2/3] Starting transcription (language='yo')...")
        transcribe_start = time.time()
        result = model.transcribe(
            audio_file_path,
            language='yo',  # Explicitly set to Yoruba
            verbose=True     # Show progress
        )
        transcribe_time = time.time() - transcribe_start
        
        print("\n[3/3] Transcription complete!")
        print(f"Processing time: {transcribe_time:.2f} seconds")
        
        # Display results
        print("\n=== Transcription Results ===")
        print(f"Detected language: {result.get('language', 'unknown')}")
        print(f"Language probability: {result.get('language_probability', 0):.2%}")
        print("\nTranscribed Text:")
        print("-----------------")
        print(result["text"])
        
        # Save to file
        output_file = "transcription_result.txt"
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(result["text"])
        print(f"\nTranscript saved to {output_file}")
        
    except Exception as e:
        print(f"\nERROR: Transcription failed - {str(e)}")
        print("Possible solutions:")
        print("- Try a different model size (small/medium)")
        print("- Check audio file quality")
        print("- Ensure FFmpeg is installed")
        print("- Try converting audio to 16kHz WAV format")

if __name__ == "__main__":
    # Configuration
    AUDIO_FILE = 'claim.wav'  # Change this to your audio file
    
    print("Whisper Yoruba Transcription Test")
    print("---------------------------------")
    test_whisper_transcription(AUDIO_FILE)