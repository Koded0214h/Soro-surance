import React from 'react';
import { GoPlus } from "react-icons/go";
import { FcMenu } from "react-icons/fc";
import { CiCircleQuestion } from "react-icons/ci";
import Navbar from '../component/Navbar';
import { Link } from 'react-router-dom';

const Notifications = () => {
  return (
    <>
    <Navbar />
    <div className="p-6 max-w-7xl mx-auto flex flex-row">
      {/* Header */}
      
      {/* Notification Items */}
      <div className="space-y-4 mb-8 pr-[200px]">
                        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center mt-16">Notifications</h1>

        {/* Approved */}
        <div className="p-4 bg-white rounded-lg border-l-4 border-orange-500 shadow-xs">

          <div className="font-semibold text-gray-900 flex items-center gap-2">
            <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
            Claim Approved
          </div>
          <p className="text-gray-600 mt-1 text-sm">
            Your claim for vehicle damage has been approved. Please proceed to the next steps.
          </p>
        </div>
        
        {/* Under Review */}
        <div className="p-4 bg-white rounded-lg border-l-4 border-yellow-500 shadow-xs">
          <div className="font-semibold text-gray-900 flex items-center gap-2">
            <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
            Claim Under Review
          </div>
          <p className="text-gray-600 mt-1 text-sm">
            Your claim for medical expenses is under review. We will notify you of any updates.
          </p>
        </div>
        
        {/* Rejected */}
        <div className="p-4 bg-white rounded-lg border-l-4 border-orange-200 shadow-xs">
          <div className="font-semibold text-gray-900 flex items-center gap-2">
            <span className="w-2 h-2 bg-orange-200 rounded-full"></span>
            Claim Rejected
          </div>
          <p className="text-gray-600 mt-1 text-sm">
            Your claim for property damage has been rejected due to insufficient evidence.
          </p>
        </div>
      </div>
      
      {/* Quick Actions Section */}
      <div>
        <h2 className="font-bold text-gray-900 mb-7 text-2xl text-center mt-16">Quick Actions</h2>
        <div className="space-y-2">
          <div className='flex flex-row gap-[50px]'>
            <GoPlus className='bg-orange-100 text-5xl p-1 font-bold'/>
            <Link to="/listen">
          <button className=" mb-5 font-bold w-72 text-left p-3 bg-gray-50 shadow-md hover:bg-gray-100 rounded-lg text-gray-700 text-sm transition-colors">
            Submit a New Claim
          </button></Link>
          </div>
          <div className='flex flex-row gap-[50px]'>
            <FcMenu className='bg-orange-100 text-5xl p-2 font-bold'/>
            <Link to="/claimd">
          <button className=" mb-5 w-72 font-bold text-left p-3 bg-gray-50 shadow-md hover:bg-gray-100 rounded-lg text-gray-700 text-sm transition-colors">
            View All Claims
          </button></Link>
          </div>
          <div className='flex flex-row gap-[50px]'>
            <CiCircleQuestion className='bg-orange-100 text-5xl p-2 font-bold'/>
          <button className=" mb-5 w-full font-bold text-left p-3 bg-gray-50 shadow-md hover:bg-gray-100 rounded-lg text-gray-700 text-sm transition-colors">
            Contact Support
          </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Notifications;