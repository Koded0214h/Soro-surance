import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-white fixed left-0 right-0 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Left-aligned logo */}
          <div className="flex-shrink-0">
            <span className="text-2xl font-bold text-orange-900">SoroSurance</span>
          </div>

          {/* Right-aligned navigation links */}
          <div className="flex space-x-8">
            <a href="#" className="text-orange-700 text-md font-medium hover:text-orange-600">
              Dashboard
            </a>
            <a href="#" className="text-orange-700 text-md font-medium hover:text-orange-600">
              Claims
            </a>
            <a href="#" className="text-orange-700 text-md font-medium hover:text-orange-600">
              Customers
            </a>
            <a href="#" className="text-orange-700 text-md font-medium hover:text-orange-600">
              Report
            </a>
            <a href="#" className="text-orange-700 text-md font-medium hover:text-orange-600">
              Setting
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;