import React, { useEffect, useState } from "react";
import axios from "axios";
import { endpoints } from "../api";
import ProductForm from "../components/ProductForm";

export default function Products() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const load = async () => {
    try {
      setErr("");
      setLoading(true);
      const { data } = await axios.get(endpoints.products);
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      setErr("تعذر تحميل المنتجات");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="p-4">
      <h2 style={{marginBottom:12}}>المنتجات</h2>
      <ProductForm onCreated={load} />
      {err && <div style={{color:"crimson", marginBottom:8}}>{err}</div>}
      {loading ? <div>جاري التحميل...</div> : (
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%", borderCollapse:"collapse"}}>
            <thead>
              <tr>
                <th style={{border:"1px solid #ddd", padding:8}}>الاسم</th>
                <th style={{border:"1px solid #ddd", padding:8}}>السعر</th>
                <th style={{border:"1px solid #ddd", padding:8}}>الوحدة</th>
                <th style={{border:"1px solid #ddd", padding:8}}>حجم العبوة</th>
                <th style={{border:"1px solid #ddd", padding:8}}>SKU</th>
                <th style={{border:"1px solid #ddd", padding:8}}>ملاحظات</th>
              </tr>
            </thead>
            <tbody>
              {items.map(p => (
                <tr key={p._id}>
                  <td style={{border:"1px solid #eee", padding:8}}>{p.name}</td>
                  <td style={{border:"1px solid #eee", padding:8}}>{Number(p.price).toFixed(2)}</td>
                  <td style={{border:"1px solid #eee", padding:8}}>{p.unitType}</td>
                  <td style={{border:"1px solid #eee", padding:8}}>{p.packSize}</td>
                  <td style={{border:"1px solid #eee", padding:8}}>{p.sku}</td>
                  <td style={{border:"1px solid #eee", padding:8}}>{p.notes}</td>
                </tr>
              ))}
              {!items.length && (
                <tr><td colSpan="6" style={{padding:12, textAlign:"center"}}>لا توجد منتجات</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
