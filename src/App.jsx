import React from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login.jsx"
import Customers from "./pages/Customers.jsx"
import Products from "./pages/Products.jsx"
import Sales from "./pages/Sales.jsx"
import { isAuthed } from "./auth"

function RequireAuth({ children }) {
  return isAuthed() ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/customers" element={<RequireAuth><Customers /></RequireAuth>} />
        <Route path="/products" element={<RequireAuth><Products /></RequireAuth>} />
        <Route path="/sales" element={<RequireAuth><Sales /></RequireAuth>} />
        <Route path="*" element={<Navigate to={isAuthed() ? "/customers" : "/login"} replace />} />
      </Routes>
    </BrowserRouter>
  )
}