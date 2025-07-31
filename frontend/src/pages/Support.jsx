import React from "react";
import { FiMail, FiPhone, FiMessageSquare, FiHelpCircle, FiChevronDown } from "react-icons/fi";
import Navbar from "../component/Navbar";

const SupportPage = () => {
  const faqs = [
    {
      question: "How do I reset my password?",
      answer: "Go to 'Account Settings' > 'Security' > 'Reset Password'. A link will be sent to your email."
    },
    {
      question: "Where can I track my claims?",
      answer: "Navigate to 'My Dashboard' > 'Orders' to see your complete purchase history."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept Visa, Mastercard, PayPal, and bank transfers."
    }
  ];

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto mt-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">How can we help you?</h1>
          <p className="text-lg text-gray-600">Find answers or contact our support team</p>
        </div>

        {/* Search Bar */}
        <div className="mb-12">
          <div className="relative max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Search help articles..."
              className="w-full px-5 py-3 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <button className="w-full flex justify-between items-center text-left">
                  <h3 className="font-medium text-gray-900">{faq.question}</h3>
                  <FiChevronDown className="text-gray-500" />
                </button>
                <p className="mt-3 text-gray-600 hidden">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Options */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-sm text-center border border-gray-200">
            <div className="bg-orange-100 w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4">
              <FiMail className="text-orange-600 text-xl" />
            </div>
            <h3 className="font-medium text-gray-900 mb-2">Email Us</h3>
            <p className="text-gray-600 mb-4">Get a response within 24 hours</p>
            <a href="mailto:support@yourdomain.com" className="text-orange-600 font-medium hover:underline">sorosurance@gmail.com</a>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm text-center border border-gray-200">
            <div className="bg-orange-100 w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4">
              <FiPhone className="text-orange-600 text-xl" />
            </div>
            <h3 className="font-medium text-gray-900 mb-2">Call Us</h3>
            <p className="text-gray-600 mb-4">Mon-Fri, 9am-5pm EST</p>
            <a href="tel:+18005551234" className="text-orange-600 font-medium hover:underline">+234 704 4523 964</a>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm text-center border border-gray-200">
            <div className="bg-orange-100 w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4">
              <FiMessageSquare className="text-orange-600 text-xl" />
            </div>
            <h3 className="font-medium text-gray-900 mb-2">Live Chat</h3>
            <p className="text-gray-600 mb-4">Instant help from our team</p>
            <button className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors">Start Chat</button>
          </div>
        </div>

        {/* Help Resources */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <FiHelpCircle className="mr-2 text-orange-600" /> Additional Resources
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <a href="#" className="text-orange-600 hover:underline">Help Center</a>
            <a href="#" className="text-orange-600 hover:underline">Community Forum</a>
            <a href="#" className="text-orange-600 hover:underline">Video Tutorials</a>
            <a href="#" className="text-orange-600 hover:underline">API Documentation</a>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default SupportPage;