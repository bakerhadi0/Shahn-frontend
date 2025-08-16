export const API_BASE = import.meta.env.VITE_API_BASE || "https://shahn-server.onrender.com";
export const endpoints = {
  login:     `${API_BASE}/api/auth/login`,
  customers: `${API_BASE}/api/customers`,
  visits:    `${API_BASE}/api/visits`,
};
