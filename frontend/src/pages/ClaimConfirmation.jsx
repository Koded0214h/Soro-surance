import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const ClaimConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [claimId, setClaimId] = useState('');

  // Use the claimId passed from the Listening component
  useEffect(() => {
    if (location.state && location.state.claimId) {
      setClaimId(location.state.claimId);
    }

    // Set up the redirect timer
    const redirectTimer = setTimeout(() => {
      navigate('/claimd'); // Redirect to dashboard after 1 second
    }, 1000);

    // Clean up the timer if component unmounts
    return () => clearTimeout(redirectTimer);
  }, [location.state, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col items-center justify-center p-6 font-inter text-center">
      <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-lg max-w-md mx-auto">
        <FaCheckCircle className="text-green-500 text-6xl mb-4 animate-bounce" />
        <h1 className="text-3xl font-extrabold text-green-700 mb-2">Claim Submitted!</h1>
        <p className="text-lg text-gray-600 mb-4">
          Thank you for submitting your claim. Our team will review it shortly.
        </p>
        <div className="bg-green-100 p-4 rounded-lg mt-4 w-full">
          <p className="text-sm font-semibold text-green-800 mb-1">Your Claim ID:</p>
          <p className="text-xl font-bold text-green-900">{claimId}</p>
        </div>
      </div>
    </div>
  );
};

export default ClaimConfirmation;