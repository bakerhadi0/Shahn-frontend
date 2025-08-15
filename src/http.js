import axios from 'axios';
const API_BASE = import.meta.env.VITE_API_BASE || 'https://shahn-server.onrender.com';
const http = axios.create({ baseURL: `${API_BASE}/api` });
const t = localStorage.getItem('token');
if (t) http.defaults.headers.common['Authorization'] = `Bearer ${t}`;
export default http;
