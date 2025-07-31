import React, { useState } from 'react';
import { FiSearch, FiUserX, FiMoreVertical } from 'react-icons/fi';
import Navbar2 from '../component/Navbar2';

const UserManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample user data
  const users = [
    { name: 'Aisha Bello', lastActive: '2 days ago', status: 'Active' },
    { name: 'Chulwuma Eze', lastActive: '1 week ago', status: 'Active' },
    { name: 'Fatima Hassan', lastActive: '1 day ago', status: 'Active' },
    { name: 'Ibrahim Musa', lastActive: '3 days ago', status: 'Active' },
    { name: 'Ngozi Okoro', lastActive: '5 days ago', status: 'Active' },
    { name: 'Adekunle Adebayo', lastActive: '2 weeks ago', status: 'Active' },
    { name: 'Halima Sani', lastActive: '4 days ago', status: 'Active' },
    { name: 'Emeka Nwosu', lastActive: '1 week ago', status: 'Active' },
    { name: 'Rukayat Laval', lastActive: '6 days ago', status: 'Active' },
    { name: 'Tunde Oladèle', lastActive: '3 days ago', status: 'Active' },
  ];

  // Filter users based on search
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
    <Navbar2 />
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1 mt-16">SoroSurance</h1>
        <p className="text-gray-600">Manage all users and their activity</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6 flex items-center bg-orange-50 rounded-lg shadow-xs border border-gray-200 p-2 max-w-md">
        <FiSearch className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search users"
          className="flex-1 outline-none text-sm bg-orange-50 text-gray-700"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-xs overflow-hidden border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map((user, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Last active {user.lastActive}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-red-500 hover:text-red-700 flex items-center">
                    <FiUserX className="mr-1" /> Ban
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

export default UserManagement;