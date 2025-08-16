import React from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Customers from "./pages/Customers.jsx";
import { isAuthed, clearToken } from "./auth";

function RequireAuth({ children }) {
  return isAuthed() ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <header style={{ padding:"12px 16px", borderBottom:"1px solid #ddd" }}>
        <Link to="/" style={{ marginInlineEnd:12 }}>الرئيسية</Link>
        <Link to="/customers">العملاء</Link>
        <button onClick={()=>{ clearToken(); location.href="/login"; }} style={{ float:"inline-end" }}>
          خروج
        </button>
      </header>
      <main style={{ padding:16 }}>
        <Routes>
          <Route path="/" element={<div>الرئيسية</div>} />
          <Route path="/login" element={<Login />} />
          <Route path="/customers" element={<RequireAuth><Customers /></RequireAuth>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
