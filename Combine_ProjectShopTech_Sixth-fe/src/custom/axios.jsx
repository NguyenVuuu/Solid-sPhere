import axios from "axios";
import { isTokenExpired } from "../utils/jwtUtils";
import { API_BASE_URL } from "../config/api";

// Cấu hình axios: dùng proxy của Vite để tránh CORS
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Flag to prevent multiple refresh token requests
let isRefreshing = false;
let failedQueue = [];
// Process queued requests after token refresh
const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// Add request interceptor to add authentication token
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('authToken');

    if (token) {
      // Check if token is expired
      if (isTokenExpired(token)) {
        console.log('🔄 Token expired, attempting refresh...');

        // If already refreshing, wait for the refresh to complete
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          }).then(newToken => {
            config.headers.Authorization = `Bearer ${newToken}`;
            return config;
          }).catch(err => {
            return Promise.reject(err);
          });
        }

        // Try to refresh token
        isRefreshing = true;
        const refreshToken = localStorage.getItem('refreshToken');

        if (refreshToken && !isTokenExpired(refreshToken)) {
          try {
            // Note: Backend needs to implement refresh token endpoint
            // For now, we'll redirect to login
            console.log('⚠️ Token expired, redirecting to login');
            localStorage.removeItem('authToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');
            window.location.href = '/login';
            return Promise.reject(new Error('Token expired'));
          } catch (error) {
            console.error('❌ Failed to refresh token:', error);
            localStorage.removeItem('authToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');
            processQueue(error, null);
            window.location.href = '/login';
            return Promise.reject(error);
          } finally {
            isRefreshing = false;
          }
        } else {
          console.log('⚠️ Refresh token expired or missing, redirecting to login');
          localStorage.removeItem('authToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('user');
          isRefreshing = false;
          window.location.href = '/login';
          return Promise.reject(new Error('Refresh token expired'));
        }
      }

      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('❌ Lỗi khi gửi request:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for handling common errors
axiosInstance.interceptors.response.use(
  (response) => {
    // Backend returns ApiResponse wrapper with structure: { code, message, result }
    // We'll keep the full response but log it for debugging
    console.log('Response interceptor - Status:', response.status);
    console.log('Response interceptor - Data structure:', response.data);
    return response;
  },
  (error) => {
    console.error('=== AXIOS ERROR INTERCEPTOR ===');
    console.error('URL:', error.config?.url);
    console.error('Method:', error.config?.method);
    console.error('Status:', error.response?.status);
    console.error('Status Text:', error.response?.statusText);
    console.error('Headers:', error.response?.headers);
    console.error('Data:', error.response?.data);
    console.error('Data Type:', typeof error.response?.data);
    console.error('Message:', error.response?.data?.message);
    console.error('Error:', error.response?.data?.error);
    console.error('Full error object:', error.response || error);

    // Log all properties of error.response.data if it exists
    if (error.response?.data) {
      console.error('Error data properties:', Object.keys(error.response.data));
      console.error('Error data values:', Object.values(error.response.data));
      console.error('Error data JSON:', JSON.stringify(error.response.data, null, 2));
    }

    // Handle authentication errors (401 Unauthorized)
    if (error.response && error.response.status === 401) {
      console.log('=== AXIOS 401 ERROR ===');
      console.log('Request URL:', error.config?.url);
      console.log('Request method:', error.config?.method);
      console.log('Current path:', window.location.pathname);
      console.log('Auth token exists:', !!localStorage.getItem('authToken'));
      console.log('User exists:', !!localStorage.getItem('user'));

      // Don't redirect if we're trying to login/register
      const isAuthEndpoint = error.config?.url?.includes('/auth/login') ||
        error.config?.url?.includes('/users/register');

      if (!isAuthEndpoint) {
        console.log('Authentication required - redirecting to login...');

        // Clear any existing auth data
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');

        // Redirect to login (if not already there)
        if (!window.location.pathname.includes('/login')) {
          // Show a toast notification
          if (window.toast) {
            window.toast.error('Vui lòng đăng nhập để tiếp tục!');
          }
          window.location.href = '/login';
        }
      }
    }

    return Promise.reject(error);
  }
);
export default axiosInstance;

// Updated: 2025-10-12T16:06:27.651Z

// Updated: 2025-10-12T16:08:50.832Z
