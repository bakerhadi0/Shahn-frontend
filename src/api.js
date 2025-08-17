const BASE = import.meta.env.VITE_API_URL || "https://shahn-server.onrender.com";
export default {
  login: `${BASE}/api/auth/login`,
  customers: `${BASE}/api/customers`,
  visits: `${BASE}/api/visits`,
  health: `${BASE}/api/health`,
};
