import { FiClock, FiCheckCircle, FiAlertTriangle, FiFileText, FiDownload } from 'react-icons/fi';
import Navbar from './component/Navbar';

export default function ClaimStatus() {
  // Sample claims data
  const claims = [
    {
      id: '#CLAIM-2024-058',
      type: 'Auto Accident',
      date: 'Jul 28, 2024',
      status: 'processing', // processing / approved / rejected
      steps: [
        { name: 'Submitted', status: 'complete', date: 'Jul 28' },
        { name: 'Under Review', status: 'current', date: 'Jul 29' },
        { name: 'Assessment', status: 'pending' },
        { name: 'Resolution', status: 'pending' }
      ],
      documents: ['Police_report.pdf', 'Car_damage.jpg']
    },
    {
      id: '#CLAIM-2024-042',
      type: 'Property Damage',
      date: 'Jul 15, 2024',
      status: 'approved',
      steps: [
        { name: 'Submitted', status: 'complete', date: 'Jul 15' },
        { name: 'Under Review', status: 'complete', date: 'Jul 16' },
        { name: 'Assessment', status: 'complete', date: 'Jul 18' },
        { name: 'Approved', status: 'complete', date: 'Jul 20' }
      ],
      payout: '₦185,000'
    }
  ];

  const getStatusIcon = (status) => {
    switch(status) {
      case 'processing': return <FiClock className="text-yellow-500" />;
      case 'approved': return <FiCheckCircle className="text-green-500" />;
      case 'rejected': return <FiAlertTriangle className="text-red-500" />;
      default: return <FiClock className="text-gray-400" />;
    }
  };

  return (
    <>
    <Navbar />
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto mt-16">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Claims</h1>
        <p className="text-gray-600 mb-6">Track the progress of your submissions</p>

        {/* Claims List */}
        <div className="space-y-6">
          {claims.map((claim) => (
            <div key={claim.id} className="bg-white rounded-lg shadow-xs border border-gray-200 overflow-hidden">
              
              {/* Claim Header */}
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <div>
                  <h3 className="font-medium flex items-center">
                    {getStatusIcon(claim.status)}
                    <span className="ml-2">{claim.type}</span>
                  </h3>
                  <p className="text-sm text-gray-500">{claim.id} • Submitted {claim.date}</p>
                </div>
                {claim.payout && (
                  <span className="bg-green-50 text-green-800 px-3 py-1 rounded-full text-sm">
                    Paid: {claim.payout}
                  </span>
                )}
              </div>

              {/* Progress Stepper */}
              <div className="p-6">
                <div className="relative">
                  {/* Progress line */}
                  <div className="absolute left-4 top-5 h-0.5 w-[calc(100%-2rem)] bg-gray-200 z-0">
                    <div 
                      className={`h-full ${claim.status === 'approved' ? 'bg-green-500 w-full' : 
                        claim.status === 'rejected' ? 'bg-red-500 w-3/4' : 'bg-orange-500 w-1/2'}`}
                    ></div>
                  </div>

                  {/* Steps */}
                  <div className="relative grid grid-cols-4 gap-4 z-10">
                    {claim.steps.map((step, i) => (
                      <div key={i} className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1
                          ${step.status === 'complete' ? 'bg-green-100 text-green-600' :
                            step.status === 'current' ? 'bg-orange-100 text-orange-600' :
                            'bg-gray-100 text-gray-400'}`}>
                          {step.status === 'complete' ? <FiCheckCircle /> : i+1}
                        </div>
                        <p className={`text-xs text-center ${step.status === 'current' ? 'font-medium text-gray-900' : 'text-gray-500'}`}>
                          {step.name}
                        </p>
                        {step.date && <p className="text-xs text-gray-400 mt-1">{step.date}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Documents/CTA */}
              <div className="p-4 bg-gray-50 border-t border-gray-200">
                {claim.documents ? (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <FiFileText className="mr-1" /> Documents
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {claim.documents.map((doc, i) => (
                        <a 
                          key={i} 
                          href="#" 
                          className="flex items-center text-sm bg-white px-3 py-1 rounded border border-gray-200 hover:bg-gray-100"
                        >
                          {doc}
                          <FiDownload className="ml-2 text-gray-400" size={14} />
                        </a>
                      ))}
                    </div>
                  </div>
                ) : (
                  <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg text-sm">
                    {claim.status === 'approved' ? 'View Payout Details' : 'Add More Documents'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}