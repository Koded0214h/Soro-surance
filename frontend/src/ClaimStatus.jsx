import React, { useState, useEffect } from 'react';
import { 
  FiClock, 
  FiCheckCircle, 
  FiAlertTriangle, 
  FiFileText, 
  FiDownload, 
  FiInfo,
  FiChevronRight
} from 'react-icons/fi';
import Navbar from './component/Navbar';
import { SyncLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import api from './api';

const ClaimStatus = () => {
  const [claims, setClaims] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const response = await api.get('/user/claims/');
        const adaptedClaims = response.data.map(claim => {
          // Determine step statuses based on claim status
          let steps = [
            { 
              name: 'Submitted', 
              status: 'complete', 
              date: new Date(claim.created_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit' }) 
            },
            { 
              name: 'Under Review', 
              status: claim.status.toLowerCase() === 'submitted' ? 'current' : 
                     ['approved', 'rejected', 'resolved'].includes(claim.status.toLowerCase()) ? 'complete' : 'pending',
              date: claim.status.toLowerCase() === 'submitted' ? '' : 
                    new Date(claim.updated_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit' })
            },
            { 
              name: 'Assessment', 
              status: ['approved', 'rejected', 'resolved'].includes(claim.status.toLowerCase()) ? 'complete' : 'pending',
              date: ['approved', 'rejected', 'resolved'].includes(claim.status.toLowerCase()) ? 
                    new Date(claim.updated_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit' }) : ''
            },
            { 
              name: 'Resolution', 
              status: claim.status.toLowerCase() === 'resolved' ? 'complete' : 
                     claim.status.toLowerCase() === 'approved' ? 'current' : 'pending',
              date: claim.status.toLowerCase() === 'resolved' ? 
                    new Date(claim.updated_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit' }) : ''
            }
          ];

          return {
            id: claim.claim_id,
            type: claim.description || 'Insurance Claim',
            date: new Date(claim.incident_date).toLocaleDateString('en-US', { 
              month: 'short', 
              day: '2-digit', 
              year: 'numeric' 
            }),
            status: claim.status.toLowerCase(),
            steps,
            documents: claim.documents || [], // Assuming API returns documents array
            payout: claim.payout_amount ? `₦${Number(claim.payout_amount).toLocaleString()}` : null,
            payout_date: claim.payout_date,
            updated_at: claim.updated_at
          };
        });
        
        setClaims(adaptedClaims);
      } catch (err) {
        console.error("Error fetching claims:", err);
        setError("Failed to load claims. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchClaims();
  }, []);

  const getStatusIcon = (status) => {
    switch(status) {
      case 'processing': 
      case 'submitted': 
        return <FiClock className="text-yellow-500" />;
      case 'approved': 
        return <FiCheckCircle className="text-green-500" />;
      case 'rejected': 
        return <FiAlertTriangle className="text-red-500" />;
      case 'resolved':
        return <FiCheckCircle className="text-green-500" />;
      default: 
        return <FiClock className="text-gray-400" />;
    }
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-3 py-1 rounded-full text-sm font-medium";
    switch(status) {
      case 'processing':
      case 'submitted':
        return `${baseClasses} bg-orange-100 text-orange-800`;
      case 'approved':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'rejected':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'resolved':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const getStepStatusClass = (stepStatus) => {
    switch(stepStatus) {
      case 'complete': return 'bg-green-100 text-green-600';
      case 'current': return 'bg-orange-100 text-orange-600';
      case 'pending': return 'bg-gray-100 text-gray-400';
      default: return 'bg-gray-100 text-gray-400';
    }
  };

  const handleDownload = async (documentId, documentName) => {
    try {
      // Assuming your API has an endpoint to download documents
      const response = await api.get(`/documents/${documentId}/download`, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', documentName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download document. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-6 bg-gray-50 min-h-screen pt-20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Claims</h1>
            <p className="text-gray-600">Track the progress of your submissions</p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <SyncLoader color="#FF6600" />
            </div>
          ) : error ? (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <FiInfo className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          ) : claims.length === 0 ? (
            <div className="bg-white rounded-lg shadow-xs border border-gray-200 p-6 text-center text-gray-500">
              You have no claims to display.
            </div>
          ) : (
            <div className="space-y-6">
              {claims.map((claim) => (
                <div key={claim.id} className="bg-white rounded-lg shadow-xs border border-gray-200 overflow-hidden">
                  {/* Claim Header */}
                  <div className="p-4 border-b border-gray-200 flex justify-between items-start">
                    <div>
                      <div className="flex items-center mb-1">
                        {getStatusIcon(claim.status)}
                        <span className="ml-2 font-medium">{claim.type}</span>
                      </div>
                      <p className="text-sm text-gray-500">Claim #{claim.id} • Submitted {claim.date}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className={getStatusBadge(claim.status)}>
                        {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                      </span>
                      {claim.payout && (
                        <span className="mt-2 text-sm font-medium text-green-700">
                          Paid: {claim.payout}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Progress Stepper */}
                  <div className="p-6">
                    <div className="relative">
                      {/* Progress line */}
                      <div className="absolute left-4 top-5 h-0.5 w-[calc(100%-2rem)] bg-gray-200 z-0">
                        <div className={`h-full transition-all duration-500 ease-in-out ${
                          claim.status === 'resolved' ? 'bg-green-500 w-full' :
                          claim.status === 'approved' ? 'bg-green-500 w-3/4' :
                          claim.status === 'rejected' ? 'bg-red-500 w-3/4' :
                          'bg-orange-500 w-1/2'
                        }`}></div>
                      </div>

                      {/* Steps */}
                      <div className="relative grid grid-cols-4 gap-4 z-10">
                        {claim.steps.map((step, i) => (
                          <div key={i} className="flex flex-col items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${getStepStatusClass(step.status)}`}>
                              {step.status === 'complete' ? <FiCheckCircle className="w-4 h-4" /> : i + 1}
                            </div>
                            <p className={`text-xs text-center ${step.status === 'current' ? 'font-medium text-gray-900' : 'text-gray-500'}`}>
                              {step.name}
                            </p>
                            {step.date && <p className="text-xs text-gray-400 mt-1">{step.date}</p>}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Documents/CTA */}
                  <div className="p-4 bg-gray-50 border-t border-gray-200">
                    {claim.documents && claim.documents.length > 0 ? (
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                          <FiFileText className="mr-1" /> Attachments
                        </h4>
                        <div className="space-y-2">
                          {claim.documents.map((doc, i) => (
                            <div 
                              key={i}
                              className="flex items-center justify-between bg-white px-3 py-2 rounded border border-gray-200 hover:bg-gray-50"
                            >
                              <div className="flex items-center">
                                <FiFileText className="text-gray-400 mr-2" />
                                <span className="text-sm truncate max-w-xs">{doc.name || `Document_${i+1}.${doc.type?.split('/')[1] || 'pdf'}`}</span>
                              </div>
                              <button 
                                onClick={() => handleDownload(doc.id, doc.name)}
                                className="text-orange-500 hover:text-orange-600 flex items-center text-sm"
                              >
                                Download
                                <FiDownload className="ml-1" size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-500">
                          {claim.status === 'approved' ? 
                            'Your claim has been approved!' : 
                            'No documents attached yet'}
                        </p>
                        <button className="text-orange-500 hover:text-orange-600 flex items-center text-sm font-medium">
                          {claim.status === 'approved' ? 'View Details' : 'Add Documents'}
                          <FiChevronRight className="ml-1" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ClaimStatus;