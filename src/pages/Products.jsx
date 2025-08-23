import React, { useEffect, useState } from "react"
import { http } from "../http"
import { clearToken } from "../auth"

export default function Products() {
  const [rows, setRows] = useState([])
  const [f, setF] = useState({ name:"", sku:"", price:"", stock:"", notes:"" })

  async function load() {
    const { data } = await http.get("/api/products")
    setRows(Array.isArray(data) ? data : (data.items || []))
  }

  async function add() {
    if (!f.name) return
    await http.post("/api/products", { ...f, price:+f.price||0, stock:+f.stock||0 })
    setF({ name:"", sku:"", price:"", stock:"", notes:"" })
    await load()
  }

  async function remove(id) {
    await http.delete(`/api/products/${id}`)
    await load()
  }

  async function edit(r) {
    const name = prompt("الاسم", r.name) ?? r.name
    const sku = prompt("SKU", r.sku) ?? r.sku
    const price = +(prompt("السعر", r.price) ?? r.price)
    const stock = +(prompt("المخزون", r.stock) ?? r.stock)
    const notes = prompt("ملاحظات", r.notes || "") ?? r.notes
    await http.put(`/api/products/${r._id}`, { name, sku, price, stock, notes })
    await load()
  }

  useEffect(()=>{ load() }, [])

  return (
    <div style={{ maxWidth: 1100, margin: "24px auto" }}>
      <h1>المنتجات</h1>

      <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr) 120px",gap:8,marginBottom:12}}>
        <input placeholder="الاسم" value={f.name} onChange={e=>setF({...f,name:e.target.value})} />
        <input placeholder="SKU" value={f.sku} onChange={e=>setF({...f,sku:e.target.value})} />
        <input placeholder="السعر" value={f.price} onChange={e=>setF({...f,price:e.target.value})} />
        <input placeholder="المخزون" value={f.stock} onChange={e=>setF({...f,stock:e.target.value})} />
        <input placeholder="ملاحظات" value={f.notes} onChange={e=>setF({...f,notes:e.target.value})} />
        <button onClick={add}>إضافة</button>
      </div>

      <table width="100%" cellPadding="8" style={{borderCollapse:"collapse"}}>
        <thead>
          <tr><th>الاسم</th><th>SKU</th><th>السعر</th><th>المخزون</th><th>ملاحظات</th><th>إجراءات</th></tr>
        </thead>
        <tbody>
          {rows.map(r=>(
            <tr key={r._id}>
              <td>{r.name}</td><td>{r.sku}</td><td>{r.price}</td><td>{r.stock}</td><td>{r.notes}</td>
              <td>
                <button onClick={()=>edit(r)}>تعديل</button>{" "}
                <button onClick={()=>remove(r._id)}>حذف</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{marginTop:16}}>
        <a href="/customers" style={{marginRight:12}}>العملاء</a>
        <a href="/products" style={{marginRight:12}}>المنتجات</a>
        <button onClick={()=>{ clearToken(); window.location.href="/login" }}>تسجيل الخروج</button>
      </div>
    </div>
  )
}