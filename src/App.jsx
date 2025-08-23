import React from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login.jsx"
import Customers from "./pages/Customers.jsx"
import Products from "./pages/Products.jsx"
import Sales from "./pages/Sales.jsx"
import Reports from "./pages/Reports.jsx"
import Users from "./pages/Users.jsx"
import { isAuthed, hasRole } from "./auth"

function RequireAuth({ children }) {
  return isAuthed() ? children : <Navigate to="/login" replace />
}
function RequireRole({ roles, children }) {
  return hasRole(...(roles||[])) ? children : <Navigate to="/customers" replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/customers" element={<RequireAuth><Customers /></RequireAuth>} />
        <Route path="/sales" element={<RequireAuth><Sales /></RequireAuth>} />
        <Route path="/products" element={<RequireAuth><RequireRole roles={["admin"]}><Products /></RequireRole></RequireAuth>} />
        <Route path="/reports" element={<RequireAuth><RequireRole roles={["admin","seller"]}><Reports /></RequireRole></RequireAuth>} />
        <Route path="/users" element={<RequireAuth><RequireRole roles={["admin"]}><Users /></RequireRole></RequireAuth>} />
        <Route path="*" element={<Navigate to={isAuthed() ? "/customers" : "/login"} replace />} />
      </Routes>
    </BrowserRouter>
  )
}