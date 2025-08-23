import React, { useEffect, useState } from "react"
import { http } from "../http"
import { clearToken } from "../auth"

export default function Customers() {
  const empty = { name:"", company:"", phone:"", location:"", notes:"" }
  const [rows, setRows] = useState([])
  const [f, setF] = useState(empty)
  const [editId, setEditId] = useState("")
  const [edit, setEdit] = useState(empty)

  async function load(){
    const { data } = await http.get("/api/customers")
    setRows(Array.isArray(data) ? data : (data.items || []))
  }

  async function add(){
    if(!f.name) return
    await http.post("/api/customers", f)
    setF(empty)
    await load()
  }

  function startEdit(r){
    setEditId(r._id)
    setEdit({ name:r.name||"", company:r.company||"", phone:r.phone||"", location:r.location||"", notes:r.notes||"" })
  }

  async function saveEdit(){
    if(!editId) return
    await http.put(`/api/customers/${editId}`, edit)
    setEditId("")
    setEdit(empty)
    await load()
  }

  async function del(id){
    await http.delete(`/api/customers/${id}`)
    await load()
  }

  useEffect(()=>{ load() },[])

  return (
    <div style={{ maxWidth: 1000, margin: "24px auto" }}>
      <h1>العملاء</h1>

      <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr) auto",gap:8,marginBottom:12}}>
        <input placeholder="الاسم" value={f.name} onChange={e=>setF({...f,name:e.target.value})} />
        <input placeholder="الشركة" value={f.company} onChange={e=>setF({...f,company:e.target.value})} />
        <input placeholder="الهاتف" value={f.phone} onChange={e=>setF({...f,phone:e.target.value})} />
        <input placeholder="الموقع" value={f.location} onChange={e=>setF({...f,location:e.target.value})} />
        <input placeholder="ملاحظات" value={f.notes} onChange={e=>setF({...f,notes:e.target.value})} />
        <button onClick={add}>إضافة</button>
      </div>

      <table width="100%" cellPadding="8" style={{borderCollapse:"collapse"}}>
        <thead>
          <tr><th>الاسم</th><th>الشركة</th><th>الهاتف</th><th>الموقع</th><th>ملاحظات</th><th></th></tr>
        </thead>
        <tbody>
          {rows.map(r=>{
            const isE = r._id===editId
            return (
              <tr key={r._id}>
                <td>{isE ? <input value={edit.name} onChange={e=>setEdit({...edit,name:e.target.value})}/> : r.name}</td>
                <td>{isE ? <input value={edit.company} onChange={e=>setEdit({...edit,company:e.target.value})}/> : r.company}</td>
                <td>{isE ? <input value={edit.phone} onChange={e=>setEdit({...edit,phone:e.target.value})}/> : r.phone}</td>
                <td>{isE ? <input value={edit.location} onChange={e=>setEdit({...edit,location:e.target.value})}/> : r.location}</td>
                <td>{isE ? <input value={edit.notes} onChange={e=>setEdit({...edit,notes:e.target.value})}/> : r.notes}</td>
                <td style={{whiteSpace:"nowrap"}}>
                  {isE ? (
                    <>
                      <button onClick={saveEdit}>حفظ</button>
                      <button onClick={()=>{setEditId("");setEdit(empty)}}>إلغاء</button>
                    </>
                  ) : (
                    <>
                      <button onClick={()=>startEdit(r)}>تعديل</button>
                      <button onClick={()=>del(r._id)}>حذف</button>
                    </>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <div style={{marginTop:16}}>
        <button onClick={()=>{ clearToken(); window.location.href="/login" }}>تسجيل الخروج</button>
      </div>
    </div>
  )
}
