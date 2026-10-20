import { Pencil, Trash2 } from "lucide-react";

function ProductCard({ product, showActions = false, onEdit, onDelete }) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-950/5">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1.5 text-sm font-bold text-indigo-700 shadow-sm backdrop-blur">₱{Number(product.price).toLocaleString()}</span>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-slate-900">{product.name}</h3>
        <p className="mt-2 min-h-12 text-sm leading-6 text-slate-500">{product.description || "A carefully selected item, ready to discover."}</p>
        {showActions && (
          <div className="mt-5 flex gap-2">
            <button onClick={() => onEdit(product)} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-100 px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-700"><Pencil size={15} /> Edit</button>
            <button onClick={() => onDelete(product._id)} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-rose-50 px-3 py-2.5 text-sm font-semibold text-rose-600 transition hover:bg-rose-100"><Trash2 size={15} /> Delete</button>
          </div>
        )}
      </div>
    </article>
  );
}

export default ProductCard;
