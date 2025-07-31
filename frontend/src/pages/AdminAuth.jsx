import React, { useState } from "react";
import { FiLock, FiMail, FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";

const AdminAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your authentication logic here
    console.log("Admin login attempt:", { email, password });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Admin Branding Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="w-16 h-16 bg-orange-600 rounded-lg mx-auto flex items-center justify-center mb-4">
          <FiLock className="text-white text-2xl" />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900">
          Admin Portal
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          {isLoginView 
            ? "Enter your credentials to access the dashboard" 
            : "Reset your admin password"}
        </p>
      </div>

      {/* Auth Card */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {isLoginView ? (
            // Login Form
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Admin Email
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="py-2 pl-10 block w-full border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                    placeholder="admin@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="py-2 pl-10 pr-10 block w-full border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      {showPassword ? <FiEyeOff className="h-5 w-5" /> : <FiEye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <button
                    type="button"
                    onClick={() => setIsLoginView(false)}
                    className="font-medium text-orange-600 hover:text-orange-500"
                  >
                    Forgot password?
                  </button>
                </div>
              </div>

              <div>
                <a href="/dashboard">
                <button
                  type="submit"
                  className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign in <FiArrowRight className="ml-2" />
                </button></a>
              </div>
            </form>
          ) : (
            // Password Recovery Form
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="recovery-email" className="block text-sm font-medium text-gray-700">
                  Admin Email
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="recovery-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="py-2 pl-10 block w-full border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                    placeholder="admin@example.com"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setIsLoginView(true)}
                  className="text-sm font-medium text-gray-600 hover:text-gray-500"
                >
                  Back to login
                </button>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  Send Reset Link <FiArrowRight className="ml-2" />
                </button>
              </div>
            </form>
          )}

          {/* Security Note */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Restricted Access
                </span>
              </div>
            </div>
            <p className="mt-2 text-center text-xs text-gray-600">
              Unauthorized access to this system is prohibited.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAuth;