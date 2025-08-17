import axios from "axios";

const BASE = (import.meta.env && import.meta.env.VITE_API_URL)
  ? `${import.meta.env.VITE_API_URL}`
  : "https://shahn-server.onrender.com/api";

const http = axios.create({
  baseURL: BASE,
  headers: { "Content-Type": "application/json" },
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default http;
export { BASE };
