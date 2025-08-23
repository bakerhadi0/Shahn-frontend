import { Navigate } from "react-router-dom";

const TOKEN_KEY = "token";

export function setToken(t) {
  localStorage.setItem(TOKEN_KEY, t);
}
export function getToken() {
  return localStorage.getItem(TOKEN_KEY) || "";
}
export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}
export function isAuthed() {
  return !!getToken();
}
export function RequireAuth({ children }) {
  return isAuthed() ? children : <Navigate to="/login" replace />;
}