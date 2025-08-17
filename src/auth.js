const KEY = "auth_token";

export function setToken(t) { localStorage.setItem(KEY, t || ""); }
export function getToken() { return localStorage.getItem(KEY) || ""; }
export function clearToken() { localStorage.removeItem(KEY); }
export function isAuthed() { return !!getToken(); }

export default { setToken, getToken, clearToken, isAuthed };
