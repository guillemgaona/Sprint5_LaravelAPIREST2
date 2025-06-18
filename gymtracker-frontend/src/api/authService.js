import axiosInstance from './axiosInstance';

export const loginUser = (credentials) => {
  return axiosInstance.post('/api/login', credentials);
};

export const registerUser = (userData) => {
  return axiosInstance.post('/api/register', userData);
};

export const getAuthenticatedUser = () => {
  return axiosInstance.get('/api/user');
};