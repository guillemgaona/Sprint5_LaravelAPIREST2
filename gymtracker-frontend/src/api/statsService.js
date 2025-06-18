import axiosInstance from './axiosInstance';

export const getVolumeStats = (userId) => {
  return axiosInstance.get(`/api/users/${userId}/stats/volume`);
};

export const getFrequencyStats = (userId) => {
  return axiosInstance.get(`/api/users/${userId}/stats/frequency`);
};

export const getPersonalBests = (userId) => {
  return axiosInstance.get(`/api/users/${userId}/personal-bests`);
};