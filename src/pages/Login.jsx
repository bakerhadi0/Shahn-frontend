import React,{useState} from "react";
import {useNavigate} from "react-router-dom";
import http from "../http";
import {setToken} from "../auth";
export default function Login(){
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [err,setErr]=useState("");
  const nav=useNavigate();
  const submit=async e=>{
    e.preventDefault();setErr("");
    try{
      const {data}=await http.post("/api/auth/login",{email,password});
      setToken(data.token||data.access_token);nav("/customers");
    }catch{setErr("فشل تسجيل الدخول");}
  };
  return(<div><h1>تسجيل الدخول</h1>{err&&<div style={{color:"red"}}>{err}</div>}
    <form onSubmit={submit}>
      <input placeholder="الإيميل" value={email} onChange={e=>setEmail(e.target.value)}/>
      <input placeholder="الرمز" type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
      <button>دخول</button>
    </form></div>);
}
