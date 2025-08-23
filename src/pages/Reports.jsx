import React, { useState, useEffect } from "react"
import { http } from "../http"

export default function Reports() {
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [tot, setTot] = useState({ totalQty: 0, totalAmount: 0 })

  async function load() {
    const p = new URLSearchParams()
    if (from) p.append("from", from)
    if (to) p.append("to", to)
    const { data } = await http.get("/api/stats/sales" + (p.toString() ? `?${p}` : ""))
    setTot(data)
  }

  useEffect(()=>{ load() }, [])

  return (
    <div style={{maxWidth:900,margin:"24px auto"}}>
      <h1>التقارير</h1>
      <div style={{display:"flex",gap:8,marginBottom:12}}>
        <input type="date" value={from} onChange={e=>setFrom(e.target.value)} />
        <input type="date" value={to} onChange={e=>setTo(e.target.value)} />
        <button onClick={load}>تحديث</button>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        <div style={{padding:16,border:"1px solid #ddd"}}>إجمالي الكمية: {tot.totalQty}</div>
        <div style={{padding:16,border:"1px solid #ddd"}}>إجمالي المبلغ: {tot.totalAmount}</div>
      </div>
    </div>
  )
}