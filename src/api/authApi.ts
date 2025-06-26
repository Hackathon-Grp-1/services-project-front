// API functions for authentication
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3007/api/v1';

// Define types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface Role {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  type: string;
  description: string;
}

export interface User {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: null | string;
  firstName: string;
  lastName: string;
  type: string;
  email: string;
  phoneNumber: string | null;
  resetPasswordToken: string | null;
  resetPasswordTokenExpires: string | null;
  role: Role;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface RegisterCredentials {
  firstName: string;
  lastName: string;
  comment?: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

// Login function
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
    
    // Store token in localStorage
    if (response.data.accessToken) {
      localStorage.setItem('authToken', response.data.accessToken);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('tokenExpiry', new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString()); // 4 hours
    }
    
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Register function
export const register = async (credentials: RegisterCredentials): Promise<any> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, credentials);
    return response.data;
  } catch (error) {
    console.error('Register error:', error);
    throw error;
  }
};

// Logout function
export const logout = (): void => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
  localStorage.removeItem('tokenExpiry');
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('authToken');
  const expiry = localStorage.getItem('tokenExpiry');
  
  if (!token || !expiry) {
    return false;
  }
  
  // Check if token has expired
  const expiryDate = new Date(expiry);
  const now = new Date();
  
  if (now > expiryDate) {
    // Token expired, clear storage
    logout();
    return false;
  }
  
  return true;
};

// Get current user
export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    try {
      return JSON.parse(userStr);
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
      logout();
      return null;
    }
  }
  return null;
};

// Get auth token
export const getAuthToken = (): string | null => {
  if (!isAuthenticated()) {
    return null;
  }
  return localStorage.getItem('authToken');
};

// Add auth header to requests
export const authHeader = (): Record<string, string> => {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};
