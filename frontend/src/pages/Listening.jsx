import React, { useState, useEffect, useRef } from 'react';
import { FaMicrophone, FaCheck } from 'react-icons/fa';
import Navbar from '../component/Navbar';

const Listening = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [statusText, setStatusText] = useState('Tap to Start Listening');
  const [confirmed, setConfirmed] = useState(false);
  const recognitionRef = useRef(null);

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
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
        } else {
          interimTranscript += transcript;
        }
      }

      setTranscription(finalTranscript || interimTranscript);
    };

    recognitionRef.current.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
      setStatusText('Error occurred - Tap to try again');
    };

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      setStatusText('Tap to Start Listening');
    } else {
      setTranscription('');
      setConfirmed(false);
      recognitionRef.current.start();
      setIsListening(true);
      setStatusText('Listening... Speak now');
    }
  };

  const confirmClaim = () => {
    setConfirmed(true);
    alert('Claim submitted successfully!');
    setTimeout(() => {
      setConfirmed(false);
      setTranscription('');
    }, 3000);
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a, #1e293b)',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      fontFamily: 'Inter, sans-serif',
      textAlign: 'center'
    },
    orbContainer: {
      position: 'relative',
      width: '220px',
      height: '220px',
      margin: '20px auto',
      cursor: confirmed ? 'default' : 'pointer',
      animation: 'float 3s ease-in-out infinite'
    },
    orbCore: {
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
      zIndex: 2,
      position: 'relative',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '24px',
      transform: confirmed ? 'scale(1.1)' : 'scale(1)',
      animation: confirmed ? 'pop 0.4s ease-in-out' : 'none'
    },
    orbWave: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: '120px',
      height: '120px',
      background: isListening
        ? 'rgba(8, 253, 216, 0.15)'
        : confirmed
        ? 'rgba(74, 222, 128, 0.15)'
        : 'rgba(0, 162, 255, 0.2)',
      borderRadius: '50%',
      transform: 'translate(-50%, -50%) scale(1)',
      opacity: 0,
      zIndex: 1
    },
    wave1: {
      animation: 'pulse 2s infinite'
    },
    wave2: {
      animation: 'pulse 2s infinite 1s'
    },
    pulseKeyframes: `
      @keyframes pulse {
        0% {
          transform: translate(-50%, -50%) scale(1);
          opacity: 0.6;
        }
        100% {
          transform: translate(-50%, -50%) scale(1.8);
          opacity: 0;
        }
      }

      @keyframes pop {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1.1); }
      }

      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }
    `
  };

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <style>{styles.pulseKeyframes}</style>

        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.5rem', color: '#3fbac2', marginTop: '4rem' }}>
          SoroSurance
        </h1>
        <h2 style={{ fontSize: '1.125rem', color: '#d1d5db', marginBottom: '1.5rem' }}>
          {confirmed ? '🎉 Claim Submitted!' : 'Listening to your claim...'}
        </h2>

        {!confirmed && (
          <div style={{ maxWidth: '28rem', marginBottom: '2rem' }}>
            <p style={{ color: '#9ca3af' }}>
              <strong>Speak clearly.</strong> SoroSurance is transcribing in real-time.
            </p>
          </div>
        )}

        <div style={styles.orbContainer} onClick={!confirmed ? toggleListening : null}>
          <div style={styles.orbCore}>
            {confirmed ? <FaCheck /> : <FaMicrophone />}
          </div>
          {(isListening || confirmed) && (
            <>
              <div style={{ ...styles.orbWave, ...styles.wave1 }}></div>
              <div style={{ ...styles.orbWave, ...styles.wave2 }}></div>
            </>
          )}
        </div>

        <p style={{ marginTop: '1rem', color: '#d1d5db' }}>
          {confirmed ? 'Claim submitted successfully!' : statusText}
        </p>

        {!confirmed && (
          <div style={{ width: '100%', maxWidth: '42rem', marginTop: '3rem' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>
              Claim Transcription
            </h3>
            <div
              style={{
                backgroundColor: '#111827',
                padding: '1.5rem',
                borderRadius: '1rem',
                minHeight: '10rem',
                border: '1px solid #3b82f6',
                boxShadow: '0 5px 15px rgba(59, 130, 246, 0.15)'
              }}
            >
              {transcription ? (
                <p style={{ color: '#f3f4f6' }}>{transcription}</p>
              ) : (
                <p style={{ color: '#6b7280', fontStyle: 'italic' }}>
                  {isListening ? 'Listening...' : 'Your claim transcription will appear here...'}
                </p>
              )}
            </div>
          </div>
        )}

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
              boxShadow: '0 8px 20px rgba(34, 197, 94, 0.4)',
              transition: 'transform 0.2s ease, background-color 0.2s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            onClick={confirmClaim}
          >
            Confirm Claim
          </button>
        )}
      </div>
    </>
  );
};

export default Listening;
