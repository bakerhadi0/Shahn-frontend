import React, { useState } from "react";
import axios from "axios";
import { endpoints } from "../api";

export default function ProductForm({ onCreated }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    unitType: "piece",
    packSize: 1,
    sku: "",
    notes: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const change = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: name === "price" || name === "packSize" ? Number(value) : value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setSaving(true);
      await axios.post(endpoints.products, {
        name: form.name.trim(),
        price: Number(form.price) || 0,
        unitType: form.unitType,
        packSize: Number(form.packSize) || 1,
        sku: form.sku.trim(),
        notes: form.notes.trim(),
      });
      setForm({ name: "", price: "", unitType: "piece", packSize: 1, sku: "", notes: "" });
      if (typeof onCreated === "function") onCreated();
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} style={{ padding: 12, border: "1px solid #ddd", marginBottom: 16, borderRadius: 8 }}>
      <h3 style={{ marginTop: 0 }}>إضافة منتج</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: 12 }}>
        <label>الاسم<input name="name" value={form.name} onChange={change} required className="input" /></label>
        <label>السعر<input name="price" type="number" step="0.01" value={form.price} onChange={change} required /></label>
        <label>نوع الوحدة
          <select name="unitType" value={form.unitType} onChange={change}>
            <option value="piece">قطعة</option><option value="box">صندوق</option><option value="kg">كجم</option>
          </select>
        </label>
        <label>حجم العبوة<input name="packSize" type="number" min="1" step="1" value={form.packSize} onChange={change} /></label>
        <label>SKU<input name="sku" value={form.sku} onChange={change} /></label>
        <label>ملاحظات<input name="notes" value={form.notes} onChange={change} /></label>
      </div>
      {error && <div style={{ color: "crimson", marginTop: 8 }}>{error}</div>}
      <button type="submit" disabled={saving} style={{ marginTop: 12 }}>{saving ? "جاري الحفظ..." : "حفظ المنتج"}</button>
    </form>
  );
}
