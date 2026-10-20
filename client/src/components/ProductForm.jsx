import { useEffect, useState } from "react";
import { CirclePlus, PencilLine, X } from "lucide-react";
import ImageUpload from "./ImageUpload.jsx";

const emptyForm = { name: "", price: "", description: "", image: "" };

function ProductForm({ editingProduct, onSubmit, onCancel }) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setForm(editingProduct ? { name: editingProduct.name, price: String(editingProduct.price), description: editingProduct.description || "", image: editingProduct.image } : emptyForm);
    setError("");
  }, [editingProduct]);

  const handleChange = (event) => setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, price, description, image } = form;
    if (!name.trim() || price === "" || !image) return setError("Name, price, and image are required.");
    if (!Number.isFinite(Number(price)) || Number(price) < 0) return setError("Enter a valid non-negative price.");
    setSaving(true);
    setError("");
    try {
      await onSubmit({ name: name.trim(), price: Number(price), description: description.trim(), image });
      if (!editingProduct) setForm(emptyForm);
    } catch (err) {
      setError(err.message || "Could not save the product. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5 flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">Product details</p><h2 className="mt-1 text-xl font-extrabold text-slate-900">{editingProduct ? "Edit product" : "Add a product"}</h2></div>{editingProduct && <button type="button" onClick={onCancel} aria-label="Cancel editing" className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-800"><X size={18} /></button>}</div>
      <ImageUpload image={form.image} onChange={(image) => { setForm((prev) => ({ ...prev, image })); setError(""); }} onError={setError} />
      <label className="mt-5 block text-sm font-semibold text-slate-700">Product name<input name="name" value={form.name} onChange={handleChange} maxLength={100} placeholder="e.g. Wireless Headphones" className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100" /></label>
      <label className="mt-4 block text-sm font-semibold text-slate-700">Price (₱)<input name="price" type="number" min="0" step="0.01" value={form.price} onChange={handleChange} placeholder="1499" className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100" /></label>
      <label className="mt-4 block text-sm font-semibold text-slate-700">Description <span className="font-normal text-slate-400">(optional)</span><textarea name="description" rows="3" maxLength={500} value={form.description} onChange={handleChange} placeholder="A short, clear description of the item" className="mt-2 w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 leading-6 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100" /></label>
      {error && <p role="alert" className="mt-4 rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">{error}</p>}
      <div className="mt-5 flex gap-2"><button type="submit" disabled={saving} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 disabled:cursor-wait disabled:opacity-60">{editingProduct ? <PencilLine size={17} /> : <CirclePlus size={17} />}{saving ? "Saving…" : editingProduct ? "Update product" : "Add product"}</button>{editingProduct && <button type="button" onClick={onCancel} className="rounded-xl bg-slate-100 px-4 py-3 font-bold text-slate-600 transition hover:bg-slate-200">Cancel</button>}</div>
    </form>
  );
}

export default ProductForm;
