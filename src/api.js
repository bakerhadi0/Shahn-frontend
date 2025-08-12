const API_BASE = import.meta.env.VITE_API_BASE || "https://shahn-server.onrender.com";
export const endpoints = {
  products: `${API_BASE}/api/products`,
  sales: `${API_BASE}/api/sales`,
};
