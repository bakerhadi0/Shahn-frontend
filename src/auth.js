import { Navigate } from "react-router-dom";

export function setToken(t){ localStorage.setItem("token", t) }
export function getToken(){ return localStorage.getItem("token") || "" }
export function clearToken(){ localStorage.removeItem("token") }
export function isAuthed(){ return !!getToken() }

function payload(){
  const t = getToken();
  if(!t) return null;
  const p = t.split(".")[1];
  try{ return JSON.parse(atob(p)); }catch{ return null }
}

export function getRole(){ return payload()?.role || "user" }
export function isAdmin(){ return getRole() === "admin" }

export function RequireAuth({ children }){
  return isAuthed() ? children : <Navigate to="/login" replace />
}

export function RequireAdmin({ children }){
  return isAuthed() && isAdmin() ? children : <Navigate to="/" replace />
}