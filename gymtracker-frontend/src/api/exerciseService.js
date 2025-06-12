// src/api/exerciseService.js
import axiosInstance from './axiosInstance';

export const fetchExercises = () => {
  return axiosInstance.get('/api/exercises');
};