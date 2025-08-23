import React, { useEffect, useState } from "react"
import { http } from "../http"

export default function Products() {
  const [rows, setRows] = useState([])
  const [f, setF] = useState({ name:"", sku:"", price:0, stock:0, notes:"" })
  const [editId, setEditId] = useState(null)

  async function load(){ const {data}=await http.get("/api/products"); setRows(Array.isArray(data)?data:(data.items||[])) }
  useEffect(()=>{ load() },[])

  async function add(){
    if(!f.name) return
    await http.post("/api/products", { ...f, price:+f.price||0, stock:+f.stock||0 })
    setF({ name:"", sku:"", price:0, stock:0, notes:"" })
    await load()
  }
  async function save(id){
    await http.put(`/api/products/${id}`, { ...f, price:+f.price||0, stock:+f.stock||0 })
    setEditId(null); setF({ name:"", sku:"", price:0, stock:0, notes:"" }); await load()
  }
  async function del(id){ if(!confirm("حذف؟")) return; await http.delete(`/api/products/${id}`); await load() }

  return (
    <div style={{maxWidth:1000, margin:"24px auto"}}>
      <h1>المنتجات</h1>

      <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr) auto",gap:8,marginBottom:12}}>
        <input placeholder="الاسم" value={f.name} onChange={e=>setF({...f,name:e.target.value})}/>
        <input placeholder="SKU" value={f.sku} onChange={e=>setF({...f,sku:e.target.value})}/>
        <input placeholder="السعر" type="number" value={f.price} onChange={e=>setF({...f,price:e.target.value})}/>
        <input placeholder="المخزون" type="number" value={f.stock} onChange={e=>setF({...f,stock:e.target.value})}/>
        <input placeholder="ملاحظات" value={f.notes} onChange={e=>setF({...f,notes:e.target.value})}/>
        {editId ? <button onClick={()=>save(editId)}>حفظ</button> : <button onClick={add}>إضافة</button>}
      </div>

      <table width="100%" cellPadding="8" style={{borderCollapse:"collapse"}}>
        <thead><tr><th>الاسم</th><th>SKU</th><th>السعر</th><th>المخزون</th><th>ملاحظات</th><th>إجراءات</th></tr></thead>
        <tbody>
          {rows.map(r=>(
            <tr key={r._id}>
              <td>{r.name}</td><td>{r.sku}</td><td>{r.price}</td><td>{r.stock}</td><td>{r.notes}</td>
              <td>
                <button onClick={()=>{ setEditId(r._id); setF({ name:r.name, sku:r.sku, price:r.price||0, stock:r.stock||0, notes:r.notes||"" }) }}>تعديل</button>
                <button onClick={()=>del(r._id)} style={{marginInlineStart:8}}>حذف</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}