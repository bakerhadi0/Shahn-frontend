const API_BASE = import.meta.env.VITE_API_BASE || 'https://shahn-server.onrender.com';
export const endpoints = {
  base: API_BASE,
  health: `${API_BASE}/api/health`,
  login: `${API_BASE}/api/auth/login`,
  customers: `${API_BASE}/api/customers`,
  visits: `${API_BASE}/api/visits`,
  visitsSummary: `${API_BASE}/api/visits/summary`,
  products: `${API_BASE}/api/products`,
  sales: `${API_BASE}/api/sales`,
};
export default endpoints;
