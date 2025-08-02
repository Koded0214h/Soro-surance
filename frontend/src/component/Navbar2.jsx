import React from 'react';

const Navbar2 = () => {
  return (
    <nav className="bg-white fixed left-0 right-0 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Left-aligned logo */}
          <div className="flex-shrink-0">
            <span className="text-2xl font-bold text-[#e87d30]">SoroSurance</span>
          </div>

          {/* Right-aligned navigation links */}
          <div className="flex space-x-8">
            <Link to="udash" className="text-orange-700 text-md font-medium hover:text-orange-600">
              Dashboard
            </Link>
            <Link to="/user" className="text-orange-700 text-md font-medium hover:text-orange-600">
              Users
            </Link>
            <Link to="/claimp" className="text-orange-700 text-md font-medium hover:text-orange-600">
              Claims
            </Link>
            <Link to="/settings" className="text-orange-700 text-md font-medium hover:text-orange-600">
            Settings
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar2;