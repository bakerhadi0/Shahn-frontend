import React, { useEffect, useState } from "react";
import http from "../http";

export default function Customers(){
  const [items,setItems] = useState([]);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");
  const [form,setForm] = useState({name:"",company:"",phone:"",location:"",notes:""});

  async function load(){
    setError("");
    setLoading(true);
    try{
      const { data } = await http.get("/api/customers");
      setItems(Array.isArray(data)?data:[]);
    }catch(e){ setError("تعذر تحميل العملاء"); }
    finally{ setLoading(false); }
  }

  async function add(){
    setError("");
    try{
      const { data } = await http.post("/api/customers", form);
      setItems([data, ...items]);
      setForm({name:"",company:"",phone:"",location:"",notes:""});
    }catch(e){ setError("تعذر الحفظ"); }
  }

  useEffect(()=>{ load(); },[]);

  return (
    <div style={{maxWidth:900,margin:"24px auto"}}>
      <h2>العملاء</h2>
      {error && <div style={{color:"crimson"}}>{error}</div>}
      <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:8}}>
        <input placeholder="الاسم" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
        <input placeholder="الشركة" value={form.company} onChange={e=>setForm({...form,company:e.target.value})}/>
        <input placeholder="الهاتف" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/>
        <input placeholder="الموقع" value={form.location} onChange={e=>setForm({...form,location:e.target.value})}/>
        <input placeholder="ملاحظات" value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})}/>
      </div>
      <button onClick={add} style={{marginTop:8}}>إضافة</button>

      <table style={{width:"100%",marginTop:20,borderCollapse:"collapse"}}>
        <thead>
          <tr>
            <th style={{textAlign:"right"}}>الاسم</th>
            <th style={{textAlign:"right"}}>الشركة</th>
            <th style={{textAlign:"right"}}>الهاتف</th>
            <th style={{textAlign:"right"}}>الموقع</th>
            <th style={{textAlign:"right"}}>ملاحظات</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan={5}>...تحميل</td></tr>
          ) : items.map((c)=>(
            <tr key={c._id||c.id}>
              <td>{c.name}</td>
              <td>{c.company}</td>
              <td>{c.phone}</td>
              <td>{c.location}</td>
              <td>{c.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
