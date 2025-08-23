import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { clearToken } from "../auth"

export default function Nav() {
  const nav = useNavigate()
  function logout() { clearToken(); nav("/login", { replace: true }) }
  return (
    <nav style={{display:"flex",gap:16,justifyContent:"flex-end",padding:"12px 0"}}>
      <Link to="/sales">المبيعات</Link>
      <Link to="/products">المنتجات</Link>
      <Link to="/customers">العملاء</Link>
      <Link to="/reports">التقارير</Link>
      <button onClick={logout}>خروج</button>
    </nav>
  )
}