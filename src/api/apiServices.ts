import axios from "axios";
import NetInfo from '@react-native-community/netinfo';
import { API_BASE_URL } from "./apiConfig";
import { getToken } from "../utils/TokenStorage";

const apiService = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' }
});

// 🔑 Attach token automatically
apiService.interceptors.request.use(
  async (config) => {
    try {
      // Check network connectivity before making request
      const netInfo = await NetInfo.fetch();
      if (!netInfo.isConnected) {
        throw new Error('No internet connection');
      }

      const token = await getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e: any) {
      if (e.message === 'No internet connection') {
        return Promise.reject(e);
      }
      console.log('Token read skipped');
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle errors
apiService.interceptors.response.use(
  (response) => response,
  async (error) => {
    let message = "Something went wrong";
    let status = null;
    let isNetworkError = false;

    // Check if it's a network error
    if (error.message === 'No internet connection') {
      message = "No internet connection";
      isNetworkError = true;
    } else if (error.response) {
      // Backend sent error
      status = error.response.status;
      message =
        error.response.data?.message ||
        error.response.data?.error ||
        "Server error";
    } else if (error.request) {
      // No response from server (network issue or server down)
      const netInfo = await NetInfo.fetch();
      if (!netInfo.isConnected) {
        message = "No internet connection";
        isNetworkError = true;
      } else {
        message = "Server not reachable";
      }
    } else {
      // Axios setup error
      message = error.message;
    }
    console.log("❌ API ERROR:", message , error);
    // Create clean error for UI
    const customError: any = new Error(message);
    customError.status = status;
    customError.isNetworkError = isNetworkError;
    return Promise.reject(customError);
  }
);

export default apiService;