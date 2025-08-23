import React, { useEffect, useState } from "react"
import { http } from "../http"

export default function Users() {
  const [rows, setRows] = useState([])
  const [f, setF] = useState({ email: "", name: "", password: "", role: "user" })
  const [loading, setLoading] = useState(false)

  async function load() {
    const { data } = await http.get("/api/users")
    setRows(Array.isArray(data) ? data : [])
  }

  async function add() {
    if (!f.email || !f.password) return
    setLoading(true)
    try {
      await http.post("/api/users", f)
      setF({ email: "", name: "", password: "", role: "user" })
      await load()
    } finally {
      setLoading(false)
    }
  }

  async function setRole(id, role) {
    await http.put(`/api/users/${id}`, { role })
    await load()
  }

  async function resetPass(id) {
    const p = prompt("كلمة مرور جديدة:")
    if (!p) return
    await http.patch(`/api/users/${id}/password`, { password: p })
    alert("تم تحديث كلمة المرور")
  }

  async function del(id) {
    if (!confirm("حذف المستخدم؟")) return
    await http.delete(`/api/users/${id}`)
    await load()
  }

  useEffect(() => { load() }, [])

  return (
    <div style={{ maxWidth: 900, margin: "24px auto" }}>
      <h1>المستخدمون</h1>

      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr) auto",gap:8,marginBottom:12}}>
        <input placeholder="البريد" value={f.email} onChange={e=>setF({...f,email:e.target.value})}/>
        <input placeholder="الاسم" value={f.name} onChange={e=>setF({...f,name:e.target.value})}/>
        <input placeholder="كلمة المرور" type="password" value={f.password} onChange={e=>setF({...f,password:e.target.value})}/>
        <select value={f.role} onChange={e=>setF({...f,role:e.target.value})}>
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select>
        <button disabled={loading} onClick={add}>إضافة</button>
      </div>

      <table width="100%" cellPadding="8" style={{borderCollapse:"collapse"}}>
        <thead>
          <tr><th>الاسم</th><th>البريد</th><th>الدور</th><th>إجراءات</th></tr>
        </thead>
        <tbody>
          {rows.map(r=>(
            <tr key={r._id}>
              <td>{r.name || "-"}</td>
              <td>{r.email}</td>
              <td>{r.role}</td>
              <td style={{display:"flex",gap:8}}>
                <button onClick={()=>setRole(r._id, r.role==="admin"?"user":"admin")}>
                  {r.role==="admin"?"تحويل لمستخدم":"ترقية لمشرف"}
                </button>
                <button onClick={()=>resetPass(r._id)}>إعادة تعيين كلمة المرور</button>
                <button onClick={()=>del(r._id)}>حذف</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}