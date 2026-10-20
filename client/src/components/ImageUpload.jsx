import { ImagePlus, UploadCloud } from "lucide-react";

const MAX_SIZE = 1024 * 1024;
const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

function ImageUpload({ image, onChange, onError }) {
  const handleFile = (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!allowedTypes.includes(file.type)) return onError("Choose a JPG, PNG, or WebP image.");
    if (file.size > MAX_SIZE) return onError("Image is too large. Maximum size is 1 MB.");
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result);
    reader.onerror = () => onError("Could not read that image. Please choose another file.");
    reader.readAsDataURL(file);
  };

  return (
    <label className="group relative flex aspect-[4/3] cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 transition hover:border-indigo-400 hover:bg-indigo-50/40">
      {image ? <img src={image} alt="Product image preview" className="h-full w-full object-cover" /> : <span className="flex flex-col items-center text-center"><span className="grid size-12 place-items-center rounded-2xl bg-white text-indigo-600 shadow-sm"><ImagePlus size={22} /></span><span className="mt-3 text-sm font-semibold text-slate-700">Choose a product image</span><span className="mt-1 text-xs text-slate-500">JPG, PNG, WebP · up to 1 MB</span><span className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600"><UploadCloud size={14} /> Browse files</span></span>}
      <input type="file" accept="image/png,image/jpeg,image/webp" className="sr-only" onChange={handleFile} />
    </label>
  );
}

export default ImageUpload;
