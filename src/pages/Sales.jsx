import React, { useEffect, useState } from "react";
import axios from "axios";
import { endpoints } from "../api";
import SaleForm from "../components/SaleForm";

export default function Sales() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const load = async () => {
    try {
      setErr("");
      setLoading(true);
      const { data } = await axios.get(endpoints.sales);
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      setErr("تعذر تحميل المبيعات");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="p-4">
      <h2 style={{marginBottom:12}}>سجل المبيعات</h2>
      <SaleForm onCreated={load} />
      {err && <div style={{color:"crimson", marginBottom:8}}>{err}</div>}
      {loading ? <div>جاري التحميل...</div> : (
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%", borderCollapse:"collapse"}}>
            <thead>
              <tr>
                <th style={{border:"1px solid #ddd", padding:8}}>المنتج</th>
                <th style={{border:"1px solid #ddd", padding:8}}>الكمية</th>
                <th style={{border:"1px solid #ddd", padding:8}}>السعر النهائي</th>
              </tr>
            </thead>
            <tbody>
              {items.map(s => (
                <tr key={s._id}>
                  <td style={{border:"1px solid #eee", padding:8}}>
                    {s.product?.name || s.product}
                  </td>
                  <td style={{border:"1px solid #eee", padding:8}}>
                    {s.quantity} × {s.packSize} = {s.quantity * s.packSize}
                  </td>
                  <td style={{border:"1px solid #eee", padding:8}}>
                    {Number(s.total ?? 0).toFixed(2)}
                  </td>
                </tr>
              ))}
              {!items.length && (
                <tr><td colSpan="3" style={{padding:12, textAlign:"center"}}>لا توجد مبيعات</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
