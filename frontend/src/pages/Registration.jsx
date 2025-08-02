import React from "react";
import { Link } from 'react-router-dom';

const Registration = () => {
  return (
    <div className="flex min-h-screen">
      {/* Left Column - Role Selection */}
      <div className="w-1/2 p-12 flex flex-col justify-center">
        <h1 className="text-3xl font-bold font-poppins pb-8">Welcome!</h1>
        <p className="text-gray-600 pb-8">Select your role to continue</p>
        
        <div className="space-y-6 gap-10">
          {/* User Button */}
          <Link to="/auth"> 
          <button className="bg-orange-100 mb-5 hover:bg-orange-200 w-full p-4 rounded-md flex items-center justify-between transition-colors border-2 border-transparent hover:border-orange-300">
            
            <div className="flex items-center">
              <div className="bg-orange-500 text-white p-2 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="font-bold">User</h3>
                <p className="text-sm text-gray-500">Access standard features</p>
              </div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button></Link>

          {/* Admin Button */}
          <Link to="/dashboard">
          <button className="bg-orange-100 hover:bg-orange-200 w-full p-4 rounded-md flex items-center justify-between transition-colors border-2 border-transparent hover:border-orange-300">
            <div className="flex items-center">
              <div className="bg-orange-500 text-white p-2 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="font-bold">Admin</h3>
                <p className="text-sm text-gray-500">Access dashboard and settings</p>
              </div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button></Link>
        </div>
      </div>
      
      {/* Right Column - Illustration */}
      <div className="w-1/2 bg-orange-100 flex flex-col items-center justify-center p-12">
        <div className="text-center max-w-md">
            <h1 className="text-5xl font-bold font-poppins pb-4 mb-6 text-orange-800">SoroSurance</h1>
          <h2 className="text-3xl font-bold font-poppins pb-4">Join Us Today</h2>
          <p className="text-gray-600 pb-6">
            Whether you're a regular user or an administrator, we've got you covered. Select your role to get started.
          </p>
          
        </div>
      </div>
    </div>
  );
};

export default Registration;