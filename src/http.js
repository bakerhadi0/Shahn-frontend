import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "https://shahn-server.onrender.com";

const http = axios.create({ baseURL: API_BASE });

http.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default http;
export { API_BASE };
