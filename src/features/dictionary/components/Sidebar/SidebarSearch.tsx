import { Search, X } from "lucide-react";

export default function SidebarSearch({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative">
      <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="ស្វែងរកពាក្យ..."
        className="w-full rounded-xl border border-slate-200 bg-white/70 px-10 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
      />
      {value && (
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 hover:text-slate-600"
          onClick={() => onChange("")}
          type="button"
          aria-label="Clear"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
