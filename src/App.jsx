import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Products from "./pages/Products";
import Sales from "./pages/Sales";

export default function App() {
  return (
    <BrowserRouter>
      <header style={{padding:"12px 16px", borderBottom:"1px solid #eee", display:"flex", gap:16}}>
        <Link to="/products">المنتجات</Link>
        <Link to="/sales">المبيعات</Link>
      </header>
      <Routes>
        <Route path="/products" element={<Products />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="*" element={<Products />} />
      </Routes>
    </BrowserRouter>
  );
}
