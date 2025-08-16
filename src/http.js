import { getToken } from "./auth";
export const API_BASE = import.meta.env.VITE_API_BASE || "https://shahn-server.onrender.com";
export async function j(url, opts = {}) {
  const headers = { "Content-Type": "application/json", ...(opts.headers || {}) };
  const t = getToken(); if (t) headers.Authorization = `Bearer ${t}`;
  const r = await fetch(API_BASE + url, { ...opts, headers });
  const text = await r.text();
  if (!r.ok) throw new Error(text || r.statusText);
  return (r.headers.get("content-type") || "").includes("application/json")
    ? JSON.parse(text) : text;
}
