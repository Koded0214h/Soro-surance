import React, { useState } from 'react';
import { FiEye, FiFilter, FiChevronDown } from 'react-icons/fi';
import Navbar from '../component/Navbar';

const ClaimsPage = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Sample claims data
  const claims = [
    { id: '#12345', customer: 'Aisha Bello', date: '2024-01-15', status: 'Pending' },
    { id: '#56789', customer: 'Chukwuma Eze', date: '2024-02-20', status: 'Approved' },
    { id: '#90123', customer: 'Fatima Hassan', date: '2024-03-10', status: 'Fraud Flagged' },
    { id: '#34567', customer: 'Adekunle Adebayo', date: '2024-04-05', status: 'Pending' },
    { id: '#78901', customer: 'Ngozi Okoro', date: '2024-05-12', status: 'Approved' },
  ];

  // Filter claims based on active tab
  const filteredClaims = activeTab === 'All' 
    ? claims 
    : claims.filter(claim => claim.status === activeTab);

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch(status) {
      case 'Pending':
        return <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>Pending</span>;
      case 'Approved':
        return <span className={`${baseClasses} bg-green-100 text-green-800`}>Approved</span>;
      case 'Fraud Flagged':
        return <span className={`${baseClasses} bg-red-100 text-red-800`}>Fraud Flagged</span>;
      default:
        return <span className={`${baseClasses} bg-gray-100 text-gray-800`}>{status}</span>;
    }
  };

  return (
    <>
    <Navbar />
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 mt-16 text-center">Claims</h1>
        <p className="text-gray-600 text-center">Manage and process insurance claims efficiently.</p>
      </div>

      {/* Tabs and Filter */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4 border-b border-gray-200">
          {['All', 'Pending', 'Approved', 'Fraud Flagged'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 px-1 font-medium text-sm ${activeTab === tab ? 'text-orange-600 border-b-2 border-orange-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative">
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center text-sm text-gray-700 bg-white border border-gray-300 rounded-md px-3 py-2 hover:bg-gray-50"
          >
            <FiFilter className="mr-2" />
            Filter
            <FiChevronDown className="ml-2" />
          </button>
          {isFilterOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 p-2 border border-gray-200">
              {/* Filter options would go here */}
              <div className="text-sm text-gray-700 p-2">Date Range</div>
              <div className="text-sm text-gray-700 p-2">Customer</div>
              <div className="text-sm text-gray-700 p-2">Claim Type</div>
            </div>
          )}
        </div>
      </div>

      {/* Claims Table */}
      <div className="bg-white rounded-lg shadow-xs overflow-hidden border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Claim ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredClaims.map((claim, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{claim.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{claim.customer}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{claim.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {getStatusBadge(claim.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-orange-600 hover:text-orange-800 flex items-center">
                    <FiEye className="mr-1" />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default ClaimsPage;