import React from 'react';
import { FiMic, FiClock, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import Navbar from '../component/Navbar';
const ClaimDashboard = () => {
  // Sample claims data
  const claims = [
    { id: '#20240715-001', date: 'July 15, 2024', status: 'Pending', amount: '₦150,000' },
    { id: '#20240710-002', date: 'July 10, 2024', status: 'Approved', amount: '₦75,000' },
    { id: '#20240705-003', date: 'July 5, 2024', status: 'Rejected', amount: '₦200,000' },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending':
        return <FiClock className="text-yellow-500 mr-1" />;
      case 'Approved':
        return <FiCheckCircle className="text-green-500 mr-1" />;
      case 'Rejected':
        return <FiXCircle className="text-red-500 mr-1" />;
      default:
        return null;
    }
  };

  return (
    <>
    <Navbar />
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-3 mt-16 text-center">Claim Whisper</h1>
        <p className="text-gray-600 text-center">Welcome, Aisha!</p>
      </div>

      {/* Voice Claim Button */}
      <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg mb-8 flex items-center justify-center transition-colors">
        <FiMic className="mr-2" />
        Speak to Submit a Claim
      </button>

      {/* Recent Claims */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">Recent Claims</h2>
        <div className="bg-white rounded-lg shadow-xs overflow-hidden border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Claim ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {claims.map((claim, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{claim.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{claim.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center">
                      {getStatusIcon(claim.status)}
                      <span className={`
                        ${claim.status === 'Pending' ? 'text-yellow-600' : ''}
                        ${claim.status === 'Approved' ? 'text-green-600' : ''}
                        ${claim.status === 'Rejected' ? 'text-red-600' : ''}
                      `}>
                        {claim.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{claim.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
  );
};

export default ClaimDashboard;