import { useState, useEffect } from 'react';
import { FiFileText, FiClock, FiCheck, FiX } from 'react-icons/fi';
import Navbar from '../component/Navbar';
import api from '../api';

export default function Udashboard() {
  const [user, setUser] = useState(null);
  const [userClaims, setUserClaims] = useState([]);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingClaims, setLoadingClaims] = useState(true);
  const [errorUser, setErrorUser] = useState(null);
  const [errorClaims, setErrorClaims] = useState(null);

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Approved': return <FiCheck className="text-green-500 mr-1" />;
      case 'In Review': return <FiClock className="text-yellow-500 mr-1" />;
      default: return <FiClock className="text-gray-400 mr-1" />;
    }
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
        setUserClaims(response.data);
      } catch (err) {
        setErrorClaims('Failed to load claims.');
      } finally {
        setLoadingClaims(false);
      }
    };

    fetchUser();
    fetchClaims();
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* Welcome Header */}
        <div className="mb-8 mt-16">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            {loadingUser ? 'Loading...' : errorUser ? errorUser : `Welcome back, ${user?.full_name || user?.username || 'User'}!`}
          </h1>
          <p className="text-gray-600">Here's your claims overview</p>
        </div>

        {/* Quick Actions Card */}
        <div className="bg-white p-6 rounded-lg shadow-xs border border-gray-200 mb-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <FiFileText className="text-orange-500 mr-2" /> Quick Actions
          </h2>
          <div className="flex flex-wrap gap-4">
            <a href="/listen">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg flex items-center">
                <FiFileText className="mr-2" /> File New Claim
              </button>
            </a>
            <button className="border border-orange-500 text-orange-500 hover:bg-orange-50 px-6 py-3 rounded-lg">
              View Policy Documents
            </button>
          </div>
        </div>

        {/* Claims Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Approved Claims */}
          <div className="bg-white p-4 rounded-lg border-l-4 border-green-500 shadow-xs">
            <h3 className="text-gray-500 text-sm mb-1">Approved Claims</h3>
            <p className="text-2xl font-bold">
              {userClaims.filter(c => c.status.toLowerCase() === 'approved').length}
            </p>
            <p className="text-green-500 text-sm">
              ₦{userClaims.filter(c => c.status.toLowerCase() === 'approved').reduce((sum, c) => sum + (c.amount || 0), 0).toLocaleString()} paid
            </p>
          </div>

          {/* Pending Claims */}
          <div className="bg-white p-4 rounded-lg border-l-4 border-yellow-500 shadow-xs">
            <h3 className="text-gray-500 text-sm mb-1">In Review</h3>
            <p className="text-2xl font-bold">
              {userClaims.filter(c => c.status.toLowerCase() === 'in review').length}
            </p>
            <p className="text-yellow-500 text-sm">
              ₦{userClaims.filter(c => c.status.toLowerCase() === 'in review').reduce((sum, c) => sum + (c.amount || 0), 0).toLocaleString()} pending
            </p>
          </div>

          {/* Draft Claims */}
          <div className="bg-white p-4 rounded-lg border-l-4 border-gray-400 shadow-xs">
            <h3 className="text-gray-500 text-sm mb-1">Drafts</h3>
            <p className="text-2xl font-bold">
              {userClaims.filter(c => c.status.toLowerCase() === 'draft').length}
            </p>
            <p className="text-gray-400 text-sm">Unsubmitted claims</p>
          </div>
        </div>

        {/* Recent Claims List */}
        <div className="bg-white rounded-lg shadow-xs overflow-hidden border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Your Recent Claims</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {loadingClaims ? (
              <p className="p-4 text-center text-gray-500">Loading claims...</p>
            ) : errorClaims ? (
              <p className="p-4 text-center text-red-600">{errorClaims}</p>
            ) : userClaims.length === 0 ? (
              <p className="p-4 text-center text-gray-500">No claims found.</p>
            ) : (
              userClaims.map((claim) => (
                <div key={claim.claim_id} className="p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{claim.claim_type}</p>
                      <p className="text-sm text-gray-500">{claim.claim_id} • {claim.incident_date}</p>
                    </div>
                    <div className="flex items-center">
                      {getStatusIcon(claim.status)}
                      <span className={`text-sm ${
                        claim.status === 'Approved' ? 'text-green-600' : 
                        claim.status === 'In Review' ? 'text-yellow-600' : 'text-gray-500'
                      }`}>
                        {claim.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
