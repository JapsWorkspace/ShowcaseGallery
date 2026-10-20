import { PackageOpen } from "lucide-react";
import ProductCard from "./ProductCard.jsx";

function ProductGrid({ products, showActions = false, onEdit, onDelete }) {
  if (products.length === 0) {
    return <div className="rounded-3xl border border-dashed border-slate-300 bg-white/65 px-5 py-16 text-center"><PackageOpen className="mx-auto text-slate-300" size={36} /><p className="mt-4 font-semibold text-slate-700">No products yet</p><p className="mt-1 text-sm text-slate-500">Open Manage to add your first item to the gallery.</p></div>;
  }
  return <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">{products.map((product) => <ProductCard key={product._id} product={product} showActions={showActions} onEdit={onEdit} onDelete={onDelete} />)}</div>;
}

export default ProductGrid;
