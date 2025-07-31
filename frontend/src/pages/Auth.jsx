import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(false);

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Column - Form Section */}
      <div className="w-1/2 p-12 flex flex-col justify-center relative overflow-hidden">
        <AnimatePresence mode="wait">
          {!isLogin ? (
            <motion.div
              key="register"
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute w-full pr-12"
            >
              <h1 className="text-3xl font-bold font-poppins pb-8">Create your account</h1>
              <form className="space-y-6">
                {/* Registration form fields */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                    Full name
                  </label>
                  <input
                    className="bg-orange-100 w-[650px] p-2  rounded-md focus:outline-orange-500"
                    type="text"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                    Phone number
                  </label>            
                  <input
                    className="bg-orange-100 w-[650px] p-3 rounded-md focus:outline-orange-500"
                    type="number"
                    placeholder="Enter your phone number"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                    Email
                  </label>
                  <input
                    className="bg-orange-100 w-[650px] p-3 rounded-md focus:outline-orange-500"
                    type="email"
                    placeholder="Enter your email"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                    Password
                  </label>
                  <input
                    className="bg-orange-100 w-[650px] p-3 rounded-md focus:outline-orange-500 mb-3"
                    type="password"
                    placeholder="Enter your password"
                  />
                </div>
                <a href="/udash">
                <button
                  type="button"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold w-[650px] p-3 rounded-md transition-colors"
                >
                  Sign up
                </button></a>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="login"
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute w-full pr-12"
            >
              <h1 className="text-3xl font-bold font-poppins pb-6">Welcome Back!</h1>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                    Email
                  </label>
                  <input
                    className="w-[650px] px-4 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 bg-orange-50 placeholder-orange-300"
                    type="email"
                    placeholder="Enter your email"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                    Password
                  </label>
                  <input
                    className="w-[650px] px-4 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 bg-orange-50 placeholder-orange-300"
                    type="password"
                    placeholder="Enter your password"
                  />
                </div>
                
                <div className="flex justify-center">
                  <a href="#" className="text-sm text-orange-600 hover:text-orange-700 hover:underline mb-4">
                    Forgot Password?
                  </a>
                </div>
                
               <a href="/udash"> <button
                  type="button"
                  className="w-[650px] bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                >
                  Login
                </button></a>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Right Column - Welcome Section */}
      <div className="w-1/2 bg-orange-100 flex flex-col items-center justify-center pl-12 pr-12 rounded-tl-[60px] rounded-bl-[60px]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-3xl font-bold font-poppins pb-6 text-center">
            {isLogin ? "New Here?" : "Welcome Back!"}
          </h1>
          <p className="text-gray-600 pb-6 text-center">
            {isLogin ? "Create an account to get started" : "Already have an account?"}
          </p>
          <button
            onClick={toggleAuthMode}
            className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-bold px-8 py-2 rounded-md transition-colors mx-auto block"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;