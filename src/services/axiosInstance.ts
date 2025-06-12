import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { notifier } from '../utils/notifier';

const API_BASE_URL = import.meta.env.VITE_APP_API_URL;

if (!API_BASE_URL) {
  console.error('FATAL ERROR: VITE_APP_API_URL is not defined in your .env file.');
}

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    //console.log('Requesting URL:', (config.baseURL || '') + (config.url || ''));
    const token = localStorage.getItem('authToken'); // Or however you store your token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    // It's better to let the response interceptor handle notifications for request setup errors too
    // enqueueSnackbar('Error in request configuration', { variant: 'error' });
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    // Extract a clean error message
    let message = 'An unexpected error occurred.';
    if (error.response) {
      const responseData = error.response.data as { message?: string; error?: any };
      message = responseData?.message || responseData?.error?.message || error.response.statusText || 'Server error.';
      if (error.response.status === 401) {
        // Optionally handle unauthorized access, e.g., redirect to login
        console.error('Unauthorized access (401). Consider redirecting to login.');
      }
    } else if (error.request) {
      message = 'Network Error: The server is not responding.';
    } else {
      message = `Request Error: ${error.message}`;
    }

    // Use the global notifier to display the error
    notifier.error(message);

    return Promise.reject(error);
  }
);