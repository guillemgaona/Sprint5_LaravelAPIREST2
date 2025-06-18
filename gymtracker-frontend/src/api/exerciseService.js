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

/**
 * Obtiene una lista paginada de todos los ejercicios.
 * @param {number} page - El número de página para la paginación.
 * @returns {Promise} La promesa de la petición de Axios.
 */
export const fetchExercises = (page = 1) => {
  return axiosInstance.get(`/api/exercises?page=${page}`);
};

/**
 * Obtiene los detalles de un único ejercicio por su ID.
 * Esto es necesario para la página de edición para poder rellenar el formulario.
 * @param {number|string} id - El ID del ejercicio a obtener.
 * @returns {Promise} La promesa de la petición de Axios.
 */
export const fetchExerciseById = (id) => {
  return axiosInstance.get(`/api/exercises/${id}`);
};