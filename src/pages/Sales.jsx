import React, {useEffect, useState} from "react"
import { http } from "../http"

export default function Sales(){
  const [rows,setRows]=useState([])
  const [f,setF]=useState({customer:"",product:"",qty:1,price:0,notes:""})
  const [edit,setEdit]=useState(null)

  async function load(){ const {data}=await http.get("/api/sales"); setRows(Array.isArray(data)?data:(data.items||[])) }
  useEffect(()=>{ load() }, [])

  async function save(){
    if(!f.customer||!f.product) return
    if(edit){ await http.put(`/api/sales/${edit}`,f); setEdit(null) } else { await http.post("/api/sales",f) }
    setF({customer:"",product:"",qty:1,price:0,notes:""}); await load()
  }
  async function del(id){ await http.delete(`/api/sales/${id}`); await load() }
  function startEdit(r){ setEdit(r._id); setF({customer:r.customer,product:r.product,qty:r.qty,price:r.price,notes:r.notes||""}) }
  const total = rows.reduce((s,r)=>s+(Number(r.qty||0)*Number(r.price||0)),0)

  return (
    <div style={{maxWidth:1000,margin:"24px auto"}}>
      <h1>المبيعات</h1>
      <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr) auto",gap:8,marginBottom:12}}>
        <input placeholder="العميل" value={f.customer} onChange={e=>setF({...f,customer:e.target.value})}/>
        <input placeholder="المنتج" value={f.product} onChange={e=>setF({...f,product:e.target.value})}/>
        <input type="number" placeholder="الكمية" value={f.qty} onChange={e=>setF({...f,qty:+e.target.value})}/>
        <input type="number" placeholder="السعر" value={f.price} onChange={e=>setF({...f,price:+e.target.value})}/>
        <input placeholder="ملاحظات" value={f.notes} onChange={e=>setF({...f,notes:e.target.value})}/>
        <button onClick={save}>{edit?"تعديل":"إضافة"}</button>
      </div>
      <table width="100%" cellPadding="8" style={{borderCollapse:"collapse"}}>
        <thead><tr><th>العميل</th><th>المنتج</th><th>الكمية</th><th>السعر</th><th>الإجمالي</th><th>ملاحظات</th><th>إجراءات</th></tr></thead>
        <tbody>
          {rows.map(r=>(
            <tr key={r._id}>
              <td>{r.customer}</td><td>{r.product}</td><td>{r.qty}</td><td>{r.price}</td><td>{(r.qty||0)*(r.price||0)}</td><td>{r.notes}</td>
              <td><button onClick={()=>startEdit(r)}>تعديل</button>&nbsp;<button onClick={()=>del(r._id)}>حذف</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{marginTop:12}}>إجمالي المبيعات: {total}</div>
    </div>
  )
}