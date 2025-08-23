import React, { useState } from "react"
import { getToken } from "../auth"
import { http } from "../http"

export default function Reports() {
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [totals, setTotals] = useState({ totalQty: 0, totalAmount: 0 })

  async function refresh() {
    const { data } = await http.get(`/api/stats/sales?from=${from||""}&to=${to||""}`)
    setTotals(data || { totalQty: 0, totalAmount: 0 })
  }

  async function downloadCsv() {
    const q = new URLSearchParams()
    if (from) q.set("from", from)
    if (to) q.set("to", to)
    const res = await fetch(`/api/sales/export.csv?${q.toString()}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "sales.csv"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div style={{ maxWidth: 900, margin: "24px auto" }}>
      <h1>التقارير</h1>
      <div style={{display:"flex",gap:8,marginBottom:12}}>
        <input type="date" value={from} onChange={e=>setFrom(e.target.value)} />
        <input type="date" value={to} onChange={e=>setTo(e.target.value)} />
        <button onClick={refresh}>تحديث</button>
        <button onClick={downloadCsv}>تصدير CSV</button>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        <div style={{border:"1px solid #ddd",padding:12}}>إجمالي الكمية: {totals.totalQty||0}</div>
        <div style={{border:"1px solid #ddd",padding:12}}>إجمالي المبلغ: {totals.totalAmount||0}</div>
      </div>
    </div>
  )
}