import React, { useEffect, useState } from "react"
import { http } from "../http"
import { getToken } from "../auth"

export default function Sales() {
  const [rows, setRows] = useState([])
  const [f, setF] = useState({ item:"", qty:0, price:0, customer:"", notes:"" })

  async function load() {
    const { data } = await http.get("/api/sales")
    setRows(Array.isArray(data) ? data : [])
  }

  async function add() {
    await http.post("/api/sales", { ...f, qty:Number(f.qty||0), price:Number(f.price||0) })
    setF({ item:"", qty:0, price:0, customer:"", notes:"" })
    await load()
  }

  async function del(id) {
    await http.delete(`/api/sales/${id}`)
    await load()
  }

  async function downloadInvoice(id) {
    const res = await fetch(`/api/sales/${id}/invoice.pdf`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `invoice-${id}.pdf`
    a.click()
    URL.revokeObjectURL(url)
  }

  useEffect(()=>{ load() }, [])

  return (
    <div style={{ maxWidth: 1000, margin: "24px auto" }}>
      <h1>المبيعات</h1>
      <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr) auto",gap:8,marginBottom:12}}>
        <input placeholder="المنتج" value={f.item} onChange={e=>setF({...f,item:e.target.value})} />
        <input placeholder="الكمية" type="number" value={f.qty} onChange={e=>setF({...f,qty:e.target.value})} />
        <input placeholder="السعر" type="number" step="0.01" value={f.price} onChange={e=>setF({...f,price:e.target.value})} />
        <input placeholder="العميل" value={f.customer} onChange={e=>setF({...f,customer:e.target.value})} />
        <input placeholder="ملاحظات" value={f.notes} onChange={e=>setF({...f,notes:e.target.value})} />
        <button onClick={add}>إضافة</button>
      </div>

      <table width="100%" cellPadding="8" style={{borderCollapse:"collapse"}}>
        <thead>
          <tr><th>العميل</th><th>المنتج</th><th>الكمية</th><th>السعر</th><th>الإجمالي</th><th>ملاحظات</th><th>إجراءات</th></tr>
        </thead>
        <tbody>
          {rows.map(r=>(
            <tr key={r._id}>
              <td>{r.customer}</td>
              <td>{r.item}</td>
              <td>{r.qty}</td>
              <td>{r.price}</td>
              <td>{Number(r.qty||0)*Number(r.price||0)}</td>
              <td>{r.notes}</td>
              <td style={{display:"flex",gap:8}}>
                <button onClick={()=>downloadInvoice(r._id)}>فاتورة PDF</button>
                <button onClick={()=>del(r._id)}>حذف</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}