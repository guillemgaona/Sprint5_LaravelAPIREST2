import axiosInstance from './axiosInstance';

export const createExercise = (exerciseData) => {
  return axiosInstance.post('/api/exercises', exerciseData);
};

export const updateExercise = (id, exerciseData) => {
  return axiosInstance.put(`/api/exercises/${id}`, exerciseData);
};

export const deleteExercise = (id) => {
  return axiosInstance.delete(`/api/exercises/${id}`);
};
