import axios from "axios"

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "https://shahn-server.onrender.com"
})

http.interceptors.request.use(cfg => {
  const t = localStorage.getItem("token")
  if (t) cfg.headers.Authorization = `Bearer ${t}`
  return cfg
})

http.interceptors.response.use(
  r => r,
  e => {
    if (e.response && e.response.status === 401) {
      localStorage.removeItem("token")
      location.href = "/login"
    }
    throw e
  }
)

export { http }
