// src/api/sessionService.js
import axiosInstance from './axiosInstance';

export const fetchMySessions = () => {
  return axiosInstance.get('/api/sessions');
};

export const fetchSessionById = (id) => {
  return axiosInstance.get(`/api/sessions/${id}`);
};

export const createSession = (sessionData) => {
  return axiosInstance.post('/api/sessions', sessionData);
};