const API_BASE_URL = 'http://localhost:8000/api';

class AuthService {
  constructor() {
    this.accessToken = localStorage.getItem('accessToken');
    this.refreshToken = localStorage.getItem('refreshToken');
    this.user = JSON.parse(localStorage.getItem('user') || 'null');
  }

  setTokens(accessToken, refreshToken) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  setUser(user) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  clearAuth() {
    this.accessToken = null;
    this.refreshToken = null;
    this.user = null;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  }

  async makeAuthenticatedRequest(url, options = {}) {
    if (!this.accessToken) {
      throw new Error('No access token available');
    }

    const config = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.accessToken}`,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      if (response.status === 401) {
        // Token expired, try to refresh
        const refreshed = await this.refreshAccessToken();
        if (refreshed) {
          // Retry the request with new token
          config.headers.Authorization = `Bearer ${this.accessToken}`;
          return await fetch(url, config);
        } else {
          // Refresh failed, redirect to login
          this.clearAuth();
          window.location.href = '/login';
          throw new Error('Authentication failed');
        }
      }
      
      return response;
    } catch (error) {
      console.error('Request failed:', error);
      throw error;
    }
  }

  async refreshAccessToken() {
    if (!this.refreshToken) {
      return false;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/refresh/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refresh: this.refreshToken,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        this.setTokens(data.access, this.refreshToken);
        return true;
      } else {
        this.clearAuth();
        return false;
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
      this.clearAuth();
      return false;
    }
  }

  async login(email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        this.setTokens(data.tokens.access, data.tokens.refresh);
        // Fetch full user profile after login
        const profileResponse = await this.getUserProfile();
        if (profileResponse.success) {
          this.setUser(profileResponse.user);
          return { success: true, user: profileResponse.user };
        } else {
          this.setUser(data.user);
          return { success: true, user: data.user };
        }
      } else {
        return { success: false, error: data.error || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Network error' };
    }
  }

  async register(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        this.setTokens(data.tokens.access, data.tokens.refresh);
        // Fetch full user profile after registration
        const profileResponse = await this.getUserProfile();
        if (profileResponse.success) {
          this.setUser(profileResponse.user);
          return { success: true, user: profileResponse.user };
        } else {
          this.setUser(data.user);
          return { success: true, user: data.user };
        }
      } else {
        return { success: false, error: data.error || 'Registration failed' };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'Network error' };
    }
  }

  async logout() {
    try {
      if (this.refreshToken) {
        await fetch(`${API_BASE_URL}/auth/logout/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.accessToken}`,
          },
          body: JSON.stringify({
            refresh_token: this.refreshToken,
          }),
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.clearAuth();
    }
  }

  async getUserProfile() {
    try {
      const response = await this.makeAuthenticatedRequest(`${API_BASE_URL}/auth/profile/`);
      
      if (response.ok) {
        const userData = await response.json();
        this.setUser(userData);
        return { success: true, user: userData };
      } else {
        return { success: false, error: 'Failed to fetch user profile' };
      }
    } catch (error) {
      console.error('Get profile error:', error);
      return { success: false, error: 'Network error' };
    }
  }

  isAuthenticated() {
    return !!this.accessToken && !!this.user;
  }

  getUser() {
    return this.user;
  }

  getAccessToken() {
    return this.accessToken;
  }
}

export default new AuthService();
