import React, { useEffect, useState } from "react";
import http from "../http";

export default function Customers(){
  const [items,setItems]=useState([]);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState("");
  const [form,setForm]=useState({name:"",company:"",phone:"",location:"",notes:""});

  const load = async()=>{
    try{
      setError(""); setLoading(true);
      const {data}=await http.get("/api/customers");
      setItems(Array.isArray(data)?data:[]);
    }catch(e){ setError("تعذّر تحميل العملاء"); }
    finally{ setLoading(false); }
  };

  useEffect(()=>{ load(); },[]);

  const save = async(e)=>{
    e.preventDefault();
    try{
      setError("");
      await http.post("/api/customers", form);
      setForm({name:"",company:"",phone:"",location:"",notes:""});
      await load();
    }catch(e){ setError("تعذّر الحفظ"); }
  };

  const on = (k)=>(e)=> setForm(v=>({...v,[k]:e.target.value}));

  return (
    <div style={{padding:"24px"}}>
      <h2>العملاء</h2>
      {error && <div style={{color:"crimson",marginBottom:8}}>{error}</div>}
      <form onSubmit={save} style={{display:"grid",gridTemplateColumns:"repeat(5,1fr) auto", gap:8, maxWidth:1000}}>
        <input placeholder="الاسم" value={form.name} onChange={on("name")} required/>
        <input placeholder="الشركة" value={form.company} onChange={on("company")}/>
        <input placeholder="الهاتف" value={form.phone} onChange={on("phone")}/>
        <input placeholder="الموقع" value={form.location} onChange={on("location")}/>
        <input placeholder="ملاحظات" value={form.notes} onChange={on("notes")}/>
        <button type="submit" disabled={loading}>إضافة</button>
      </form>

      <table style={{width:"100%",marginTop:16,borderCollapse:"collapse"}}>
        <thead>
          <tr>
            <th style={{textAlign:"right",borderBottom:"1px solid #ddd"}}>الاسم</th>
            <th style={{textAlign:"right",borderBottom:"1px solid #ddd"}}>الشركة</th>
            <th style={{textAlign:"right",borderBottom:"1px solid #ddd"}}>الهاتف</th>
            <th style={{textAlign:"right",borderBottom:"1px solid #ddd"}}>الموقع</th>
            <th style={{textAlign:"right",borderBottom:"1px solid #ddd"}}>ملاحظات</th>
          </tr>
        </thead>
        <tbody>
          {items.map(x=>(
            <tr key={x._id}>
              <td style={{borderBottom:"1px solid #eee"}}>{x.name}</td>
              <td style={{borderBottom:"1px solid #eee"}}>{x.company}</td>
              <td style={{borderBottom:"1px solid #eee"}}>{x.phone}</td>
              <td style={{borderBottom:"1px solid #eee"}}>{x.location}</td>
              <td style={{borderBottom:"1px solid #eee"}}>{x.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
