import api from '../api';

// Fetch admin metrics
export const getAdminMetrics = async () => {
  try {
    const response = await api.get('/admin/metrics/');
    console.log('Admin metrics response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching admin metrics:', error);
    // Return default values in case of error
    return {
      total_claims: 0,
      approved_claims: 0,
      flagged_claims: 0,
      rejected_claims: 0,
      received_change: 0,
      approved_change: 0,
      flagged_change: 0,
      rejected_change: 0
    };
  }
};

// Fetch claims trends
export const getClaimsTrends = async () => {
  try {
    const response = await api.get('/admin/claims/trends/');
    console.log('Claims trends response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching claims trends:', error);
    // Return default values in case of error
    return {
      months: [],
      claim_counts: [],
      trend_change: 0
    };
  }
};

// Fetch fraud data
export const getFraudData = async () => {
  try {
    const response = await api.get('/admin/fraud/');
    console.log('Fraud data response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching fraud data:', error);
    // Return default values in case of error
    return {
      months: [],
      fraud_scores: [],
      fraud_change: 0
    };
  }
};

// Fetch admin claims list
export const getAdminClaims = async () => {
  try {
    const response = await api.get('/admin/claims/');
    console.log('Admin claims response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching admin claims:', error);
    throw error;
  }
};

// Update claim status
export const updateClaimStatus = async (claimId, status) => {
  try {
    const response = await api.patch(`/admin/claims/${claimId}/`, { status });
    console.log('Update claim status response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating claim status:', error);
    throw error;
  }
};
