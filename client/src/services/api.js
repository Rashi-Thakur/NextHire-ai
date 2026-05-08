import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const authApi = {
  register: (payload) => api.post("/auth/register", payload),
  login: (payload) => api.post("/auth/login", payload),
  me: () => api.get("/users/me"),
};

export const analysisApi = {
  extractResume: (formData) =>
    api.post("/analysis/extract", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  analyze: (payload) => api.post("/analysis", payload),
  history: () => api.get("/analysis"),
  byId: (id) => api.get(`/analysis/${id}`),
};

export default api;
