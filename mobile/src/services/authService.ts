import api from './api';
import * as SecureStore from 'expo-secure-store';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
}

export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
}

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_KEY = 'user';

export class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await api.post('/auth/login/', credentials);
      const { access, refresh, user } = response.data;

      await this.storeTokens({ access, refresh });
      await this.storeUser(user);

      return { user, tokens: { access, refresh } };
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Login failed');
    }
  }

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    try {
      const response = await api.post('/auth/register/', credentials);
      const { access, refresh, user } = response.data;

      await this.storeTokens({ access, refresh });
      await this.storeUser(user);

      return { user, tokens: { access, refresh } };
    } catch (error: any) {
      const errors = error.response?.data || {};
      const errorMessages = Object.values(errors).flat().join(', ');
      throw new Error(errorMessages || 'Registration failed');
    }
  }

  async logout(): Promise<void> {
    try {
      const refreshToken = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
      if (refreshToken) {
        await api.post('/auth/logout/', { refresh: refreshToken });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      await this.clearTokens();
      await SecureStore.deleteItemAsync(USER_KEY);
    }
  }

  async refreshAccessToken(): Promise<string | null> {
    try {
      const refreshToken = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
      if (!refreshToken) return null;

      const response = await api.post('/auth/refresh/', { refresh: refreshToken });
      const { access } = response.data;

      await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, access);
      return access;
    } catch (error) {
      await this.clearTokens();
      return null;
    }
  }

  async getStoredUser(): Promise<User | null> {
    try {
      const userJson = await SecureStore.getItemAsync(USER_KEY);
      return userJson ? JSON.parse(userJson) : null;
    } catch {
      return null;
    }
  }

  async getStoredTokens(): Promise<AuthTokens | null> {
    try {
      const access = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
      const refresh = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
      
      if (access && refresh) {
        return { access, refresh };
      }
      return null;
    } catch {
      return null;
    }
  }

  private async storeTokens(tokens: AuthTokens): Promise<void> {
    await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, tokens.access);
    await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, tokens.refresh);
  }

  private async storeUser(user: User): Promise<void> {
    await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
  }

  private async clearTokens(): Promise<void> {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
    await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
  }
}

export const authService = new AuthService();
