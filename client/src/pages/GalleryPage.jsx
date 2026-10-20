import { ArrowDown, Sparkles } from "lucide-react";
import ProductGrid from "../components/ProductGrid.jsx";

function GalleryPage({ products, loading }) {
  return (
    <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
      <section className="relative mb-10 overflow-hidden rounded-[2rem] bg-gradient-to-br from-indigo-700 via-violet-600 to-cyan-500 px-7 py-10 text-white shadow-xl shadow-indigo-950/10 sm:px-12 sm:py-14">
        <div className="pointer-events-none absolute bottom-[-9rem] right-[25%] size-72 rounded-full bg-cyan-300/20 blur-2xl" />
        <div className="relative max-w-2xl"><span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em]"><Sparkles size={14} /> Product gallery</span><h1 className="mt-5 text-4xl font-black leading-tight tracking-tight sm:text-6xl">Discover our<br className="hidden sm:block" /> products<span className="text-cyan-200">.</span></h1><p className="mt-4 max-w-xl text-base leading-7 text-indigo-50 sm:text-lg">A curated collection of everyday essentials, thoughtfully selected for your next favorite find.</p><div className="mt-8 flex flex-wrap items-center gap-4"><span className="rounded-full bg-white px-4 py-2 text-sm font-extrabold text-indigo-700">{products.length} {products.length === 1 ? "item" : "items"} available</span><span className="flex items-center gap-2 text-sm font-semibold text-white/85"><ArrowDown size={16} /> Browse the collection</span></div></div>
      </section>
      <div className="mb-5 flex items-end justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">The collection</p><h2 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900">All products</h2></div><span className="text-sm text-slate-500">{products.length} total</span></div>
      {loading ? <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">{[1,2,3].map((item) => <div key={item} className="h-80 animate-pulse rounded-3xl bg-white shadow-sm" />)}</div> : <ProductGrid products={products} />}
    </main>
  );
}

export default GalleryPage;
