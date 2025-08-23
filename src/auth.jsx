// src/auth.jsx
import { Navigate } from "react-router-dom";

export function setToken(token) {
  localStorage.setItem("token", token);
}

export function getToken() {
  return localStorage.getItem("token") || "";
}

export function clearToken() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

export function isAuthed() {
  return !!getToken();
}

export function setUser(user) {
  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
  } else {
    localStorage.removeItem("user");
  }
}

export function getUser() {
  const raw = localStorage.getItem("user");
  try {
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function RequireAuth({ children }) {
  return isAuthed() ? children : <Navigate to="/login" replace />;
}