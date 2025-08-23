import React, { useEffect, useState } from "react"
import { http } from "../http"
import { clearToken } from "../auth"

export default function Sales(){
  const [rows,setRows] = useState([])
  const [products,setProducts] = useState([])
  const [f,setF] = useState({ productId:"", qty:1, price:"" })

  async function load(){
    const [s,p] = await Promise.all([ http.get("/api/sales"), http.get("/api/products") ])
    setRows(Array.isArray(s.data)?s.data:(s.data.items||[]))
    setProducts(Array.isArray(p.data)?p.data:(p.data.items||[]))
  }

  async function add(){
    if(!f.productId) return
    await http.post("/api/sales",{ productId:f.productId, qty:+f.qty||1, price:f.price===""?undefined:+f.price })
    setF({ productId:"", qty:1, price:"" })
    await load()
  }

  async function remove(id){
    await http.delete(`/api/sales/${id}`)
    await load()
  }

  useEffect(()=>{ load() }, [])
  const total = rows.reduce((a,r)=>a+(r.total||0),0)

  return (
    <div style={{maxWidth:1100, margin:"24px auto"}}>
      <h1>المبيعات</h1>

      <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 120px",gap:8,marginBottom:12}}>
        <select value={f.productId} onChange={e=>setF({...f,productId:e.target.value})}>
          <option value="">اختر المنتج</option>
          {products.map(p=><option key={p._id} value={p._id}>{p.name} — {p.price}</option>)}
        </select>
        <input placeholder="الكمية" value={f.qty} onChange={e=>setF({...f,qty:e.target.value})} />
        <input placeholder="السعر (اختياري)" value={f.price} onChange={e=>setF({...f,price:e.target.value})} />
        <button onClick={add}>إضافة</button>
      </div>

      <table width="100%" cellPadding="8" style={{borderCollapse:"collapse"}}>
        <thead>
          <tr><th>المنتج</th><th>الكمية</th><th>السعر</th><th>الإجمالي</th><th>إجراءات</th></tr>
        </thead>
        <tbody>
          {rows.map(r=>(
            <tr key={r._id}>
              <td>{r.product?.name||"-"}</td>
              <td>{r.qty}</td>
              <td>{r.price}</td>
              <td>{r.total}</td>
              <td><button onClick={()=>remove(r._id)}>حذف</button></td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr><td colSpan="3" align="right">الإجمالي</td><td>{total}</td><td/></tr>
        </tfoot>
      </table>

      <div style={{marginTop:16}}>
        <a href="/customers" style={{marginRight:12}}>العملاء</a>
        <a href="/products" style={{marginRight:12}}>المنتجات</a>
        <a href="/sales" style={{marginRight:12}}>المبيعات</a>
        <button onClick={()=>{ clearToken(); window.location.href="/login" }}>تسجيل الخروج</button>
      </div>
    </div>
  )
}