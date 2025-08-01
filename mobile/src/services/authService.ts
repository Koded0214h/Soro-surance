import axios, { AxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: '/api/auth', // Update with your backend URL
});

// Request interceptor to add JWT token
api.interceptors.request.use(async (config: AxiosRequestConfig) => {
  try {
    const token = await AsyncStorage.getItem('jwt_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  } catch (error) {
    return Promise.reject(error);
  }
});

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post('/login', { email, password });
    await AsyncStorage.setItem('jwt_token', response.data.token);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const register = async (name: string, email: string, password: string) => {
  try {
    const response = await api.post('/register', { name, email, password });
    await AsyncStorage.setItem('jwt_token', response.data.token);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  await AsyncStorage.removeItem('jwt_token');
};

export const isAuthenticated = async () => {
  const token = await AsyncStorage.getItem('jwt_token');
  return !!token;
};
