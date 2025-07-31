// Listening.js
import React, { useState, useRef, useEffect } from 'react';
import { FaMicrophone, FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Navbar from '../component/Navbar';

const Listening = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [statusText, setStatusText] = useState('Tap to Start Listening');
  const [confirmed, setConfirmed] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const recognitionRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const navigate = useNavigate();

  // Initialize speech recognition and audio recording
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition not supported in your browser. Try Chrome or Edge.');
      return;
    }

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = 'en-US';

    recognitionRef.current.onresult = (event) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setTranscription(transcript);
    };

    recognitionRef.current.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      stopRecording();
      setStatusText('Error occurred - Tap to try again');
    };

    return () => {
      stopRecording();
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setAudioBlob(blob);
      };

      mediaRecorderRef.current.start();
      recognitionRef.current.start();
      setIsListening(true);
      setStatusText('Listening... Speak now');
    } catch (err) {
      console.error('Error accessing microphone:', err);
      setStatusText('Microphone access denied');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
    setStatusText('Tap to Start Listening');
  };

  const toggleListening = () => {
    if (isListening) {
      stopRecording();
    } else {
      setTranscription('');
      setConfirmed(false);
      startRecording();
    }
  };

  const confirmClaim = () => {
    if (!audioBlob) return;
    
    setConfirmed(true);
    const audioUrl = URL.createObjectURL(audioBlob);
    
    navigate('/details', {
      state: {
        audioUrl,
        transcription,
        claimData: {
          id: `CLAIM-${Date.now()}`,
          date: new Date().toLocaleString(),
          status: 'Submitted'
        }
      }
    });
  };

  return (
    <>
      <Navbar />
      <div style={{
        minHeight: '100vh',
        background: 'black',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        fontFamily: 'Inter, sans-serif',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '0.5rem', color: '#e87d30', marginTop: '4rem' }}>
          SoroSurance
        </h1>
        <h2 style={{ fontSize: '1.125rem', color: '#d1d5db', marginBottom: '1.5rem' }}>
          {confirmed ? '🎉 Claim Submitted!' : 'Listening to your claim...'}
        </h2>

        {!confirmed && (
          <div style={{ maxWidth: '28rem', marginBottom: '2rem' }}>
            <p style={{ color: '#9ca3af' }}>
              <strong>Speak clearly.</strong> Describe your claim in detail.
            </p>
          </div>
        )}

        <div style={{
          position: 'relative',
          width: '220px',
          height: '220px',
          margin: '20px auto',
          cursor: confirmed ? 'default' : 'pointer'
        }} onClick={!confirmed ? toggleListening : null}>
          <div style={{
            width: '100%',
            height: '100%',
            background: isListening
              ? 'linear-gradient(145deg, #08fdd8, #4bffa5)'
              : confirmed
              ? 'linear-gradient(145deg, #4ade80, #16a34a)'
              : 'linear-gradient(145deg, #00d9ff, #007bff)',
            borderRadius: '50%',
            boxShadow: isListening
              ? '0 0 30px rgba(8, 253, 216, 0.7)'
              : confirmed
              ? '0 0 30px rgba(74, 222, 128, 0.7)'
              : '0 0 20px rgba(0, 162, 255, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '24px',
            transition: 'all 0.3s ease'
          }}>
            {confirmed ? <FaCheck /> : <FaMicrophone />}
          </div>
        </div>

        <p style={{ marginTop: '1rem', color: '#d1d5db' }}>
          {confirmed ? 'Processing your claim...' : statusText}
        </p>

        {!confirmed && transcription && (
          <button
            style={{
              marginTop: '2rem',
              padding: '0.75rem 2rem',
              borderRadius: '9999px',
              fontWeight: '600',
              fontSize: '1rem',
              backgroundColor: '#22c55e',
              color: 'white',
              cursor: 'pointer',
              border: 'none',
              boxShadow: '0 8px 20px rgba(34, 197, 94, 0.4)'
            }}
            onClick={confirmClaim}
          >
            Submit Claim
          </button>
        )}
      </div>
    </>
  );
};

export default Listening;