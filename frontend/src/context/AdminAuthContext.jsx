import { createContext, useState, useContext } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/admin/auth/login/', { email, password });
      localStorage.setItem('admin_access_token', response.data.access);
      localStorage.setItem('admin_refresh_token', response.data.refresh);
      setAdmin(response.data.user);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('admin_access_token');
    localStorage.removeItem('admin_refresh_token');
    setAdmin(null);
    navigate('/admin/login');
  };

  const requestPasswordReset = async (email) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/admin/auth/password/reset/', { email });
      return response.data;
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to send reset email');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminAuthContext.Provider value={{ 
      admin, 
      login, 
      logout, 
      requestPasswordReset, 
      error, 
      loading 
    }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);

export { AdminAuthContext };
