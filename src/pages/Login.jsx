import React, { useState } from 'react';
import { login } from '../auth';

export default function Login() {
  const [email, setEmail] = useState('abouhadi2@gmail.com');
  const [password, setPassword] = useState('Baker@2030');
  const [error, setError] = useState('');

  async function onSubmit(e){
    e.preventDefault();
    setError('');
    try{
      await login(email, password);
      location.href = '/visits';
    }catch(e){ setError('فشل تسجيل الدخول'); }
  }

  return (
    <div style={{maxWidth:420, margin:'40px auto', direction:'rtl'}}>
      <h2>تسجيل الدخول</h2>
      {error && <div style={{color:'crimson'}}>{error}</div>}
      <form onSubmit={onSubmit}>
        <div><label>الايميل</label><input value={email} onChange={e=>setEmail(e.target.value)} style={{width:'100%'}}/></div>
        <div><label>الرمز</label><input type="password" value={password} onChange={e=>setPassword(e.target.value)} style={{width:'100%'}}/></div>
        <button type="submit" style={{marginTop:12}}>دخول</button>
      </form>
    </div>
  );
}
