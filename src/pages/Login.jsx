import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import http from "../http";
import { setToken } from "../auth";

export default function Login(){
  const nav = useNavigate();
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [err,setErr] = useState("");

  async function submit(e){
    e.preventDefault();
    setErr("");
    try{
      const { data } = await http.post("/api/auth/login",{ email, password });
      const t = data.token || data.access_token || "";
      if(!t) throw new Error("no token");
      setToken(t);
      nav("/customers");
    }catch(e){ setErr("فشل تسجيل الدخول"); }
  }

  return (
    <div style={{maxWidth:460,margin:"48px auto"}}>
      <h2>تسجيل الدخول</h2>
      {err && <div style={{color:"crimson"}}>{err}</div>}
      <form onSubmit={submit}>
        <input placeholder="الإيميل" value={email} onChange={e=>setEmail(e.target.value)} style={{display:"block",width:"100%",margin:"8px 0"}}/>
        <input placeholder="الرمز" type="password" value={password} onChange={e=>setPassword(e.target.value)} style={{display:"block",width:"100%",margin:"8px 0"}}/>
        <button type="submit">دخول</button>
      </form>
    </div>
  );
}
