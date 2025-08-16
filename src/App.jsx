import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Customers from './pages/Customers.jsx';

export default function App(){
  return (
    <BrowserRouter>
      <header style={{padding:'12px 16px',borderBottom:'1px solid #ddd'}}>
        <Link to="/">الرئيسية</Link> | <Link to="/customers">العملاء</Link>
      </header>
      <Routes>
        <Route path="/customers" element={<Customers/>} />
        <Route path="*" element={<div style={{padding:16}}>الرئيسية</div>} />
      </Routes>
    </BrowserRouter>
  );
}
