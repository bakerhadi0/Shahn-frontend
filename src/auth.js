export function setToken(t){localStorage.setItem("token",t);}
export function clearToken(){localStorage.removeItem("token");}
export function isAuthed(){return !!localStorage.getItem("token");}
