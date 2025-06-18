import axiosInstance from './axiosInstance';

export const fetchAllExercises = async () => {
  let page = 1;
  let allExercises = [];
  let response;

  do {
    response = await axiosInstance.get(`/api/exercises?page=${page}`);
    allExercises = allExercises.concat(response.data.data);
    page++;
  } while (response.data.meta && response.data.meta.current_page < response.data.meta.last_page);

  return allExercises;
};

export const fetchExercises = (page = 1) => {
  return axiosInstance.get(`/api/exercises?page=${page}`);
};

export const fetchExerciseById = (id) => {
  return axiosInstance.get(`/api/exercises/${id}`);
};