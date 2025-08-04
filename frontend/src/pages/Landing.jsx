import React from 'react';
import { Lock, Mic, Clock, FileText, Headphones, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const App = () => {
  // A reusable component for the benefit cards to keep the code clean
  const BenefitCard = ({ icon: Icon, title, description }) => (
    <div className="bg-gray-100 p-6 rounded-xl shadow-sm text-center transition-transform hover:scale-105 duration-300">
      <div className="w-12 h-12 mx-auto mb-4">
        <Icon className="h-12 w-12 text-[#FF6600]" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );

  return (
    <div className="bg-white text-[#292929] font-inter">
      {/* Header */}
      <header className="bg-white shadow-md">
        <nav className="container mx-auto p-4 flex items-center justify-between flex-wrap">
          <div className="flex items-center text-xl font-bold text-[#e87d30]">
            Soro surance
          </div>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <Link to="#" className="text-[#292929] hover:text-[#0047AB] font-medium transition-colors">For Insurers</Link>
            <Link to="#" className="text-[#292929] hover:text-[#0047AB] font-medium transition-colors">For Users</Link>
            <Link to="#" className="text-[#292929] hover:text-[#0047AB] font-medium transition-colors">About Us</Link>
            <Link  to="/reg" className="bg-[#FF6600] text-white font-medium py-2 px-6 rounded-md shadow-lg hover:bg-[#E55B00] transition-colors">Get Started</Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-[#1C8D7C] text-white p-8 md:p-16">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center rounded-lg overflow-hidden relative
                        bg-cover bg-center"
             style={{ backgroundImage: "url('https://placehold.co/1200x500/1C8D7C/ffffff?text=INSURANCE')" }}>
          <div className="absolute inset-0 bg-[#1C8D7C] opacity-80 z-0"></div>
          <div className="relative z-10 flex flex-col items-start space-y-6 p-4 md:p-8">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">Revolutionizing Insurance Claims with <span className="text-[#FFC420]">AI-Powered Voice</span></h1>
            <p className="text-lg md:text-xl">
              Soro surance is an innovative platform that simplifies insurance claims for both companies and users. Submit claims using voice in local Nigerian languages, powered by advanced AI.
            </p>
            <Link to="/reg" className="bg-[#FF6600] text-white font-medium py-3 px-8 rounded-lg shadow-lg hover:bg-[#E55B00] transition-colors">Get Started</Link>
          </div>
          <div className="relative z-10 hidden md:flex items-center justify-center">
            {/* Placeholder for the illustration with the text "INSURANCE" */}
            <div className="p-8 md:p-16 rounded-lg">
              <img src="https://placehold.co/500x300/1C8D7C/ffffff?text=Illustration+Placeholder" alt="Insurance illustration" className="rounded-lg shadow-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits for Insurance Companies Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#292929] mb-4">Benefits for Insurance Companies</h2>
            <p className="text-lg text-[#555555] max-w-2xl mx-auto">
              Streamline your claims process and enhance customer satisfaction with Soro surance.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <BenefitCard
              icon={Lock}
              title="Enhanced Security"
              description="We prioritize the highest level of data security and privacy for all claims."
            />
            <BenefitCard
              icon={Mic}
              title="Voice-Enabled Claims"
              description="Users can submit claims using voice commands in local Nigerian languages."
            />
            <BenefitCard
              icon={Clock}
              title="Faster Processing"
              description="AI-powered automation significantly reduces claim processing times."
            />
          </div>
        </div>
      </section>

      {/* Benefits for Users Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#292929] mb-4">Benefits for Users</h2>
            <p className="text-lg text-[#555555] max-w-2xl mx-auto">
              Experience a hassle-free and efficient way to submit and track your insurance claims.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <BenefitCard
              icon={FileText}
              title="Easy Claim Submission"
              description="Submit claims quickly and easily using voice commands in your local language."
            />
            <BenefitCard
              icon={Headphones}
              title="Voice-Guided Assistance"
              description="Our AI provides step-by-step voice guidance throughout the claim submission process."
            />
            <BenefitCard
              icon={CheckCircle}
              title="Real-Time Updates"
              description="Receive real-time updates and notifications on the status of your claim."
            />
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-[#1C8D7C] text-white py-16 md:py-24 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Insurance Claims Process?</h2>
          <p className="text-lg max-w-2xl mx-auto mb-8">
            Join Soro surance today and experience the future of insurance claim management.
          </p>
          <Link to="/reg" className="bg-[#FF6600] text-white font-medium py-3 px-8 rounded-lg shadow-lg hover:bg-[#E55B00] transition-colors">
            Get Started
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#292929] text-white py-8">
        <div className="container mx-auto px-4 text-center text-sm md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex space-x-6">
              <Link to="#" className="hover:text-[#FF6600] transition-colors">Privacy Policy</Link>
              <Link to="#" className="hover:text-[#FF6600] transition-colors">Terms of Service</Link>
              <Link to="#" className="hover:text-[#FF6600] transition-colors">Contact Us</Link>
            </div>
            <div>
              &copy; 2024 Soro surance. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
