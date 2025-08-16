import axios from "axios";
const API_BASE = import.meta.env.VITE_API_BASE || "https://shahn-server.onrender.com";
export const j = axios.create({ baseURL: API_BASE });
j.interceptors.request.use(cfg => {
  const t = localStorage.getItem("token");
  if(t) cfg.headers.Authorization = `Bearer ${t}`;
  return cfg;
});
