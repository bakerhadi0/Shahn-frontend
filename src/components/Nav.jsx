import React from "react"
import { NavLink, useNavigate } from "react-router-dom"

export default function Nav() {
  const navigate = useNavigate()
  const linkStyle = ({ isActive }) => ({
    textDecoration: "none",
    padding: "6px 10px",
    borderRadius: 6,
    border: isActive ? "1px solid #999" : "1px solid transparent"
  })

  function onLogout(e) {
    e.preventDefault()
    localStorage.removeItem("token")
    navigate("/login", { replace: true })
  }

  return (
    <nav style={{ display: "flex", gap: 12, justifyContent: "flex-end", padding: 12, borderBottom: "1px solid #eee" }}>
      <NavLink to="/sales" style={linkStyle}>المبيعات</NavLink>
      <NavLink to="/products" style={linkStyle}>المنتجات</NavLink>
      <NavLink to="/customers" style={linkStyle}>العملاء</NavLink>
      <NavLink to="/reports" style={linkStyle}>التقارير</NavLink>
      <a href="/login" onClick={onLogout} style={{ padding: "6px 10px" }}>خروج</a>