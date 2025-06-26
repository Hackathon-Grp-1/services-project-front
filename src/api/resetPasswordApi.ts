import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const resetPassword = async (email: string): Promise<any> => {
  return axios.post(`${API_BASE_URL}/users/reset-password`, { email });
};

export const confirmResetPassword = async (token: string, password: string): Promise<any> => {
  return axios.post(`${API_BASE_URL}/api/v1/users/reset-password/confirm`, { token, password });
};
