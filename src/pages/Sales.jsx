import React, { useEffect, useMemo, useState } from "react"
import { http } from "../http"

export default function Sales() {
  const [rows,setRows]=useState([])
  const [f,setF]=useState({ customer:"", item:"", qty:1, price:0, notes:"" })
  const [editId,setEditId]=useState(null)

  async function load(){ const {data}=await http.get("/api/sales"); setRows(Array.isArray(data)?data:(data.items||[])) }
  useEffect(()=>{ load() },[])
  const total = useMemo(()=> rows.reduce((s,r)=>s+((+r.qty||0)*(+r.price||0)),0),[rows])

  async function add(){
    if(!f.item) return
    await http.post("/api/sales", { ...f, qty:+f.qty||0, price:+f.price||0 })
    setF({ customer:"", item:"", qty:1, price:0, notes:"" }); await load()
  }
  async function save(id){
    await http.put(`/api/sales/${id}`, { ...f, qty:+f.qty||0, price:+f.price||0 })
    setEditId(null); setF({ customer:"", item:"", qty:1, price:0, notes:"" }); await load()
  }
  async function del(id){ if(!confirm("حذف؟")) return; await http.delete(`/api/sales/${id}`); await load() }

  return (
    <div style={{maxWidth:1100, margin:"24px auto"}}>
      <h1>المبيعات</h1>

      <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr) auto",gap:8,marginBottom:12}}>
        <input placeholder="العميل" value={f.customer} onChange={e=>setF({...f,customer:e.target.value})}/>
        <input placeholder="المنتج" value={f.item} onChange={e=>setF({...f,item:e.target.value})}/>
        <input placeholder="الكمية" type="number" value={f.qty} onChange={e=>setF({...f,qty:e.target.value})}/>
        <input placeholder="السعر" type="number" value={f.price} onChange={e=>setF({...f,price:e.target.value})}/>
        <input placeholder="الإجمالي" disabled value={(+f.qty||0)*(+f.price||0)}/>
        <input placeholder="ملاحظات" value={f.notes} onChange={e=>setF({...f,notes:e.target.value})}/>
        {editId ? <button onClick={()=>save(editId)}>حفظ</button> : <button onClick={add}>إضافة</button>}
      </div>

      <table width="100%" cellPadding="8" style={{borderCollapse:"collapse"}}>
        <thead><tr><th>العميل</th><th>المنتج</th><th>الكمية</th><th>السعر</th><th>الإجمالي</th><th>ملاحظات</th><th>إجراءات</th></tr></thead>
        <tbody>
          {rows.map(r=>(
            <tr key={r._id}>
              <td>{r.customer}</td><td>{r.item}</td><td>{r.qty}</td><td>{r.price}</td><td>{(+r.qty||0)*(+r.price||0)}</td><td>{r.notes}</td>
              <td>
                <button onClick={()=>{ setEditId(r._id); setF({ customer:r.customer||"", item:r.item||"", qty:r.qty||0, price:r.price||0, notes:r.notes||"" }) }}>تعديل</button>
                <button onClick={()=>del(r._id)} style={{marginInlineStart:8}}>حذف</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{marginTop:12}}>إجمالي المبيعات: {total}</div>
    </div>
  )
}