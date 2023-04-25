import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

api.defaults.timeout = 10000000;

api.interceptors.request.use(
  async (config) => {
    const token =
      typeof window !== "undefined" && localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.defaults.headers.post["Content-Type"] = "application/json";

export default api;
