import React from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Customers from './pages/Customers.jsx';
import Visits from './pages/Visits.jsx';
import { isLogged, logout } from './auth';

function Nav(){
  return (
    <header style={{padding:'12px 16px', borderBottom:'1px solid #ddd', display:'flex', gap:12, direction:'rtl'}}>
      <Link to="/customers">العملاء</Link>
      <Link to="/visits">الزيارات</Link>
      <div style={{marginInlineStart:'auto'}}>
        {isLogged() ? <button onClick={()=>{logout(); location.href='/login';}}>خروج</button> : <Link to="/login">دخول</Link>}
      </div>
    </header>
  );
}

function Guard({children}){ return isLogged()? children : <Navigate to="/login" replace/>; }

export default function App(){
  return (
    <BrowserRouter>
      <Nav/>
      <div style={{padding:16}}>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/customers" element={<Guard><Customers/></Guard>}/>
          <Route path="/visits" element={<Guard><Visits/></Guard>}/>
          <Route path="*" element={<Navigate to="/visits" replace/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
