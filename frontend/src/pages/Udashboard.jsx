import { FiFileText, FiClock, FiCheck, FiX } from 'react-icons/fi';
import Navbar from '../component/Navbar';

export default function Udashboard() {
  // Sample user-specific data
  const userClaims = [
    { id: '#CLAIM-001', type: 'Auto Accident', date: 'Jul 15, 2024', status: 'Approved', amount: '₦150,000' },
    { id: '#CLAIM-002', type: 'Property Damage', date: 'Jul 20, 2024', status: 'In Review', amount: '₦75,000' },
    { id: '#CLAIM-003', type: 'Medical', date: 'Aug 1, 2024', status: 'Pending', amount: '₦200,000' }
  ];

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Approved': return <FiCheck className="text-green-500 mr-1" />;
      case 'In Review': return <FiClock className="text-yellow-500 mr-1" />;
      default: return <FiClock className="text-gray-400 mr-1" />;
    }
  };

  return (
    <>
    <Navbar />
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Welcome Header */}
      <div className="mb-8 mt-16">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Welcome back, Aisha!</h1>
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
          </button></a>
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
          <p className="text-2xl font-bold">1</p>
          <p className="text-green-500 text-sm">₦150,000 paid</p>
        </div>

        {/* Pending Claims */}
        <div className="bg-white p-4 rounded-lg border-l-4 border-yellow-500 shadow-xs">
          <h3 className="text-gray-500 text-sm mb-1">In Review</h3>
          <p className="text-2xl font-bold">1</p>
          <p className="text-yellow-500 text-sm">₦75,000 pending</p>
        </div>

        {/* Draft Claims */}
        <div className="bg-white p-4 rounded-lg border-l-4 border-gray-400 shadow-xs">
          <h3 className="text-gray-500 text-sm mb-1">Drafts</h3>
          <p className="text-2xl font-bold">0</p>
          <p className="text-gray-400 text-sm">Unsubmitted claims</p>
        </div>
      </div>

      {/* Recent Claims List */}
      <div className="bg-white rounded-lg shadow-xs overflow-hidden border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Your Recent Claims</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {userClaims.map((claim) => (
            <div key={claim.id} className="p-4 hover:bg-gray-50">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{claim.type}</p>
                  <p className="text-sm text-gray-500">{claim.id} • {claim.date}</p>
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
          ))}
        </div>
      </div>
    </div>
    </>
  );
}