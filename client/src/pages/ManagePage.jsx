import { useState } from "react";
import { PackageCheck } from "lucide-react";
import ProductForm from "../components/ProductForm.jsx";
import ProductGrid from "../components/ProductGrid.jsx";

function ManagePage({ products, editingProduct, onSave, onCancel, onEdit, onDelete }) {
  const [notice, setNotice] = useState("");
  const save = async (data) => {
    await onSave(data);
    setNotice(editingProduct ? "Product updated successfully." : "Product added to your gallery.");
    window.setTimeout(() => setNotice(""), 3500);
  };

  return (
    <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
      <header className="mb-8"><p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">Your workspace</p><h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">Manage products</h1><p className="mt-2 max-w-xl text-slate-500">Add new items, update details, and keep your product gallery fresh.</p></header>
      {notice && <div role="status" className="mb-5 flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800"><PackageCheck size={18} />{notice}</div>}
      <div className="grid items-start gap-8 lg:grid-cols-[360px_minmax(0,1fr)] xl:grid-cols-[400px_minmax(0,1fr)]">
        <ProductForm key={editingProduct?._id || "new"} editingProduct={editingProduct} onSubmit={save} onCancel={onCancel} />
        <section><div className="mb-5 flex items-end justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">Inventory</p><h2 className="mt-1 text-2xl font-extrabold text-slate-900">Your products</h2></div><span className="rounded-full bg-indigo-50 px-3 py-1.5 text-sm font-bold text-indigo-700">{products.length}</span></div><ProductGrid products={products} showActions onEdit={onEdit} onDelete={onDelete} /></section>
      </div>
    </main>
  );
}

export default ManagePage;
