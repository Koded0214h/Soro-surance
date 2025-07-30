import React, { useState, useRef, useEffect } from 'react';
import { FiPlay, FiPause, FiRefreshCw, FiChevronRight } from 'react-icons/fi';
import { FaHome, FaRegListAlt, FaMoon, FaSun } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../component/Navbar';

// Sidebar Component
const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);

  const menuItems = [
    { icon: <FaHome />, label: "Dashboard", path: "/dashboard" },
    { icon: <FaRegListAlt />, label: "Claims", path: "/claims" },
  ];

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow-md border-b border-orange-200 px-6 py-3 flex justify-between items-center`}>
      <div className="flex items-center">
        <h2 className="text-2xl font-bold text-orange-800 dark:text-orange-400">SoroSurance</h2>
      </div>
      
      <nav>
        <ul className="flex gap-8">
          {menuItems.map((item, index) => (
            <li key={index}>
              <button
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-2 px-3 py-1 rounded-md ${location.pathname === item.path ? 'bg-orange-100 text-orange-700' : 'hover:bg-orange-50'}`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            </li>
          ))}
          <li>
            <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
              {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon />}
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

// ClaimDetails Component
const ClaimDetails = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);
  const progressInterval = useRef(null);

  // Sample audio - replace with your actual file
  const audioFile = '/sample-claim.mp3'; 

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

  return (
    <>
    <Navbar />
    <div className="dark:bg-gray-900 min-h-screen">
      
      <div className="pt-20 px-8 flex flex-col lg:flex-row gap-8">
        {/* Voice Data Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md flex-1">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Claim #20240729-001</h1>
          
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Voice Data</h2>
              
              <div className="bg-orange-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-300 mb-3">Claim Audio</h3>
                <div className="flex items-center gap-4">
                  <button
                    onClick={togglePlayback}
                    className="p-3 bg-orange-500 hover:bg-orange-600 rounded-full text-white transition-colors"
                    aria-label={isPlaying ? "Pause audio" : "Play audio"}
                  >
                    {isPlaying ? <FiPause size={20} /> : <FiPlay size={20} />}
                  </button>
                  <div className="flex-1">
                    <p className="text-gray-900 dark:text-gray-300">20240729-001.mp3</p>
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
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-300 mb-2">Transcribed Text</h3>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 h-48 overflow-y-auto">
                <p className="text-gray-700 dark:text-gray-300">
                  "I was driving on Broad Street when a red SUV hit my blue sedan at the Marina Road intersection. The accident happened around 2:30 PM. There were no injuries, but both vehicles sustained significant damage. I've attached photos of the accident scene and the damage to my vehicle."
                </p>
              </div>
            </div>

            <button className="flex items-center gap-2 text-orange-600 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-300">
              <FiRefreshCw />
              <span>Re-run AI Analysis</span>
            </button>
          </div>
        </div>

        {/* AI Analysis Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md lg:w-96">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">AI Analysis</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Speech-to-Text Confidence</h3>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '95%' }}></div>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">95%</span>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">AI Analysis Confidence</h3>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '98%' }}></div>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">98%</span>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Claim Type</h3>
                <p className="text-gray-900 dark:text-gray-300">Car Accident</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Location</h3>
                <p className="text-gray-900 dark:text-gray-300">Broad Street and Marina Road</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Vehicles Involved</h3>
                <p className="text-gray-900 dark:text-gray-300">Blue Sedan vs. Red SUV</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Other Driver</h3>
                <p className="text-gray-900 dark:text-gray-300">Chinedu Okoro</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Injuries</h3>
                <p className="text-gray-900 dark:text-gray-300">No Injuries</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Evidence</h3>
                <p className="text-gray-900 dark:text-gray-300">Photos of accident scene and vehicle damage</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={audioFile}
        onEnded={() => {
          setIsPlaying(false);
          clearInterval(progressInterval.current);
          setProgress(0);
        }}
      />
    </div>
    </>
  );
};

export default ClaimDetails;