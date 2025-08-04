import api from './api';

export const getAdminMetrics = async () => {
  try {
    const response = await api.get('/admin/metrics/');
    return response.data;
  } catch (error) {
    console.error('Error fetching admin metrics:', error);
    throw error;
  }
};

export const getClaimsTrends = async () => {
  try {
    const response = await api.get('/admin/claims/trends/');
    return response.data;
  } catch (error) {
    console.error('Error fetching claims trends:', error);
    throw error;
  }
};

export const getFraudData = async () => {
  try {
    const response = await api.get('/admin/fraud/');
    return response.data;
  } catch (error) {
    console.error('Error fetching fraud data:', error);
    throw error;
  }
};

export const getRecentClaims = async () => {
  try {
    const response = await api.get('/admin/claims/recent/');
    return response.data;
  } catch (error) {
    console.error('Error fetching recent claims:', error);
    throw error;
  }
};