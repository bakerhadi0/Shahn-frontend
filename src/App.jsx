import React from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login.jsx"
import Customers from "./pages/Customers.jsx"
import Products from "./pages/Products.jsx"
import Sales from "./pages/Sales.jsx"
import Reports from "./pages/Reports.jsx"
import { isAuthed } from "./auth"
import Nav from "./components/Nav.jsx"

function RequireAuth({ children }) {
  return isAuthed() ? children : <Navigate to="/login" replace />
}

export default function App() {
  const home = isAuthed() ? "/customers" : "/login"
  return (
    <BrowserRouter>
      {isAuthed() && <Nav />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/customers" element={<RequireAuth><Customers /></RequireAuth>} />
        <Route path="/products"  element={<RequireAuth><Products /></RequireAuth>} />
        <Route path="/sales"     element={<RequireAuth><Sales /></RequireAuth>} />
        <Route path="/reports"   element={<RequireAuth><Reports /></RequireAuth>} />
        <Route path="*" element={<Navigate to={home} replace />} />
      </Routes>
    </BrowserRouter>
  )
}