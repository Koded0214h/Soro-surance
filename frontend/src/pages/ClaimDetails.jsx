import React, { useState, useRef, useEffect } from 'react';
import { FiPlay, FiPause } from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../component/Navbar';

const ClaimDetails = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [claim, setClaim] = useState(null);
  const audioRef = useRef(null);
  const progressInterval = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state) {
      setClaim(location.state);
    } else {
      // Redirect back if no claim data
      navigate('/claimd');
    }
  }, [location, navigate]);

  const togglePlayback = () => {
    if (isPlaying) {
      audioRef.current.pause();
      clearInterval(progressInterval.current);
    } else {
      audioRef.current.play();
      progressInterval.current = setInterval(() => {
        setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
      }, 100);
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, []);

  if (!claim) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center text-2xl">
          <p>Loading claim details...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="pt-20 px-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
              Claim #{claim.claim_id}
            </h1>
            
            <div className="space-y-6">
              <div className="bg-orange-50 rounded-lg p-4 border border-orange-100">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Claim Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Description:</p>
                    <p className="text-gray-900">{claim.description || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Location:</p>
                    <p className="text-gray-900">{claim.location || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Incident Date:</p>
                    <p className="text-gray-900">
                      {claim.incident_date ? new Date(claim.incident_date).toLocaleDateString() : 'Not provided'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Status:</p>
                    <p className={`font-medium ${
                      claim.status === 'approved' ? 'text-green-600' :
                      claim.status === 'rejected' ? 'text-red-600' :
                      'text-orange-600'
                    }`}>
                      {claim.status || 'Unknown'}
                    </p>
                  </div>
                </div>
              </div>

              {claim.audio_url && (
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h3 className="text-lg font-medium text-gray-800 mb-3">
                    Voice Recording
                  </h3>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={togglePlayback}
                      className="p-3 bg-orange-500 hover:bg-orange-600 rounded-full text-white transition-colors"
                    >
                      {isPlaying ? <FiPause size={20} /> : <FiPlay size={20} />}
                    </button>
                    <div className="flex-1">
                      <p className="text-gray-900">Claim Recording</p>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div 
                          className="bg-orange-500 h-2 rounded-full" 
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {claim.transcription && (
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h3 className="text-lg font-medium text-gray-800 mb-3">
                    Transcribed Text
                  </h3>
                  <div className="p-3 bg-white rounded border border-gray-200 h-48 overflow-y-auto">
                    <p className="text-gray-700">
                      {claim.transcription}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {claim.audio_url && (
          <audio
            ref={audioRef}
            src={claim.audio_url}
            onEnded={() => {
              setIsPlaying(false);
              clearInterval(progressInterval.current);
              setProgress(0);
            }}
          />
        )}
      </div>
    </>
  );
};

export default ClaimDetails;