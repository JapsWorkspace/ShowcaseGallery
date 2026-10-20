import { useEffect, useState } from "react";
import { AlertCircle, RotateCw } from "lucide-react";
import Navbar from "./components/Navbar.jsx";
import GalleryPage from "./pages/GalleryPage.jsx";
import ManagePage from "./pages/ManagePage.jsx";
import { createProduct, deleteProduct, getProducts, updateProduct } from "./api.js";

function App() {
  const [products, setProducts] = useState([]);
  const [view, setView] = useState("gallery");
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProducts = async () => {
    setLoading(true);
    setError("");
    try {
      setProducts(await getProducts());
    } catch (err) {
      setError(`${err.message}. Check that the API is running and the database is connected.`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadProducts(); }, []);

  const saveProduct = async (data) => {
    if (editingProduct) {
      const updated = await updateProduct(editingProduct._id, data);
      setProducts((current) => current.map((product) => product._id === updated._id ? updated : product));
      setEditingProduct(null);
    } else {
      const created = await createProduct(data);
      setProducts((current) => [created, ...current]);
    }
  };

  const startEdit = (product) => {
    setView("manage");
    setEditingProduct(product);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const removeProduct = async (id) => {
    if (!window.confirm("Delete this product? This cannot be undone.")) return;
    try {
      await deleteProduct(id);
      setProducts((current) => current.filter((product) => product._id !== id));
      if (editingProduct?._id === id) setEditingProduct(null);
    } catch (err) {
      setError(err.message || "Could not delete the product.");
    }
  };

  return (
    <div className="app-shell min-h-screen">
      <Navbar view={view} onChangeView={(next) => { setView(next); setEditingProduct(null); setError(""); }} />
      {error && <div className="mx-auto mt-5 flex max-w-7xl items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-rose-800 sm:mx-8"><AlertCircle className="mt-0.5 shrink-0" size={19} /><div className="flex-1"><p className="font-bold">Could not reach the product API</p><p className="mt-1 text-sm leading-6">{error}</p></div><button onClick={loadProducts} aria-label="Retry loading products" className="rounded-lg p-2 hover:bg-rose-100"><RotateCw size={17} /></button></div>}
      {view === "gallery" ? <GalleryPage products={products} loading={loading} /> : <ManagePage products={products} editingProduct={editingProduct} onSave={saveProduct} onCancel={() => setEditingProduct(null)} onEdit={startEdit} onDelete={removeProduct} />}
      <footer className="border-t border-slate-200/80 px-5 py-8 text-center text-sm text-slate-400"><span className="font-bold text-slate-500">ShowCase</span> · Made for learning and discovery</footer>
    </div>
  );
}

export default App;
