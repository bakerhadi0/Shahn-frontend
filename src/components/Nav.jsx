import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { clearToken, isAdmin } from "../auth";

export default function Nav(){
  const nav = useNavigate();
  function logout(){
    clearToken();
    nav("/login", { replace:true });
  }
  return (
    <nav style={{display:"flex",gap:16,justifyContent:"flex-end",padding:"12px 16px",borderBottom:"1px solid #eee"}}>
      <Link to="/sales">المبيعات</Link>
      <Link to="/products">المنتجات</Link>
      <Link to="/customers">العملاء</Link>
      <Link to="/visits">الزيارات</Link>
      <Link to="/reports">التقارير</Link>
      {isAdmin() ? <Link to="/users">المستخدمون</Link> : null}
      <button onClick={logout}>خروج</button>
    </nav>
  );
}