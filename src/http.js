import axios from "axios";
import { getToken } from "./auth";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://shahn-server.onrender.com",
  headers: { "Content-Type": "application/json" },
});

http.interceptors.request.use((cfg) => {
  const t = getToken();
  if (t) cfg.headers.Authorization = `Bearer ${t}`;
  return cfg;
});

export default http;
