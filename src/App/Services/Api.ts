import axios from 'axios';

const api = axios.create();

api.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    console.log(error.response);
    if (error.response) return Promise.reject(error.response);
    return Promise.reject(error);
  }
);

export default api;
