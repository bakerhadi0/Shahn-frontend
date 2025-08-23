import React, { useEffect, useState } from "react"
import { http } from "../http"
import { clearToken } from "../auth"

export default function Customers() {
  const [rows, setRows] = useState([])
  const [f, setF] = useState({ name:"", company:"", phone:"", location:"", notes:"" })

  async function load() {
    const { data } = await http.get("/api/customers")
    setRows(Array.isArray(data) ? data : (data.items || []))
  }

  async function add() {
    if (!f.name) return
    await http.post("/api/customers", f)
    setF({ name:"", company:"", phone:"", location:"", notes:"" })
    await load()
  }

  useEffect(() => { load() }, [])

  return (
    <div style={{ maxWidth: 900, margin: "24px auto" }}>
      <h1>العملاء</h1>
      <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr) auto",gap:8,marginBottom:12}}>
        <input placeholder="الاسم" value={f.name} onChange={e=>setF({...f,name:e.target.value})} />
        <input placeholder="الشركة" value={f.company} onChange={e=>setF({...f,company:e.target.value})} />
        <input placeholder="الهاتف" value={f.phone} onChange={e=>setF({...f,phone:e.target.value})} />
        <input placeholder="الموقع" value={f.location} onChange={e=>setF({...f,location:e.target.value})} />
        <input placeholder="ملاحظات" value={f.notes} onChange={e=>setF({...f,notes:e.target.value})} />
        <button onClick={add}>إضافة</button>
      </div>

      <table width="100%" cellPadding="8" style={{borderCollapse:"collapse"}}>
        <thead>
          <tr><th>الاسم</th><th>الشركة</th><th>الهاتف</th><th>الموقع</th><th>ملاحظات</th></tr>
        </thead>
        <tbody>
          {rows.map((r,i)=>(
            <tr key={i}>
              <td>{r.name}</td><td>{r.company}</td><td>{r.phone}</td><td>{r.location}</td><td>{r.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{marginTop:16}}>
        <button onClick={()=>{ clearToken(); window.location.href="/login" }}>تسجيل الخروج</button>
      </div>
    </div>
  )
}