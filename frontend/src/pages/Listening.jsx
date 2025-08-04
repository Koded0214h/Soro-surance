import React, { useState, useRef, useEffect } from 'react';
import { FaMicrophone, FaCheck } from 'react-icons/fa';
import { SyncLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import Navbar from '../component/Navbar';
import api from '../api';

const Listening = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [statusText, setStatusText] = useState('Tap to Start Listening');
  const [confirmed, setConfirmed] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const navigate = useNavigate();

  // useEffect for handling microphone access and cleanup
  useEffect(() => {
    // Clean up function to stop recording if the component unmounts
    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

// In Listening.jsx, modify the submitForTranscription function:
const submitForTranscription = async (audioBlob) => {
  setIsTranscribing(true);
  setStatusText('Transcribing audio...');

  const formData = new FormData();
  formData.append('audio', audioBlob, 'recording.webm');

  try {
    const response = await api.post('/claims/voice/', formData);
    setTranscription(response.data.transcription);
    setConfirmed(true);
    setStatusText('Transcription complete!');
    
    // Redirect to auto-filled form with the transcription data
    navigate('/auto-filled-claim', { 
      state: { 
        transcription: response.data.transcription,
        initialData: {
          claim_type: response.data.claim_type,
          description: response.data.description,
          location: response.data.location,
          // Add other fields that might come from the backend
        }
      } 
    });

  } catch (err) {
    console.error('Error during transcription:', err);
    setStatusText('Transcription failed. Please try again.');
  } finally {
    setIsTranscribing(false);
  }
};

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const options = { mimeType: 'audio/webm' };
      mediaRecorderRef.current = new MediaRecorder(stream, options);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        submitForTranscription(blob);
      };

      mediaRecorderRef.current.start();
      setIsListening(true);
      setTranscription('');
      setConfirmed(false);
      setStatusText('Listening... Tap to Stop');
    } catch (err) {
      console.error('Error accessing microphone:', err);
      setStatusText('Microphone access denied. Please check permissions.');
      setIsListening(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
    setIsListening(false);
    setStatusText('Processing audio...');
  };

  const toggleListening = () => {
    if (isListening) {
      stopRecording();
    } else {
      startRecording();
    }
  };
  
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col items-center justify-center p-6 font-inter text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-2 text-[#e87d30] mt-16">
          SoroSurance
        </h1>
        <h2 className="text-lg text-gray-500 mb-6">
          {confirmed ? '🎉 Claim Submitted!' : 'Speak to make a claim...'}
        </h2>

        {!isListening && !transcription && !isTranscribing && (
          <div className="max-w-md mb-8">
            <p className="text-gray-600">
              <strong>Tap the microphone</strong> to start recording your claim.
            </p>
          </div>
        )}

        {isTranscribing ? (
          <div className="flex flex-col items-center justify-center w-56 h-56 rounded-full bg-gray-100 shadow-lg animate-pulse">
            <SyncLoader color="#e87d30" size={10} margin={2} />
            <p className="text-gray-500 mt-4">Processing audio...</p>
          </div>
        ) : (
          <div
            className={`relative w-56 h-56 mx-auto my-5 rounded-full cursor-pointer transition-all duration-300
                        ${isListening ? 'bg-gradient-to-br from-green-400 to-blue-500 shadow-lg shadow-green-500/50' : ''}
                        ${confirmed ? 'bg-gradient-to-br from-green-400 to-green-600 shadow-lg shadow-green-500/50' : 'bg-gradient-to-br from-gray-200 to-gray-300 shadow-md shadow-gray-400/50'}`}
            onClick={!confirmed ? toggleListening : null}
          >
            <div className="w-full h-full flex items-center justify-center text-4xl text-white">
              {confirmed ? <FaCheck className="text-white" /> : <FaMicrophone className={isListening ? 'text-white' : 'text-gray-500'} />}
            </div>
          </div>
        )}

        <p className="mt-4 text-gray-600">
          {statusText}
        </p>
        
        {transcription && (
          <div className="bg-gray-100 p-4 rounded-lg mt-8 max-w-2xl w-full">
            <p className="text-sm font-semibold text-gray-600 mb-2">Transcription:</p>
            <p className="text-gray-800">{transcription}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Listening;
