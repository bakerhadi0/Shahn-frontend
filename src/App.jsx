import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Customers from "./pages/Customers.jsx";
import Login from "./pages/Login.jsx";
import { isAuthed } from "./auth.js";

function RequireAuth({ children }) {
  return isAuthed() ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<RequireAuth><Customers /></RequireAuth>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}