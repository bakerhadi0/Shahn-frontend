import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { j } from "../http";
import { setToken } from "../auth";

export default function Login() {
  const [email, setEmail] = useState("abouhadi2@gmail.com");
  const [password, setPassword] = useState("Baker@2030");
  const [err, setErr] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault(); setErr("");
    try {
      const res = await j("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password })
      });
      setToken(res.token);
      nav("/customers");
    } catch {
      setErr("فشل تسجيل الدخول");
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "40px auto" }}>
      <h2>تسجيل الدخول</h2>
      {err && <div style={{ color: "crimson" }}>{err}</div>}
      <form onSubmit={submit}>
        <input style={{width:"100%",margin:"8px 0"}} placeholder="الإيميل"
          value={email} onChange={e=>setEmail(e.target.value)} />
        <input style={{width:"100%",margin:"8px 0"}} placeholder="الرمز" type="password"
          value={password} onChange={e=>setPassword(e.target.value)} />
        <button>دخول</button>
      </form>
    </div>
  );
}
