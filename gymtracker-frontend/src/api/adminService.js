// src/api/adminService.js
import axiosInstance from './axiosInstance';

// --- Exercise Management (Admin Only) ---

export const createExercise = (exerciseData) => {
  return axiosInstance.post('/api/exercises', exerciseData);
};

export const updateExercise = (id, exerciseData) => {
  return axiosInstance.put(`/api/exercises/${id}`, exerciseData);
};

export const deleteExercise = (id) => {
  return axiosInstance.delete(`/api/exercises/${id}`);
};
// Nota: Para obtener un solo ejercicio para editar, podemos reusar fetchExerciseById de exerciseService