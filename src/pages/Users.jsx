import React, { useEffect, useState } from "react";
import { getToken } from "../auth";

const BASE = import.meta.env.VITE_API_BASE || "";

async function req(path, opts={}){
  const token = getToken();
  const headers = { "Content-Type":"application/json", ...(opts.headers||{}) };
  if(token) headers.Authorization = `Bearer ${token}`;
  const r = await fetch(`${BASE}/api${path}`, { ...opts, headers });
  if(!r.ok) throw new Error(await r.text());
  return r.status === 204 ? null : r.json();
}

export default function Users(){
  const [rows,setRows] = useState([]);
  const [form,setForm] = useState({ name:"", email:"", password:"", role:"user" });
  const [editing,setEditing] = useState(null);

  async function load(){ setRows(await req("/users")); }
  useEffect(()=>{ load(); },[]);

  function onChange(e){ setForm(v=>({ ...v, [e.target.name]: e.target.value })); }

  async function add(){
    await req("/users",{ method:"POST", body:JSON.stringify(form) });
    setForm({ name:"", email:"", password:"", role:"user" });
    await load();
  }

  async function save(id){
    await req(`/users/${id}`,{ method:"PUT", body:JSON.stringify({ name:form.name, email:form.email, role:form.role }) });
    if(form.password) await req(`/users/${id}/password`,{ method:"PATCH", body:JSON.stringify({ password:form.password }) });
    setEditing(null);
    setForm({ name:"", email:"", password:"", role:"user" });
    await load();
  }

  async function remove(id){
    await req(`/users/${id}`,{ method:"DELETE" });
    await load();
  }

  function startEdit(r){
    setEditing(r._id);
    setForm({ name:r.name||"", email:r.email, password:"", role:r.role||"user" });
  }

  return (
    <div style={{padding:24}}>
      <h2>المستخدمون</h2>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 160px 120px",gap:8,margin:"12px 0"}}>
        <input placeholder="الاسم" name="name" value={form.name} onChange={onChange}/>
        <input placeholder="البريد" name="email" value={form.email} onChange={onChange}/>
        <input placeholder="كلمة المرور" name="password" value={form.password} onChange={onChange}/>
        <select name="role" value={form.role} onChange={onChange}>
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select>
        {editing
          ? <button onClick={()=>save(editing)}>حفظ</button>
          : <button onClick={add}>إضافة</button>}
      </div>

      <table width="100%" cellPadding="8" style={{borderCollapse:"collapse"}}>
        <thead>
          <tr style={{textAlign:"right"}}>
            <th>الاسم</th>
            <th>البريد</th>
            <th>الدور</th>
            <th>أُنشئ في</th>
            <th>إجراءات</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r=>(
            <tr key={r._id} style={{borderTop:"1px solid #eee"}}>
              <td>{r.name||"-"}</td>
              <td>{r.email}</td>
              <td>{r.role||"user"}</td>
              <td>{new Date(r.createdAt).toLocaleDateString()}</td>
              <td style={{display:"flex",gap:8}}>
                <button onClick={()=>startEdit(r)}>تعديل</button>
                <button onClick={()=>remove(r._id)}>حذف</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}