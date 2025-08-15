import React, { useEffect, useState } from 'react';
import http from '../http';

export default function Visits(){
  const [customers,setCustomers]=useState([]);
  const [list,setList]=useState([]);
  const [form,setForm]=useState({
    customer:'', purpose:'Follow-up', location:'', notes:'', lat:'', lng:'', designUrl:''
  });

  async function loadCustomers(){ const {data}=await http.get('/customers'); setCustomers(data); }
  async function loadVisits(){
    const {data}=await http.get('/visits');
    setList(data||[]);
  }

  useEffect(()=>{ loadCustomers(); loadVisits(); },[]);

  function getGeo(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(p=>{
        setForm(f=>({...f, lat: p.coords.latitude, lng: p.coords.longitude }));
      });
    }
  }

  async function submit(e){
    e.preventDefault();
    await http.post('/visits', form);
    setForm({customer:'', purpose:'Follow-up', location:'', notes:'', lat:'', lng:'', designUrl:''});
    loadVisits();
  }

  return (
    <div style={{padding:16, direction:'rtl'}}>
      <h2>تسجيل زيارة</h2>
      <form onSubmit={submit} style={{display:'grid', gap:8, maxWidth:700}}>
        <select value={form.customer} onChange={e=>setForm({...form,customer:e.target.value})}>
          <option value="">اختر عميل</option>
          {customers.map(c=><option key={c._id} value={c._id}>{c.name}</option>)}
        </select>
        <input placeholder="الغرض" value={form.purpose} onChange={e=>setForm({...form,purpose:e.target.value})}/>
        <input placeholder="الموقع (نصي)" value={form.location} onChange={e=>setForm({...form,location:e.target.value})}/>
        <input placeholder="رابط التصميم (اختياري)" value={form.designUrl} onChange={e=>setForm({...form,designUrl:e.target.value})}/>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr auto', gap:8}}>
          <input placeholder="Latitude" value={form.lat} onChange={e=>setForm({...form,lat:e.target.value})}/>
          <input placeholder="Longitude" value={form.lng} onChange={e=>setForm({...form,lng:e.target.value})}/>
          <button type="button" onClick={getGeo}>GPS</button>
        </div>
        <textarea placeholder="ملاحظات" value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})}/>
        <button type="submit">حفظ الزيارة</button>
      </form>

      <h3 style={{marginTop:24}}>أحدث الزيارات</h3>
      <table style={{width:'100%'}}>
        <thead><tr><th>العميل</th><th>الغرض</th><th>الموقع</th><th>التاريخ</th></tr></thead>
        <tbody>
          {list.map(v=>(
            <tr key={v._id}>
              <td>{v.customer?.name || v.customer}</td>
              <td>{v.purpose}</td>
              <td>{v.location}</td>
              <td>{new Date(v.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
