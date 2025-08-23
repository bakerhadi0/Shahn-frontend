import React, { useEffect, useState } from "react"
import { http } from "../http"

export default function Visits() {
  const [rows,setRows]=useState([])
  const [f,setF]=useState({ customer:"", date:"", notes:"" })
  const [editId,setEditId]=useState(null)

  async function load(){ const {data}=await http.get("/api/visits"); setRows(Array.isArray(data)?data:(data.items||[])) }
  useEffect(()=>{ load() },[])

  async function add(){ await http.post("/api/visits", f); setF({ customer:"", date:"", notes:"" }); await load() }
  async function save(id){ await http.put(`/api/visits/${id}`, f); setEditId(null); setF({ customer:"", date:"", notes:"" }); await load() }
  async function del(id){ if(!confirm("حذف؟")) return; await http.delete(`/api/visits/${id}`); await load() }

  return (
    <div style={{maxWidth:900, margin:"24px auto"}}>
      <h1>الزيارات</h1>

      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr) auto",gap:8,marginBottom:12}}>
        <input placeholder="العميل" value={f.customer} onChange={e=>setF({...f,customer:e.target.value})}/>
        <input type="date" value={f.date} onChange={e=>setF({...f,date:e.target.value})}/>
        <input placeholder="ملاحظات" value={f.notes} onChange={e=>setF({...f,notes:e.target.value})}/>
        {editId ? <button onClick={()=>save(editId)}>حفظ</button> : <button onClick={add}>إضافة</button>}
      </div>

      <table width="100%" cellPadding="8" style={{borderCollapse:"collapse"}}>
        <thead><tr><th>العميل</th><th>التاريخ</th><th>ملاحظات</th><th>إجراءات</th></tr></thead>
        <tbody>
          {rows.map(r=>(
            <tr key={r._id}>
              <td>{r.customer}</td><td>{(r.date||"").slice(0,10)}</td><td>{r.notes}</td>
              <td>
                <button onClick={()=>{ setEditId(r._id); setF({ customer:r.customer||"", date:(r.date||"").slice(0,10), notes:r.notes||"" }) }}>تعديل</button>
                <button onClick={()=>del(r._id)} style={{marginInlineStart:8}}>حذف</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}