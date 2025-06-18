import axiosInstance from './axiosInstance';

export const createSet = (sessionId, setData) => {
  return axiosInstance.post(`/api/sessions/${sessionId}/sets`, setData);
};

export const updateSet = (setId, setData) => {
  return axiosInstance.put(`/api/sets/${setId}`, setData);
};

export const deleteSet = (setId) => {
  return axiosInstance.delete(`/api/sets/${setId}`);
};