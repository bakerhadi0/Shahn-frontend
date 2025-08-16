import React, { useEffect, useState } from 'react';
import { endpoints } from '../api';

export default function Customers(){
  const [items,setItems]=useState([]);
  const [q,setQ]=useState('');
  const [f,setF]=useState({name:'',company:'',phone:'',location:'',notes:''});
  const token = localStorage.getItem('token')||'';

  const load=async()=>{
    const url = q ? `${endpoints.customers}?q=${encodeURIComponent(q)}` : endpoints.customers;
    const r = await fetch(url,{headers:{Authorization:`Bearer ${token}`}});
    setItems(await r.json());
  };

  useEffect(()=>{ load(); },[]);

  const add=async(e)=>{
    e.preventDefault();
    await fetch(endpoints.customers,{
      method:'POST',
      headers:{'Content-Type':'application/json',Authorization:`Bearer ${token}`},
      body:JSON.stringify(f)
    });
    setF({name:'',company:'',phone:'',location:'',notes:''});
    load();
  };

  return (
    <div style={{padding:16}}>
      <h2>العملاء</h2>
      <div style={{margin:'12px 0'}}>
        <input placeholder="بحث..." value={q} onChange={e=>setQ(e.target.value)} />
        <button onClick={load}>بحث</button>
      </div>
      <form onSubmit={add} style={{display:'grid',gap:8,maxWidth:480}}>
        <input required placeholder="الاسم"     value={f.name}     onChange={e=>setF({...f,name:e.target.value})}/>
        <input          placeholder="الشركة"   value={f.company}  onChange={e=>setF({...f,company:e.target.value})}/>
        <input          placeholder="الهاتف"    value={f.phone}    onChange={e=>setF({...f,phone:e.target.value})}/>
        <input          placeholder="الموقع"    value={f.location} onChange={e=>setF({...f,location:e.target.value})}/>
        <input          placeholder="ملاحظات"  value={f.notes}    onChange={e=>setF({...f,notes:e.target.value})}/>
        <button type="submit">إضافة</button>
      </form>

      <table style={{marginTop:16,width:'100%'}} border="1" cellPadding="6">
        <thead><tr><th>الاسم</th><th>الشركة</th><th>الهاتف</th><th>الموقع</th><th>ملاحظات</th></tr></thead>
        <tbody>
          {items.map(x=>(
            <tr key={x._id}>
              <td>{x.name}</td><td>{x.company||'-'}</td><td>{x.phone||'-'}</td>
              <td>{x.location||'-'}</td><td>{x.notes||'-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
