// src/api/setService.js
import axiosInstance from './axiosInstance';

// Añade una nueva serie a una sesión de entrenamiento
export const createSet = (sessionId, setData) => {
  return axiosInstance.post(`/api/sessions/${sessionId}/sets`, setData);
};

// Actualiza una serie existente
export const updateSet = (setId, setData) => {
  return axiosInstance.put(`/api/sets/${setId}`, setData);
};

// Elimina una serie
export const deleteSet = (setId) => {
  return axiosInstance.delete(`/api/sets/${setId}`);
};