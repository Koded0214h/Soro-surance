import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import Navbar2 from '../component/Navbar2';


// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  // State for metrics data
  const [metrics, setMetrics] = useState({
    received: 1250,
    approved: 980,
    flagged: 120,
    rejected: 150
  });

  // State for trends data
  const [trendsData, setTrendsData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    values: [800, 950, 1000, 1100, 1150, 1200, 1250]
  });

  // State for fraud data
  const [fraudData, setFraudData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    values: [120, 110, 105, 100, 95, 90, 85]
  });

  // Calculate percentages
  const percentages = {
    received: '+10%',
    approved: '-5%',
    flagged: '+15%',
    rejected: '-2%',
    trends: '+15%',
    fraud: '-8%'
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
    },
    scales: {
      y: {
        beginAtZero: false
      }
    },
    maintainAspectRatio: false
  };

  // Data for claims trends chart
  const trendsChartData = {
    labels: trendsData.labels,
    datasets: [
      {
        label: 'Claims',
        data: trendsData.values,
        borderColor: 'rgba(234, 88, 12, 1)',
        backgroundColor: 'rgba(234, 88, 12, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  // Data for fraud scores chart
  const fraudChartData = {
    labels: fraudData.labels,
    datasets: [
      {
        label: 'Fraud Score',
        data: fraudData.values,
        borderColor: 'rgba(16, 185, 129, 1)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  // Simulate data refresh
  useEffect(() => {
    const interval = setInterval(() => {
      // Update metrics with small random fluctuations
      setMetrics(prev => ({
        received: prev.received + Math.floor(Math.random() * 10 - 5),
        approved: prev.approved + Math.floor(Math.random() * 8 - 4),
        flagged: prev.flagged + Math.floor(Math.random() * 5 - 2),
        rejected: prev.rejected + Math.floor(Math.random() * 5 - 2)
      }));

      // Update trends with realistic growth
      setTrendsData(prev => ({
        ...prev,
        values: prev.values.map((val, i) => 
          i === prev.values.length - 1 ? 
          val + Math.floor(Math.random() * 20 - 5) : 
          val
        )
      }));

      // Update fraud scores with gradual improvement
      setFraudData(prev => ({
        ...prev,
        values: prev.values.map((val, i) => 
          i === prev.values.length - 1 ? 
          Math.max(50, val + Math.floor(Math.random() * 5 - 3)) : 
          val
        )
      }));
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <>
    <Navbar2 />
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 mt-16 text-center">Dashboard</h1>
      <p className="text-gray-600 mb-8 text-center">Overview of key metrics and trends in claims processing</p>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {/* Claims Received */}
        <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-orange-500">
          <h3 className="text-gray-500 text-sm font-medium mb-1">Claims Received</h3>
          <div className="flex items-end justify-between">
            <p className="text-3xl font-bold text-gray-800">{metrics.received.toLocaleString()}</p>
            <span className="text-green-500 font-medium">{percentages.received}</span>
          </div>
        </div>

        {/* Claims Approved */}
        <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500">
          <h3 className="text-gray-500 text-sm font-medium mb-1">Claims Approved</h3>
          <div className="flex items-end justify-between">
            <p className="text-3xl font-bold text-gray-800">{metrics.approved.toLocaleString()}</p>
            <span className="text-red-500 font-medium">{percentages.approved}</span>
          </div>
        </div>

        {/* Claims Flagged */}
        <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-yellow-500">
          <h3 className="text-gray-500 text-sm font-medium mb-1">Claims Flagged</h3>
          <div className="flex items-end justify-between">
            <p className="text-3xl font-bold text-gray-800">{metrics.flagged.toLocaleString()}</p>
            <span className="text-green-500 font-medium">{percentages.flagged}</span>
          </div>
        </div>

        {/* Claims Rejected */}
        <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-red-500">
          <h3 className="text-gray-500 text-sm font-medium mb-1">Claims Rejected</h3>
          <div className="flex items-end justify-between">
            <p className="text-3xl font-bold text-gray-800">{metrics.rejected.toLocaleString()}</p>
            <span className="text-red-500 font-medium">{percentages.rejected}</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Claim Trends */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Claim Trends</h2>
            <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
              {percentages.trends} Last 30 Days
            </div>
          </div>
          <div className="h-64">
            <Line data={trendsChartData} options={chartOptions} />
          </div>
        </div>

        {/* Fraud Scores */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Fraud Scores</h2>
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              {percentages.fraud} Last 30 Days
            </div>
          </div>
          <div className="h-64">
            <Line data={fraudChartData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Accessibility Note */}
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>This dashboard is designed with accessibility in mind, supporting screen readers and keyboard navigation.</p>
      </div>
    </div>
    </>
  );
};

export default Dashboard;