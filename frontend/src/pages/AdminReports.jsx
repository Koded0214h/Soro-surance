import React, { useState } from 'react';
import { FiDownload, FiBarChart2, FiPieChart, FiActivity } from 'react-icons/fi';
import Navbar2 from '../component/Navbar2';

const AdminReports = () => {
  const [selectedReport, setSelectedReport] = useState('claims');
  const [dateRange, setDateRange] = useState('monthly');

  const reports = [
    { id: 'claims', name: 'Claims Report', icon: <FiBarChart2 /> },
    { id: 'fraud', name: 'Fraud Detection Report', icon: <FiActivity /> },
    { id: 'financial', name: 'Financial Report', icon: <FiPieChart /> },
  ];

  const generateReport = () => {
    // In a real app, this would generate and download a report
    alert(`Generating ${selectedReport} report for ${dateRange} period...`);
  };

  return (
    <>
      <Navbar2 />
      <div className="p-6 max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1 mt-16">Reports</h1>
          <p className="text-gray-600">Generate and download detailed reports</p>
        </div>

        <div className="bg-white rounded-lg shadow-xs overflow-hidden border border-gray-200 mb-8">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Generate Report</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Report Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Report Type
                </label>
                <div className="space-y-2">
                  {reports.map((report) => (
                    <div
                      key={report.id}
                      className={`flex items-center p-3 rounded-md cursor-pointer ${
                        selectedReport === report.id
                          ? 'bg-orange-50 border border-orange-200'
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                      onClick={() => setSelectedReport(report.id)}
                    >
                      <span className="mr-3 text-orange-600">{report.icon}</span>
                      <span className="text-sm font-medium text-gray-700">{report.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Date Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date Range
                </label>
                <div className="space-y-2">
                  {['daily', 'weekly', 'monthly', 'quarterly', 'yearly'].map((range) => (
                    <div
                      key={range}
                      className={`flex items-center p-3 rounded-md cursor-pointer ${
                        dateRange === range
                          ? 'bg-orange-50 border border-orange-200'
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                      onClick={() => setDateRange(range)}
                    >
                      <span className="text-sm font-medium text-gray-700 capitalize">
                        {range}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={generateReport}
                className="flex items-center bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-md text-sm font-medium"
              >
                <FiDownload className="mr-2" />
                Generate Report
              </button>
            </div>
          </div>
        </div>

        {/* Sample Report Data */}
        <div className="bg-white rounded-lg shadow-xs overflow-hidden border border-gray-200">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              {reports.find(r => r.id === selectedReport)?.name} - Sample Data
            </h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Period
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Claims
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Approved
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rejected
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pending
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fraud Detected
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[
                    { period: 'Jan 2023', total: 142, approved: 112, rejected: 18, pending: 12, fraud: 5 },
                    { period: 'Feb 2023', total: 156, approved: 128, rejected: 15, pending: 13, fraud: 3 },
                    { period: 'Mar 2023', total: 189, approved: 152, rejected: 21, pending: 16, fraud: 7 },
                    { period: 'Apr 2023', total: 178, approved: 145, rejected: 19, pending: 14, fraud: 4 },
                    { period: 'May 2023', total: 195, approved: 162, rejected: 18, pending: 15, fraud: 6 },
                  ].map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {row.period}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {row.total}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                        {row.approved}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                        {row.rejected}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-600">
                        {row.pending}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-600">
                        {row.fraud}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminReports;
