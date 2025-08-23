import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { http } from "../http"
import { setToken, setUser } from "../auth"

export default function Login() {
  const [email, setEmail] = useState("abuohadi2@gmail.com")
  const [password, setPassword] = useState("Baker@2030")
  const [loading, setLoading] = useState(false)
  const nav = useNavigate()

  async function onSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await http.post("/api/auth/login", { email, password })
      const t = data.token || data.access_token || (data.data && data.data.token) || ""
      if (!t) return alert("Token missing")
      setToken(t)
      const me = await http.get("/api/auth/me")
      setUser(me.data || {})
      nav("/customers", { replace: true })
    } catch {
      alert("Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: "64px auto" }}>
      <h2>تسجيل الدخول</h2>
      <form onSubmit={onSubmit}>
        <input placeholder="البريد" value={email} onChange={e=>setEmail(e.target.value)} style={{display:"block",width:"100%",marginBottom:12}} />
        <input placeholder="كلمة المرور" type="password" value={password} onChange={e=>setPassword(e.target.value)} style={{display:"block",width:"100%",marginBottom:12}} />
        <button disabled={loading} type="submit">دخول</button>
      </form>
    </div>
  )
}