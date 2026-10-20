import { Image, LayoutGrid, Settings2 } from "lucide-react";

function Navbar({ view, onChangeView }) {
  const tabs = [
    { key: "gallery", label: "Gallery", icon: LayoutGrid },
    { key: "manage", label: "Manage", icon: Settings2 },
  ];

  return (
    <nav className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <button className="flex items-center gap-2.5" onClick={() => onChangeView("gallery")} aria-label="ShowCase home">
          <span className="grid size-9 place-items-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-200"><Image size={19} /></span>
          <span className="text-xl font-extrabold tracking-tight text-slate-900">Show<span className="text-indigo-600">Case</span></span>
        </button>
        <div className="flex rounded-full bg-slate-100 p-1">
          {tabs.map(({ key, label, icon: Icon }) => (
            <button key={key} onClick={() => onChangeView(key)} className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${view === key ? "bg-indigo-600 text-white shadow-md shadow-indigo-200" : "text-slate-500 hover:text-slate-900"}`} aria-current={view === key ? "page" : undefined}>
              <Icon size={16} />{label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
