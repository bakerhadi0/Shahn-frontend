export const setToken = t => localStorage.setItem("token", t)
export const getToken = () => localStorage.getItem("token")
export const clearToken = () => { localStorage.removeItem("token"); localStorage.removeItem("user") }
export const isAuthed = () => !!getToken()
export const setUser = u => localStorage.setItem("user", JSON.stringify(u || {}))
export const getUser = () => { try { return JSON.parse(localStorage.getItem("user") || "{}") } catch { return {} } }
export const getRole = () => (getUser().role || "user")
export const hasRole = (...roles) => roles.includes(getRole())