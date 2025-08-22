import axios from "axios";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE
});

http.interceptors.request.use(cfg => {
  const t = localStorage.getItem("token");
  if (t) cfg.headers.Authorization = `Bearer ${t}`;
  return cfg;
});

export default http;