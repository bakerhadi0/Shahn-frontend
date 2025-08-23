import React from "react"
import { Link, useLocation } from "react-router-dom"
import { clearToken } from "../auth"

export default function Nav() {
  const { pathname } = useLocation()
  const A = ({ to, children }) => (
    <Link to={to} style={{marginInline:10, fontWeight: pathname===to?700:400}}>
      {children}
    </Link>
  )
  return (
    <div style={{display:"flex",alignItems:"center",gap:8,padding:"12px 16px",borderBottom:"1px solid #eee"}}>
      <strong>Shahn</strong>
      <div style={{flex:1}} />
      <A to="/customers">العملاء</A>
      <A to="/products">المنتجات</A>
      <A to="/sales">المبيعات</A>
      <button onClick={()=>{ clearToken(); window.location.href="/login" }}>خروج</button>
    </div>
  )
}