import axios from 'axios';

const API = axios.create();

API.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    console.log(error.response);
    if (error.response) return Promise.reject(error.response);
    return Promise.reject(error);
  }
);

export default API;
