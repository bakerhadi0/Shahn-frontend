import React, { useEffect, useState } from 'react';
import http from '../http';

export default function Customers(){
  const [list,setList]=useState([]);
  const [form,setForm]=useState({name:'',company:'',contact:'',phone:'',city:'',address:''});

  async function load(){ const {data}=await http.get('/customers'); setList(data); }
  useEffect(()=>{ load(); },[]);

  async function submit(e){
    e.preventDefault();
    await http.post('/customers',form);
    setForm({name:'',company:'',contact:'',phone:'',city:'',address:''});
    load();
  }

  return (
    <div style={{padding:16, direction:'rtl'}}>
      <h2>العملاء</h2>
      <form onSubmit={submit} style={{display:'grid', gap:8, maxWidth:600}}>
        <input placeholder="الاسم" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
        <input placeholder="الشركة" value={form.company} onChange={e=>setForm({...form,company:e.target.value})}/>
        <input placeholder="الشخص المسؤول" value={form.contact} onChange={e=>setForm({...form,contact:e.target.value})}/>
        <input placeholder="الجوال" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/>
        <input placeholder="المدينة" value={form.city} onChange={e=>setForm({...form,city:e.target.value})}/>
        <input placeholder="العنوان" value={form.address} onChange={e=>setForm({...form,address:e.target.value})}/>
        <button type="submit">حفظ</button>
      </form>

      <table style={{marginTop:20, width:'100%'}}>
        <thead><tr><th>الاسم</th><th>الشركة</th><th>الهاتف</th><th>المدينة</th></tr></thead>
        <tbody>{list.map(c=>(
          <tr key={c._id}><td>{c.name}</td><td>{c.company}</td><td>{c.phone}</td><td>{c.city}</td></tr>
        ))}</tbody>
      </table>
    </div>
  );
}
