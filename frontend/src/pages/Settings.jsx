import React, { useState } from 'react';
import { FiCopy, FiRefreshCw, FiSave } from 'react-icons/fi';
import Navbar from '../component/Navbar';
const Settings = () => {
  const [apiKey, setApiKey] = useState('sk_live_1234567890abcdef1234567890abcdef');
  const [selectedSTT, setSelectedSTT] = useState('google');
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [isSaved, setIsSaved] = useState(false);

  const regenerateApiKey = () => {
    const newKey = `sk_live_${Math.random().toString(36).substring(2, 18)}${Math.random().toString(36).substring(2, 18)}`;
    setApiKey(newKey);
  };

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    alert('API key copied to clipboard!');
  };

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <>
    <Navbar/>
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-8 mt-16">Settings</h1>
      
      {/* API Keys Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border border-gray-200 w-5xl">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">API Keys</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">API Key</label>
          <div className="flex">
            <input
              type="text"
              value={apiKey}
              readOnly
              className="flex-1 bg-gray-100 border border-gray-300 rounded-l-md p-2 text-sm"
            />
            <button
              onClick={copyApiKey}
              className="bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-r-md"
            >
              <FiCopy />
            </button>
          </div>
        </div>

        <button
          onClick={regenerateApiKey}
          className="flex items-center text-orange-600 hover:text-orange-800"
        >
          <FiRefreshCw className="mr-2" />
          Regenerate API Key
        </button>
      </div>

      {/* STT Model Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Speech-to-Text (STT) Model</h2>
        
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="radio"
              id="google-stt"
              name="stt-model"
              checked={selectedSTT === 'google'}
              onChange={() => setSelectedSTT('google')}
              className="h-4 w-4 text-orange-600 focus:ring-orange-500"
            />
            <label htmlFor="google-stt" className="ml-3 block text-sm font-medium text-gray-700">
              <span className="font-bold">Google STT</span>
              <p className="text-gray-500">Use Google's speech-to-text model for transcription.</p>
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="radio"
              id="whisper-stt"
              name="stt-model"
              checked={selectedSTT === 'whisper'}
              onChange={() => setSelectedSTT('whisper')}
              className="h-4 w-4 text-orange-600 focus:ring-orange-500"
            />
            <label htmlFor="whisper-stt" className="ml-3 block text-sm font-medium text-gray-700">
              <span className="font-bold">Whisper STT</span>
              <p className="text-gray-500">Use Whisper's speech-to-text model for transcription.</p>
            </label>
          </div>
        </div>
      </div>

      {/* Language Model Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Voice Language Model</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Language</label>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md"
          >
            <option value="english">English</option>
            <option value="yoruba">Yoruba</option>
            <option value="hausa">Hausa</option>
            <option value="igbo">Igbo</option>
            <option value="pidgin">Pidgin</option>
          </select>
        </div>

        <button
          onClick={handleSave}
          className={`flex items-center justify-center w-[650px] py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ${isSaved ? 'bg-green-600 hover:bg-green-700' : ''}`}
        >
          <FiSave className="mr-2" />
          {isSaved ? 'Changes Saved!' : 'Save Changes'}
        </button>
      </div>
    </div>
    </>
  );
};

export default Settings;