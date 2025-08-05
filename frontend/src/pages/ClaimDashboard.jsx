import React, { useState, useEffect } from 'react';
import { FiMic, FiClock, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom'; // Add this import
import Navbar from '../component/Navbar';
import api from '../api';

const ClaimDashboard = () => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [errorUser, setErrorUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const navigate = useNavigate(); // Add this

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
      case 'submitted':
        return <FiClock className="text-yellow-500 mr-1" />;
      case 'approved':
      case 'resolved':
        return <FiCheckCircle className="text-green-500 mr-1" />;
      case 'rejected':
        return <FiXCircle className="text-red-500 mr-1" />;
      default:
        return null;
    }
  };

  const handleClaimClick = (claim) => {
    navigate('/details', { state: claim });
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get('/user/profile/');
        setUser(response.data);
      } catch (err) {
        setErrorUser('Failed to load user info.');
      } finally {
        setLoadingUser(false);
      }
    };

    const fetchClaims = async () => {
      try {
        const response = await api.get('/user/claims/');
        setClaims(response.data);
      } catch (err) {
        setError('Failed to load claims.');
      } finally {
        setLoading(false);
      }
    };

    fetchClaims();
    fetchUser();
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-3 mt-16 text-center">Soro surance</h1>
          <p className="text-gray-600 text-center">
            {loadingUser ? 'Loading...' : errorUser ? errorUser : `Welcome back, ${user?.full_name || user?.username || 'User'}!`}
          </p>
        </div>

        <button
          onClick={() => window.location.href = '/listen'}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg mb-8 flex items-center justify-center transition-colors"
        >
          <FiMic className="mr-2" />
          Speak to Submit a Claim
        </button>

        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">Recent Claims</h2>
          {loading ? (
            <p className="text-center text-gray-500">Loading claims...</p>
          ) : error ? (
            <p className="text-center text-red-600">{error}</p>
          ) : claims.length === 0 ? (
            <p className="text-center text-gray-500">No claims found.</p>
          ) : (
            <div className="bg-white rounded-lg shadow-xs overflow-hidden border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Claim ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Incident Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {claims.map((claim) => (
                    <tr 
                      key={claim.id} 
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleClaimClick(claim)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{claim.claim_id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(claim.incident_date).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex items-center">
                          {getStatusIcon(claim.status)}
                          <span className={
                            (claim.status.toLowerCase() === 'submitted' || claim.status.toLowerCase() === 'pending' ? 'text-yellow-600' : '') +
                            (claim.status.toLowerCase() === 'approved' || claim.status.toLowerCase() === 'resolved' ? ' text-green-600' : '') +
                            (claim.status.toLowerCase() === 'rejected' ? ' text-red-600' : '')
                          }>
                            {claim.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 max-w-xs truncate">{claim.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 max-w-xs truncate">{claim.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ClaimDashboard;