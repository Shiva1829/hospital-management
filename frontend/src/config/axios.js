import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export default axiosInstance;
export { API_URL };