export const API_BASE = import.meta.env.VITE_API_URL || "https://shahn-server.onrender.com";

export const j = async (path, opts = {}) => {
  const token = localStorage.getItem("token");
  const headers = { "Content-Type": "application/json", ...(opts.headers || {}) };
  if (token) headers.Authorization = `Bearer ${token}`;

  const body =
    opts.body === undefined
      ? undefined
      : typeof opts.body === "string"
      ? opts.body
      : JSON.stringify(opts.body);

  const res = await fetch(`${API_BASE}${path}`, { method: opts.method || "GET", headers, body });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || String(res.status));
  }
  const ct = res.headers.get("content-type") || "";
  return ct.includes("application/json") ? res.json() : res.text();
};
