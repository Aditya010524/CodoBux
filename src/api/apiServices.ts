import axios from "axios";
import { API_BASE_URL } from "./apiConfig";
import { getToken } from "../utils/TokenStorage";

const apiService = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' }
})
// 🔑 Attach token automatically
apiService.interceptors.request.use(
  async (config) => {
    try {
      const token = await getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      console.log('Token read skipped');
    }
    return config;
  },
  (error) => Promise.reject(error)
);
// handle errors
apiService.interceptors.response.use(
  (response) => response,
  (error) => {
    let message = "Something went wrong";
    let status = null;
    if (error.response) {
      // backend sent error
      status = error.response.status;
      message =
        error.response.data?.message ||
        error.response.data?.error ||
        "Server error";
    } else if (error.request) {
      // no response from server
      message = "Server not reachable";
    } else {
      // axios setup error
      message = error.message;
    }
    console.log("❌ API ERROR:", message);
    // create clean error for UI
    const customError: any = new Error(message);
    customError.status = status;
    return Promise.reject(customError);
  }
);
export default apiService;