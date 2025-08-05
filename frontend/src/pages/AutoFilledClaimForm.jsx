import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaUpload } from 'react-icons/fa';
import Navbar from '../component/Navbar';
import api from '../api';

const AutoFilledClaimForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    claim_type: '',
    description: '',
    incident_date: '',
    location: '',
    voice_transcript: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [transcription, setTranscription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (location.state?.transcription) {
      setTranscription(location.state.transcription);
      
      if (location.state?.initialData) {
        setFormData(prev => ({
          ...prev,
          ...location.state.initialData,
          voice_transcript: location.state.transcription,
          incident_date: new Date().toISOString().split('T')[0]
        }));
      } else {
        parseTranscription(location.state.transcription);
      }
    }
  }, [location.state]);

  const parseTranscription = (text) => {
    const newFormData = {
      claim_type: detectClaimType(text),
      description: text,
      incident_date: extractDate(text) || new Date().toISOString().split('T')[0],
      location: extractLocation(text),
      voice_transcript: text
    };
    setFormData(newFormData);
  };

  const detectClaimType = (text) => {
    const lowerText = text.toLowerCase();
    if (lowerText.includes('car') || lowerText.includes('accident') || lowerText.includes('crash')) {
      return 'auto';
    } else if (lowerText.includes('fire') || lowerText.includes('burn')) {
      return 'fire';
    } else if (lowerText.includes('medical') || lowerText.includes('hospital') || lowerText.includes('injury')) {
      return 'health';
    } else if (lowerText.includes('theft') || lowerText.includes('stolen') || lowerText.includes('rob')) {
      return 'theft';
    }
    return 'other';
  };

  const extractDate = (text) => {
    const dateRegex = /\b(\d{1,2}(?:st|nd|rd|th)?\s+(?:January|February|March|April|May|June|July|August|September|October|November|December)|\d{4}-\d{2}-\d{2}|\d{2}\/\d{2}\/\d{4})\b/i;
    const match = text.match(dateRegex);
    if (match) {
      const date = new Date(match[1]);
      return date.toISOString().split('T')[0];
    }
    return null;
  };

  const extractLocation = (text) => {
    const locationRegex = /(?:at|in|near|around)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/g;
    const matches = [...text.matchAll(locationRegex)];
    return matches.length > 0 ? matches[0][1] : '';
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a valid image (JPEG, PNG, WEBP) or PDF file');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size should be less than 5MB');
      return;
    }

    setSelectedFile(file);

    // Create preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setFilePreview(e.target.result);
      reader.readAsDataURL(file);
    } else {
      setFilePreview(null);
    }
  };

  const uploadAttachment = async (claimId) => {
    if (!selectedFile) return null;

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await api.post(`/claims/${claimId}/upload/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.id;
    } catch (error) {
      console.error('Error uploading attachment:', error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    
    try {
      // First create the claim
      const claimResponse = await api.post('/claims/', {
        ...formData,
        voice_transcript: transcription
      });

      // Then upload attachment if exists
      if (selectedFile) {
        setIsUploading(true);
        const attachmentId = await uploadAttachment(claimResponse.data.claim_id);
        if (attachmentId) {
          // Update claim with attachment
          await api.patch(`/claims/${claimResponse.data.id}/`, {
            attachment: attachmentId
          });
        }
      }

      navigate('/claim-confirmation', { 
        state: { 
          claimId: claimResponse.data.claim_id,
          claimData: claimResponse.data 
        } 
      });
    } catch (error) {
      console.error('Error submitting claim:', error);
      alert(`Failed to submit claim: ${error.response?.data?.error || error.message}`);
    } finally {
      setLoading(false);
      setIsUploading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.claim_type) newErrors.claim_type = 'Claim type is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.incident_date) newErrors.incident_date = 'Incident date is required';
    if (!formData.location) newErrors.location = 'Location is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const claimTypes = [
    { value: 'auto', label: 'Auto Accident' },
    { value: 'fire', label: 'Fire' },
    { value: 'health', label: 'Health' },
    { value: 'theft', label: 'Theft' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Auto-Filled Claim Form</h1>
            
            {transcription && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h3 className="text-sm font-semibold text-blue-800 mb-2">Voice Transcription:</h3>
                <p className="text-blue-700 text-sm">{transcription}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Claim Type *
                </label>
                <select
                  name="claim_type"
                  value={formData.claim_type}
                  onChange={(e) => setFormData({...formData, claim_type: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.claim_type ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select claim type</option>
                  {claimTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
                {errors.claim_type && (
                  <p className="text-red-500 text-xs mt-1">{errors.claim_type}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={4}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Describe what happened..."
                />
                {errors.description && (
                  <p className="text-red-500 text-xs mt-1">{errors.description}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Incident Date *
                  </label>
                  <input
                    type="date"
                    name="incident_date"
                    value={formData.incident_date}
                    onChange={(e) => setFormData({...formData, incident_date: e.target.value})}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.incident_date ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.incident_date && (
                    <p className="text-red-500 text-xs mt-1">{errors.incident_date}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.location ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Where did this happen?"
                  />
                  {errors.location && (
                    <p className="text-red-500 text-xs mt-1">{errors.location}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Incident Evidence (Optional)
                </label>
                <div className="mt-1 flex items-center">
                  <label className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <FaUpload className="inline mr-2" />
                    Upload File
                    <input 
                      type="file" 
                      className="hidden" 
                      onChange={handleFileChange}
                      accept="image/*,.pdf"
                    />
                  </label>
                  <span className="ml-3 text-sm text-gray-500">
                    {selectedFile ? selectedFile.name : 'No file selected'}
                  </span>
                </div>
                {filePreview && selectedFile.type.startsWith('image/') && (
                  <div className="mt-2">
                    <img 
                      src={filePreview} 
                      alt="Preview" 
                      className="h-32 object-contain border rounded"
                    />
                  </div>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  Upload images (JPEG, PNG) or PDF files (Max 5MB)
                </p>
              </div>

              <div className="flex justify-end space-x-4 pt-6">
                <button
                  type="button"
                  onClick={() => navigate('/claim-dashboard')}
                  className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || isUploading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {loading ? 'Submitting...' : 
                   isUploading ? 'Uploading Attachment...' : 'Submit Claim'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AutoFilledClaimForm;