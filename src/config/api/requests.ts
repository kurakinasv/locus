import axios from 'axios';

import { USER_STORAGE } from 'config/localStorage';

import { BASE_URL } from './endpoints';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Check if cookie is expired and redirect to login page
    if (error.response?.status === 401) {
      localStorage.removeItem(USER_STORAGE);
      window.location.href = '/auth';
    }
  }
);
