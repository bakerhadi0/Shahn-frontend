import { API_BASE } from "./http";

export async function login(email, password) {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Login failed");
  const token = data.token || data.access_token || (data.data && data.data.token);
  if (!token) throw new Error("No token");
  localStorage.setItem("token", token);
  return token;
}

export function logout(){ localStorage.removeItem("token"); }
export function getToken(){ return localStorage.getItem("token"); }
