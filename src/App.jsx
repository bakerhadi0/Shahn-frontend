import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Products from './pages/Products';
import Sales from './pages/Sales';

export default function App() {
  return (
    <BrowserRouter>
      <header>
        <Link to='/products'>المنتجات</Link>
        <Link to='/sales'>المبيعات</Link>
      </header>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/products' element={<Products />} />
        <Route path='/sales' element={<Sales />} />
      </Routes>
    </BrowserRouter>
  );
}