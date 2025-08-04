import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
});

// Add request interceptor for admin routes
api.interceptors.request.use((config) => {
  // Skip auth headers for these endpoints
  if (config.url.includes('/auth/') || config.url.includes('/password/reset')) {
    return config;
  }

  // Use admin token for admin routes
  if (config.url.startsWith('/admin')) {
    const token = localStorage.getItem('admin_access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }

  // Default to regular user token for other routes
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config});

// Add response interceptor to handle token refresh
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    
    // If 401 error and it's an admin route
    if (error.response?.status === 401 && 
        originalRequest.url.startsWith('/admin') &&
        !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('admin_refresh_token');
        if (refreshToken) {
          const response = await api.post('/admin/auth/refresh/', {
            refresh: refreshToken
          });
          
          localStorage.setItem('admin_access_token', response.data.access);
          originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
          return api(originalRequest);
        }
      } catch (err) {
        // If refresh fails, logout the admin
        localStorage.removeItem('admin_access_token');
        localStorage.removeItem('admin_refresh_token');
        window.location.href = '/admin/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;