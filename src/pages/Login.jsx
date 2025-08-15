import React, { useState } from "react";
import http from "../http";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const { data } = await http.post("/api/auth/login", { email, password });
      const token = data?.token || data?.access_token;
      if (!token) throw new Error("no token");
      localStorage.setItem("token", token);
      window.location.href = "/customers";
    } catch (_) {
      setErr("فشل تسجيل الدخول");
    }
  };

  return (
    <form onSubmit={submit} style={{ maxWidth: 360, margin: "40px auto" }}>
      {err && <div style={{ color: "crimson", marginBottom: 8 }}>{err}</div>}
      <label>الايميل</label>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <label>الرمز</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">دخول</button>
    </form>
  );
}
