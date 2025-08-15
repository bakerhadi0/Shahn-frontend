import axios from "axios";

export const API_BASE =
  import.meta.env.VITE_API_BASE ||
  import.meta.env.VITE_API_URL ||
  "https://shahn-server.onrender.com";

const http = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" }
});

export default http;
