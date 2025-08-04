import React, { useState } from 'react';
import Navbar2 from '../component/Navbar2';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    siteName: 'SoroSurance',
    supportEmail: 'support@sorosurance.com',
    autoApproval: false,
    fraudDetection: true,
    notifications: true,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    console.log('Settings updated:', settings);
    alert('Settings saved successfully!');
  };

  return (
    <>
      <Navbar2 />
      <div className="p-6 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1 mt-16">Admin Settings</h1>
          <p className="text-gray-600">Manage your application settings and preferences</p>
        </div>

        <div className="bg-white rounded-lg shadow-xs overflow-hidden border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button className="text-orange-600 border-b-2 border-orange-600 py-4 px-6 text-sm font-medium">
                General
              </button>
              <button className="text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-6 text-sm font-medium border-b-2 border-transparent">
                Security
              </button>
              <button className="text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-6 text-sm font-medium border-b-2 border-transparent">
                Notifications
              </button>
            </nav>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 gap-6">
              {/* Site Name */}
              <div>
                <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 mb-1">
                  Site Name
                </label>
                <input
                  type="text"
                  id="siteName"
                  name="siteName"
                  value={settings.siteName}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
                <p className="mt-1 text-sm text-gray-500">
                  The name that appears in the browser tab and in emails
                </p>
              </div>

              {/* Support Email */}
              <div>
                <label htmlFor="supportEmail" className="block text-sm font-medium text-gray-700 mb-1">
                  Support Email
                </label>
                <input
                  type="email"
                  id="supportEmail"
                  name="supportEmail"
                  value={settings.supportEmail}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Email address where support requests are sent
                </p>
              </div>

              {/* Auto Approval */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="autoApproval"
                  name="autoApproval"
                  checked={settings.autoApproval}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                />
                <label htmlFor="autoApproval" className="ml-2 block text-sm text-gray-700">
                  Enable Auto Approval for Claims
                </label>
              </div>

              {/* Fraud Detection */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="fraudDetection"
                  name="fraudDetection"
                  checked={settings.fraudDetection}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                />
                <label htmlFor="fraudDetection" className="ml-2 block text-sm text-gray-700">
                  Enable Fraud Detection
                </label>
              </div>

              {/* Notifications */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="notifications"
                  name="notifications"
                  checked={settings.notifications}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                />
                <label htmlFor="notifications" className="ml-2 block text-sm text-gray-700">
                  Enable Email Notifications
                </label>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                className="bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminSettings;
