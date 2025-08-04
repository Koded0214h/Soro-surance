import React from 'react';
import { FiHome, FiUsers, FiFile, FiBarChart2, FiSettings, FiLogOut } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext.jsx';

const AdminNavbar = () => {
  const { logout } = useAdminAuth();
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', icon: <FiHome />, path: '/admin/dashboard' },
    { name: 'Users', icon: <FiUsers />, path: '/admin/users' },
    { name: 'Claims', icon: <FiFile />, path: '/admin/claims' },
    { name: 'Reports', icon: <FiBarChart2 />, path: '/admin/reports' },
    { name: 'Settings', icon: <FiSettings />, path: '/admin/settings' },
  ];

  return (
    <div className="admin-navbar bg-gray-800 text-white min-h-screen w-64 fixed">
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold">SoroSurance Admin</h1>
      </div>
      
      <nav className="mt-6">
        <ul>
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`flex items-center px-6 py-3 text-sm font-medium ${
                  location.pathname === item.path
                    ? 'bg-orange-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="absolute bottom-0 w-full p-4 border-t border-gray-700">
        <button
          onClick={logout}
          className="flex items-center text-gray-300 hover:text-white w-full px-4 py-2 rounded-md hover:bg-gray-700"
        >
          <FiLogOut className="mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminNavbar;
