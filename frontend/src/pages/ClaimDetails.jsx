import React, { useState, useRef, useEffect } from 'react';
import { FiPlay, FiPause } from 'react-icons/fi';
import { useLocation, useParams } from 'react-router-dom';
import Navbar from '../component/Navbar';

const ClaimDetails = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [claim, setClaim] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const audioRef = useRef(null);
  const progressInterval = useRef(null);
  const location = useLocation();
  const { claim_id } = useParams();

  useEffect(() => {
    if (location.state) {
      setClaim(location.state);
      setLoading(false);
    } else if (claim_id) {
      // Fetch claim details from backend
      const fetchClaim = async () => {
        try {
          const response = await api.get(`/claims/track/?claim_id=${claim_id}`);
          setClaim({
            claimData: {
              id: response.data.claim_id,
              date: response.data.submitted_at,
              status: response.data.status,
            },
            transcription: response.data.transcription || '',
            audioUrl: response.data.audio_url || '',
          });
        } catch (err) {
          setError('Failed to load claim details.');
        } finally {
          setLoading(false);
        }
      };
      fetchClaim();
    } else {
      setLoading(false);
    }
  }, [location.state, claim_id]);

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

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <p>Loading claim details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center text-red-600">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!claim) {
    return (
      <div className="dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <Navbar />
        <p>No claim data found. Please submit a claim first.</p>
      </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="dark:bg-gray-900 min-h-screen">
        <div className="pt-20 px-8 flex flex-col lg:flex-row gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md flex-1">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
              {claim.claimData.id}
            </h1>
            
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  Voice Data
                </h2>
                
                <div className="bg-orange-50 dark:bg-gray-700 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-800 dark:text-gray-300 mb-3">
                    Claim Recording
                  </h3>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={togglePlayback}
                      className="p-3 bg-orange-500 hover:bg-orange-600 rounded-full text-white transition-colors"
                    >
                      {isPlaying ? <FiPause size={20} /> : <FiPlay size={20} />}
                    </button>
                    <div className="flex-1">
                      <p className="text-gray-900 dark:text-gray-300">
                        {claim.claimData.id}.wav
                      </p>
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mt-2">
                        <div 
                          className="bg-orange-500 h-2 rounded-full" 
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            <div>
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-300 mb-2">
                Transcribed Text
              </h3>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 h-48 overflow-y-auto">
                <p className="text-gray-700 dark:text-gray-300">
                  {claim.transcription || 'No transcription available'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md lg:w-96">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
            Claim Details
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                Claim ID
              </h3>
              <p className="text-gray-900 dark:text-gray-300">
                {claim.claimData.id}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                Submission Date
              </h3>
              <p className="text-gray-900 dark:text-gray-300">
                {claim.claimData.date}
              </p>
            </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                  Status
                </h3>
                <p className="text-gray-900 dark:text-gray-300">
                  {claim.claimData.status}
                </p>
              </div>
              
            </div>
          </div>
        </div>

      <audio
        ref={audioRef}
        src={claim.audioUrl}
        onEnded={() => {
          setIsPlaying(false);
          clearInterval(progressInterval.current);
          setProgress(0);
        }}
      />
    </>
  );
};

export default ClaimDetails;
