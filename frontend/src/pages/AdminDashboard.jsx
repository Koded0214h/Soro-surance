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
import { 
  getAdminMetrics, 
  getClaimsTrends, 
  getFraudData 
} from '../services/adminApi';

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

const AdminDashboard = () => {
  const [metrics, setMetrics] = useState({
    received: 0,
    approved: 0,
    flagged: 0,
    rejected: 0,
    loading: true
  });

  const [trendsData, setTrendsData] = useState({
    labels: [],
    values: [],
    loading: true
  });

  const [fraudData, setFraudData] = useState({
    labels: [],
    values: [],
    loading: true
  });

  const [percentages, setPercentages] = useState({
    received: '0%',
    approved: '0%',
    flagged: '0%',
    rejected: '0%',
    trends: '0%',
    fraud: '0%'
  });

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all data in parallel
        const [metricsRes, trendsRes, fraudRes] = await Promise.all([
          getAdminMetrics(),
          getClaimsTrends(),
          getFraudData()
        ]);

        setMetrics({
          received: metricsRes.total_claims,
          approved: metricsRes.approved_claims,
          flagged: metricsRes.flagged_claims,
          rejected: metricsRes.rejected_claims,
          loading: false
        });

        setTrendsData({
          labels: trendsRes.months,
          values: trendsRes.claim_counts,
          loading: false
        });

        setFraudData({
          labels: fraudRes.months,
          values: fraudRes.fraud_scores,
          loading: false
        });

        setPercentages({
          received: `${metricsRes.received_change}%`,
          approved: `${metricsRes.approved_change}%`,
          flagged: `${metricsRes.flagged_change}%`,
          rejected: `${metricsRes.rejected_change}%`,
          trends: `${trendsRes.trend_change}%`,
          fraud: `${fraudRes.fraud_change}%`
        });

      } catch (error) {
        console.error('Error loading dashboard data:', error);
        // Set loading states to false even if error occurs
        setMetrics(prev => ({...prev, loading: false}));
        setTrendsData(prev => ({...prev, loading: false}));
        setFraudData(prev => ({...prev, loading: false}));
      }
    };

    fetchData();

    // Set up polling for real-time updates
    const interval = setInterval(fetchData, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, []);

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

  return (
    <>
      <Navbar2 />
      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 mt-16 text-center">Dashboard</h1>
        <p className="text-gray-600 mb-8 text-center">Overview of key metrics and trends in claims processing</p>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Claims Received */}
          <MetricCard 
            title="Claims Received"
            value={metrics.received || 0}
            change={percentages.received}
            borderColor="border-orange-500"
            loading={metrics.loading}
          />

          {/* Claims Approved */}
          <MetricCard 
            title="Claims Approved"
            value={metrics.approved || 0}
            change={percentages.approved}
            borderColor="border-green-500"
            loading={metrics.loading}
          />

          {/* Claims Flagged */}
          <MetricCard 
            title="Claims Flagged"
            value={metrics.flagged || 0}
            change={percentages.flagged}
            borderColor="border-yellow-500"
            loading={metrics.loading}
          />

          {/* Claims Rejected */}
          <MetricCard 
            title="Claims Rejected"
            value={metrics.rejected || 0}
            change={percentages.rejected}
            borderColor="border-red-500"
            loading={metrics.loading}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Claim Trends */}
          <ChartCard 
            title="Claim Trends"
            change={percentages.trends}
            chartData={trendsChartData}
            chartType={Line}
            loading={trendsData.loading}
            color="orange"
          />

          {/* Fraud Scores */}
          <ChartCard 
            title="Fraud Scores"
            change={percentages.fraud}
            chartData={fraudChartData}
            chartType={Line}
            loading={fraudData.loading}
            color="green"
          />
        </div>
      </div>
    </>
  );
};

// Reusable Metric Card Component
const MetricCard = ({ title, value, change, borderColor, loading }) => (
  <div className={`bg-white p-6 rounded-lg shadow-sm border-l-4 ${borderColor}`}>
    <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
    {loading ? (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    ) : (
      <>
        <div className="flex items-end justify-between">
          <p className="text-3xl font-bold text-gray-800">{value?.toLocaleString() || '0'}</p>
          <span className={`font-medium ${
            change?.startsWith('-') ? 'text-red-500' : 'text-green-500'
          }`}>
            {change || '0%'}
          </span>
        </div>
      </>
    )}
  </div>
);

// Reusable Chart Card Component
const ChartCard = ({ title, change, chartData, chartType: Chart, loading, color }) => {
  // Function to get the appropriate color classes
  const getColorClasses = (color) => {
    switch (color) {
      case 'orange':
        return 'bg-orange-100 text-orange-800';
      case 'green':
        return 'bg-green-100 text-green-800';
      case 'blue':
        return 'bg-blue-100 text-blue-800';
      case 'red':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        <div className={`${getColorClasses(color)} px-3 py-1 rounded-full text-sm font-medium`}>
          {change} Last 30 Days
        </div>
      </div>
      <div className="h-64">
        {loading ? (
          <div className="animate-pulse h-full w-full bg-gray-200 rounded"></div>
        ) : (
          <Chart data={chartData} options={chartOptions} />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;