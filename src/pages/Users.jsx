import React, { useEffect, useState } from "react"
import { http } from "../http"

export default function Users() {
  const [rows, setRows] = useState([])
  const [f, setF] = useState({ email:"", name:"", password:"", role:"user" })

  async function load(){ const {data}=await http.get("/api/users"); setRows(data||[]) }
  useEffect(()=>{ load() },[])

  async function add(){
    if(!f.email) return
    await http.post("/api/users", f)
    setF({ email:"", name:"", password:"", role:"user" })
    load()
  }
  async function save(u){
    await http.put(`/api/users/${u._id}`, { name:u.name, role:u.role })
    load()
  }
  async function resetPass(u){
    const p = prompt("كلمة مرور جديدة:", "123456")
    if(!p) return
    await http.patch(`/api/users/${u._id}/password`, { password:p })
    alert("تم التحديث")
  }
  async function del(u){
    if(!confirm("حذف المستخدم؟")) return
    await http.delete(`/api/users/${u._id}`)
    load()
  }

  return (
    <div style={{ maxWidth: 900, margin:"24px auto" }}>
      <h1>المستخدمون</h1>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr) auto",gap:8,marginBottom:12}}>
        <input placeholder="البريد" value={f.email} onChange={e=>setF({...f,email:e.target.value})}/>
        <input placeholder="الاسم" value={f.name} onChange={e=>setF({...f,name:e.target.value})}/>
        <input placeholder="كلمة المرور" value={f.password} onChange={e=>setF({...f,password:e.target.value})}/>
        <select value={f.role} onChange={e=>setF({...f,role:e.target.value})}>
          <option value="user">User</option>
          <option value="seller">Seller</option>
          <option value="admin">Admin</option>
        </select>
        <button onClick={add}>إضافة</button>
      </div>

      <table width="100%" cellPadding="8" style={{borderCollapse:"collapse"}}>
        <thead><tr><th>البريد</th><th>الاسم</th><th>الدور</th><th>إجراءات</th></tr></thead>
        <tbody>
        {rows.map(u=>(
          <tr key={u._id}>
            <td>{u.email}</td>
            <td><input value={u.name||""} onChange={e=>setRows(rows.map(r=>r._id===u._id?{...r,name:e.target.value}:r))}/></td>
            <td>
              <select value={u.role||"user"} onChange={e=>setRows(rows.map(r=>r._id===u._id?{...r,role:e.target.value}:r))}>
                <option value="user">User</option>
                <option value="seller">Seller</option>
                <option value="admin">Admin</option>
              </select>
            </td>
            <td style={{display:"flex",gap:8}}>
              <button onClick={()=>save(u)}>حفظ</button>
              <button onClick={()=>resetPass(u)}>تغيير كلمة المرور</button>
              <button onClick={()=>del(u)}>حذف</button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}