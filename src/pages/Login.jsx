import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import http from "../http";
import { setToken } from "../auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    const { data } = await http.post("/api/auth/login", { email, password });
    const t = data.token || data.access_token || (data.data && data.data.token);
    if (t) {
      setToken(t);
      nav("/", { replace: true });
    } else {
      alert("Login failed");
    }
  }

  return (
    <div style={{ maxWidth: 360, margin: "80px auto", direction: "rtl" }}>
      <h2>تسجيل الدخول</h2>
      <form onSubmit={submit}>
        <input
          type="email"
          placeholder="البريد"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
        />
        <input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
        />
        <button type="submit" style={{ width: "100%", padding: 10 }}>دخول</button>
      </form>
    </div>
  );
}