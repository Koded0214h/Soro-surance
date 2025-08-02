import React, { useState, useEffect } from 'react';
import { FiClock, FiCheckCircle, FiAlertTriangle, FiFileText, FiDownload, FiInfo } from 'react-icons/fi';
import Navbar from './component/Navbar';
import { SyncLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import api from './api'; // Assuming a similar API setup to the one you provided


const ClaimStatus = () => {
  const [claims, setClaims] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // This function fetches claims data from the provided backend API endpoint
  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const response = await api.get('/user/claims/');
        // The API response structure from the ClaimDashboard component is different.
        // We will adapt the data to fit the ClaimStatus component's UI.
        const adaptedClaims = response.data.map(claim => ({
          id: claim.claim_id,
          type: claim.description, // Using description as the type
          date: new Date(claim.incident_date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
          status: claim.status.toLowerCase(),
          // The steps, documents, and payout are not available in the provided API response,
          // so we will create a basic mock structure for demonstration purposes.
          // In a real application, you would need to adjust the API response
          // or fetch this additional data.
          steps: [
            { name: 'Submitted', status: 'complete', date: new Date(claim.created_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit' }) },
            { name: 'Under Review', status: claim.status.toLowerCase() === 'submitted' ? 'current' : 'complete', date: 'Jul 29' },
            { name: 'Assessment', status: 'pending' },
            { name: 'Resolution', status: 'pending' }
          ],
          documents: ['Document_1.pdf', 'Document_2.jpg'],
          payout: claim.status.toLowerCase() === 'approved' ? '₦185,000' : undefined
        }));
        
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
      case 'processing': return <FiClock className="text-yellow-500" />;
      case 'approved': return <FiCheckCircle className="text-green-500" />;
      case 'rejected': return <FiAlertTriangle className="text-red-500" />;
      case 'submitted': return <FiClock className="text-yellow-500" />;
      default: return <FiClock className="text-gray-400" />;
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

  const getProgressLineColor = (status) => {
    // This logic is a simplified representation. A real implementation would need
    // to track the completion percentage more accurately.
    switch(status) {
      case 'approved':
      case 'rejected':
      case 'resolved':
        return 'bg-green-500 w-full';
      case 'processing':
      case 'submitted':
        return 'bg-orange-500 w-1/2';
      default: return 'bg-gray-200 w-0';
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-6 bg-gray-50 min-h-screen pt-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Claims</h1>
          <p className="text-gray-600 mb-6">Track the progress of your submissions</p>

          {/* Conditional rendering based on API call state */}
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <SyncLoader color="#FF6600" />
            </div>
          ) : error ? (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <FiInfo className="h-5 w-5 text-red-400" aria-hidden="true" />
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
                  <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <div>
                      <h3 className="font-medium flex items-center">
                        {getStatusIcon(claim.status)}
                        <span className="ml-2">{claim.type}</span>
                      </h3>
                      <p className="text-sm text-gray-500">{claim.id} • Submitted {claim.date}</p>
                    </div>
                    {claim.payout && (
                      <span className="bg-green-50 text-green-800 px-3 py-1 rounded-full text-sm">
                        Paid: {claim.payout}
                      </span>
                    )}
                  </div>

                  {/* Progress Stepper */}
                  <div className="p-6">
                    <div className="relative">
                      {/* Progress line */}
                      <div className="absolute left-4 top-5 h-0.5 w-[calc(100%-2rem)] bg-gray-200 z-0">
                        <div className={`h-full transition-all duration-500 ease-in-out ${getProgressLineColor(claim.status)}`}></div>
                      </div>

                      {/* Steps */}
                      <div className="relative grid grid-cols-4 gap-4 z-10">
                        {claim.steps.map((step, i) => (
                          <div key={i} className="flex flex-col items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${getStepStatusClass(step.status)}`}>
                              {step.status === 'complete' ? <FiCheckCircle /> : i + 1}
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
                    {claim.documents ? (
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                          <FiFileText className="mr-1" /> Documents
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {claim.documents.map((doc, i) => (
                            <Link
                              key={i} 
                              href="#" 
                              className="flex items-center text-sm bg-white px-3 py-1 rounded border border-gray-200 hover:bg-gray-100"
                            >
                              {doc}
                              <FiDownload className="ml-2 text-gray-400" size={14} />
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg text-sm">
                        {claim.status === 'approved' ? 'View Payout Details' : 'Add More Documents'}
                      </button>
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
