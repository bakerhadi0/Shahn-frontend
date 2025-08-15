import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { endpoints } from "../api";

export default function SaleForm({ onCreated }) {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    product: "",
    quantity: 1,
    unitPrice: 0,
    unitType: "piece",
    packSize: 1,
    discountType: "percent",
    discountValue: 0,
    vatEnabled: true,
    vatRate: 15,
  });

  useEffect(() => {
    (async () => {
      try {
        setLoadingProducts(true);
        const { data } = await axios.get(endpoints.products);
        setProducts(Array.isArray(data) ? data : []);
      } catch {
        setError("تعذر تحميل المنتجات");
      } finally {
        setLoadingProducts(false);
      }
    })();
  }, []);

  useEffect(() => {
    const p = products.find((x) => x._id === form.product);
    if (p) {
      setForm((f) => ({
        ...f,
        unitPrice: Number(p.price) || 0,
        unitType: p.unitType || "piece",
        packSize: Number(p.packSize) || 1,
      }));
    }
  }, [form.product, products]);

  const change = (e) => {
    const { name, type, checked, value } = e.target;
    const val =
      type === "checkbox" ? checked :
      ["quantity", "unitPrice", "packSize", "discountValue", "vatRate"].includes(name) ? Number(value) : value;
    setForm((f) => ({ ...f, [name]: val }));
  };

  const calc = useMemo(() => {
    const qtyUnits = (Number(form.quantity) || 0) * (Number(form.packSize) || 1);
    const subtotal = +(qtyUnits * (Number(form.unitPrice) || 0)).toFixed(2);
    let discount = 0;
    if (form.discountType === "percent") {
      discount = +((subtotal * (Number(form.discountValue) || 0)) / 100).toFixed(2);
      if (discount > subtotal) discount = subtotal;
    } else {
      discount = +(Number(form.discountValue) || 0).toFixed(2);
      if (discount > subtotal) discount = subtotal;
    }
    const afterDiscount = +(subtotal - discount).toFixed(2);
    const vat = form.vatEnabled ? +((afterDiscount * (Number(form.vatRate) || 15)) / 100).toFixed(2) : 0;
    const total = +(afterDiscount + vat).toFixed(2);
    return { qtyUnits, subtotal, discount, vat, total };
  }, [form]);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setSaving(true);
      await axios.post(endpoints.sales, {
        product: form.product,
        quantity: Number(form.quantity) || 0,
        unitPrice: Number(form.unitPrice) || 0,
        unitType: form.unitType,
        packSize: Number(form.packSize) || 1,
        discountType: form.discountType,
        discountValue: Number(form.discountValue) || 0,
        vatEnabled: !!form.vatEnabled,
        vatRate: Number(form.vatRate) || 15,
      });
      setForm({
        product: "", quantity: 1, unitPrice: 0, unitType: "piece", packSize: 1,
        discountType: "percent", discountValue: 0, vatEnabled: true, vatRate: 15,
      });
      if (typeof onCreated === "function") onCreated();
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} style={{ padding: 12, border: "1px solid #ddd", marginBottom: 16, borderRadius: 8 }}>
      <h3 style={{ marginTop: 0 }}>إنشاء عملية بيع</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: 12 }}>
        <label>المنتج
          <select name="product" value={form.product} onChange={change} required disabled={loadingProducts}>
            <option value="">— اختر منتج —</option>
            {products.map((p) => (<option key={p._id} value={p._id}>{p.name} — {p.sku}</option>))}
          </select>
        </label>
        <label>الكمية<input name="quantity" type="number" min="1" step="1" value={form.quantity} onChange={change} required /></label>
        <label>سعر الوحدة<input name="unitPrice" type="number" step="0.01" value={form.unitPrice} onChange={change} required /></label>
        <label>نوع الوحدة
          <select name="unitType" value={form.unitType} onChange={change}>
            <option value="piece">قطعة</option><option value="box">صندوق</option><option value="kg">كجم</option>
          </select>
        </label>
        <label>حجم العبوة<input name="packSize" type="number" min="1" step="1" value={form.packSize} onChange={change} /></label>
        <label>نوع الخصم
          <select name="discountType" value={form.discountType} onChange={change}>
            <option value="percent">نسبة %</option><option value="amount">مبلغ</option>
          </select>
        </label>
        <label>قيمة الخصم<input name="discountValue" type="number" min="0" step="0.01" value={form.discountValue} onChange={change} /></label>
        <label>الضريبة
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <input name="vatEnabled" type="checkbox" checked={form.vatEnabled} onChange={change} />
            <input name="vatRate" type="number" min="0" step="0.1" value={form.vatRate} onChange={change} style={{ width: 90 }} disabled={!form.vatEnabled} />
            <span>%</span>
          </div>
        </label>
      </div>
      <div style={{ marginTop: 12, padding: 10, background: "#fafafa", border: "1px dashed #ccc" }}>
        <b>ملخّص فوري</b>
        <div>الوحدات: {calc.qtyUnits}</div>
        <div>قبل الخصم والضريبة: {calc.subtotal.toFixed(2)}</div>
        <div>الخصم: {calc.discount.toFixed(2)}</div>
        <div>الضريبة: {calc.vat.toFixed(2)}</div>
        <div>الإجمالي: {calc.total.toFixed(2)}</div>
      </div>
      {error && <div style={{ color: "crimson", marginTop: 8 }}>{error}</div>}
      <button type="submit" disabled={saving || !form.product} style={{ marginTop: 12 }}>
        {saving ? "جاري الحفظ..." : "تسجيل البيع"}
      </button>
    </form>
  );
}
