import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Customers from "./pages/Customers";
import { isAuthed } from "./auth";

function RequireAuth({ children }){
  return isAuthed() ? children : <Navigate to="/login" replace />;
}

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/customers" element={<RequireAuth><Customers/></RequireAuth>} />
        <Route path="*" element={<Navigate to="/customers" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
