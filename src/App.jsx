import React from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login.jsx"
import Customers from "./pages/Customers.jsx"
import Products from "./pages/Products.jsx"
import Sales from "./pages/Sales.jsx"
import Reports from "./pages/Reports.jsx"
import Users from "./pages/Users.jsx"
import Nav from "./components/Nav.jsx"
import { isAuthed } from "./auth"

function RequireAuth({ children }) {
  return isAuthed() ? children : <Navigate to="/login" replace />
}

function Shell({ children }) {
  return (
    <div>
      <Nav />
      {children}
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/customers" element={<RequireAuth><Shell><Customers/></Shell></RequireAuth>} />
        <Route path="/products" element={<RequireAuth><Shell><Products/></Shell></RequireAuth>} />
        <Route path="/sales" element={<RequireAuth><Shell><Sales/></Shell></RequireAuth>} />
        <Route path="/reports" element={<RequireAuth><Shell><Reports/></Shell></RequireAuth>} />
        <Route path="/users" element={<RequireAuth><Shell><Users/></Shell></RequireAuth>} />
        <Route path="*" element={<Navigate to={isAuthed() ? "/customers" : "/login"} replace />} />
      </Routes>
    </BrowserRouter>
  )
}