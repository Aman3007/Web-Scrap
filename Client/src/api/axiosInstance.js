import axios from 'axios';

const api = axios.create({
  baseURL: 'https://web-scrap-backend-w1d1.onrender.com/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
  withCredentials: true,
});


api.interceptors.response.use(
  (res) => res,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'Something went wrong. Please try again.';
    return Promise.reject(new Error(message));
  }
);

export default api;
