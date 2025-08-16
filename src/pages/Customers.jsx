import React, { useEffect, useState } from 'react';
import { endpoints } from '../api';
import { getToken } from '../auth';
import { useNavigate } from 'react-router-dom';

export default function Customers(){
  const nav = useNavigate();
  const [items,setItems]=useState([]);
  const [q,setQ]=useState('');
  const [f,setF]=useState({name:'',company:'',phone:'',location:'',notes:''});
  const [error,setError]=useState('');
  const [saving,setSaving]=useState(false);

  const token = getToken();

  const authHeader = token ? { Authorization: `Bearer ${token}` } : {};

  const load = async()=>{
    setError('');
    const url = q ? `${endpoints.customers}?q=${encodeURIComponent(q)}` : endpoints.customers;
    try{
      const r = await fetch(url,{ headers: { ...authHeader } });
      if(!r.ok){ setError(`Load failed: ${r.status}`); return; }
      setItems(await r.json());
    }catch(e){ setError('Network error'); }
  };

  useEffect(()=>{
    if(!token){ nav('/login'); return; }
    load();
    // eslint-disable-next-line
  },[token]);

  const add = async(e)=>{
    e.preventDefault();
    setError('');
    if(!f.name.trim()){ setError('الاسم مطلوب'); return; }
    setSaving(true);
    try{
      const r = await fetch(endpoints.customers,{
        method:'POST',
        headers:{ 'Content-Type':'application/json', ...authHeader },
        body: JSON.stringify(f)
      });
      if(!r.ok){
        const t = await r.text();
        setError(t || `Save failed: ${r.status}`);
      }else{
        setF({name:'',company:'',phone:'',location:'',notes:''});
        await load();
      }
    }catch(e){ setError('Network error'); }
    finally{ setSaving(false); }
  };

  return (
    <div style={{padding:16,maxWidth:720,margin:'0 auto'}}>
      <h2>العملاء</h2>

      <div style={{margin:'12px 0',display:'flex',gap:8}}>
        <input placeholder="بحث..." value={q} onChange={e=>setQ(e.target.value)} />
        <button onClick={load}>بحث</button>
      </div>

      <form onSubmit={add} style={{display:'grid',gap:8}}>
        <input required placeholder="الاسم"     value={f.name}     onChange={e=>setF({...f,name:e.target.value})}/>
        <input placeholder="الشركة"   value={f.company}  onChange={e=>setF({...f,company:e.target.value})}/>
        <input placeholder="الهاتف"    value={f.phone}    onChange={e=>setF({...f,phone:e.target.value})}/>
        <input placeholder="الموقع"    value={f.location} onChange={e=>setF({...f,location:e.target.value})}/>
        <input placeholder="ملاحظات"  value={f.notes}    onChange={e=>setF({...f,notes:e.target.value})}/>
        {error && <div style={{color:'crimson'}}>{error}</div>}
        <button type="submit" disabled={saving}>{saving?'...يحفظ':'إضافة'}</button>
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
