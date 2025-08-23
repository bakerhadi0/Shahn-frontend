import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Customers from "./pages/Customers.jsx";
import Products from "./pages/Products.jsx";
import Sales from "./pages/Sales.jsx";
import Visits from "./pages/Visits.jsx";
import Reports from "./pages/Reports.jsx";
import Login from "./pages/Login.jsx";
import Users from "./pages/Users.jsx";
import Nav from "./components/Nav.jsx";
import { isAuthed, RequireAuth, RequireAdmin } from "./auth.jsx";

export default function App(){
  return (
    <>
      {isAuthed() ? <Nav/> : null}
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<RequireAuth><Customers/></RequireAuth>} />
        <Route path="/customers" element={<RequireAuth><Customers/></RequireAuth>} />
        <Route path="/products" element={<RequireAuth><Products/></RequireAuth>} />
        <Route path="/sales" element={<RequireAuth><Sales/></RequireAuth>} />
        <Route path="/visits" element={<RequireAuth><Visits/></RequireAuth>} />
        <Route path="/reports" element={<RequireAuth><Reports/></RequireAuth>} />
        <Route path="/users" element={<RequireAdmin><Users/></RequireAdmin>} />
        <Route path="*" element={<Navigate to="/" replace/>} />
      </Routes>
    </>
  );
}