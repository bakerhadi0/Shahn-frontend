export const TOKEN_KEYS = ['token','access_token','accessToken'];

export function getToken(){
  for(const k of TOKEN_KEYS){ const v = localStorage.getItem(k); if(v) return v; }
  return null;
}
export function setToken(t){
  TOKEN_KEYS.forEach(k=>localStorage.removeItem(k));
  localStorage.setItem('token', t);
}
export function clearToken(){ TOKEN_KEYS.forEach(k=>localStorage.removeItem(k)); }
