import React, { useEffect, useState } from "react"
import { http } from "../http"

export default function Products() {
  const [rows, setRows] = useState([])
  const [f, setF] = useState({ name:"", sku:"", price:"", stock:"", notes:"" })

  async function load(){ 
    const { data } = await http.get("/api/products")
    setRows(Array.isArray(data) ? data : (data.items||[]))
  }

  async function add(){
    if(!f.name) return
    await http.post("/api/products", { 
      name:f.name, sku:f.sku, price:Number(f.price||0), stock:Number(f.stock||0), notes:f.notes 
    })
    setF({ name:"", sku:"", price:"", stock:"", notes:"" })
    await load()
  }

  async function del(id){
    await http.delete(`/api/products/${id}`)
    await load()
  }

  useEffect(()=>{ load() },[])

  return (
    <div style={{ maxWidth: 900, margin: "24px auto" }}>
      <h1>المنتجات</h1>
      <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr) auto",gap:8,marginBottom:12}}>
        <input placeholder="الاسم" value={f.name} onChange={e=>setF({...f,name:e.target.value})} />
        <input placeholder="SKU" value={f.sku} onChange={e=>setF({...f,sku:e.target.value})} />
        <input placeholder="السعر" value={f.price} onChange={e=>setF({...f,price:e.target.value})} />
        <input placeholder="المخزون" value={f.stock} onChange={e=>setF({...f,stock:e.target.value})} />
        <input placeholder="ملاحظات" value={f.notes} onChange={e=>setF({...f,notes:e.target.value})} />
        <button onClick={add}>إضافة</button>
      </div>

      <table width="100%" cellPadding="8" style={{borderCollapse:"collapse"}}>
        <thead>
          <tr><th>الاسم</th><th>SKU</th><th>السعر</th><th>المخزون</th><th>ملاحظات</th><th></th></tr>
        </thead>
        <tbody>
          {rows.map(r=>(
            <tr key={r._id || r.id}>
              <td>{r.name}</td>
              <td>{r.sku}</td>
              <td>{r.price}</td>
              <td>{r.stock}</td>
              <td>{r.notes}</td>
              <td><button onClick={()=>del(r._id || r.id)}>حذف</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}