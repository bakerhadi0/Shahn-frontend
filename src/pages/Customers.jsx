import React, { useEffect, useState } from "react";
import { j } from "../http";

export default function Customers() {
  const [list, setList] = useState([]);
  const [f, setF] = useState({ name:"", company:"", phone:"", location:"", notes:"" });
  const [err, setErr] = useState("");

  const load = async () => {
    try { const data = await j("/api/customers"); setList(Array.isArray(data)?data:[]); }
    catch { setErr("تعذر تحميل العملاء"); }
  };
  useEffect(()=>{ load(); },[]);

  const save = async (e) => {
    e.preventDefault(); setErr("");
    try {
      const c = await j("/api/customers", { method:"POST", body: JSON.stringify(f) });
      setF({ name:"", company:"", phone:"", location:"", notes:"" });
      setList([c, ...list]);
    } catch { setErr("تعذر الحفظ"); }
  };

  return (
    <div style={{ maxWidth: 900, margin: "20px auto" }}>
      <h2>العملاء</h2>
      {err && <div style={{ color: "crimson" }}>{err}</div>}
      <form onSubmit={save} style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:8}}>
        <input placeholder="الاسم" value={f.name} onChange={e=>setF({...f,name:e.target.value})}/>
        <input placeholder="الشركة" value={f.company} onChange={e=>setF({...f,company:e.target.value})}/>
        <input placeholder="الهاتف" value={f.phone} onChange={e=>setF({...f,phone:e.target.value})}/>
        <input placeholder="الموقع" value={f.location} onChange={e=>setF({...f,location:e.target.value})}/>
        <input placeholder="ملاحظات" value={f.notes} onChange={e=>setF({...f,notes:e.target.value})}/>
        <button style={{gridColumn:"span 5"}}>إضافة</button>
      </form>
      <table style={{ width:"100%", marginTop:16 }}>
        <thead><tr><th>الاسم</th><th>الشركة</th><th>الهاتف</th></tr></thead>
        <tbody>{list.map(x=>(
          <tr key={x._id}><td>{x.name}</td><td>{x.company}</td><td>{x.phone}</td></tr>
        ))}</tbody>
      </table>
    </div>
  );
}
