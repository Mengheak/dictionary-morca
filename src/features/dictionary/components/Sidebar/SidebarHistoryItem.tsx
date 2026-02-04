import { History } from "lucide-react";

export default function SidebarHistoryItem({
  item,
  onClick,
}: {
  item: { id: string; term: string; viewedAt: number };
  onClick: () => void;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        className="w-full rounded-xl border border-slate-200 bg-white/60 hover:bg-white px-3 py-3 text-left transition"
      >
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="truncate text-sm font-bold text-slate-900">{item.term}</div>
            <div className="mt-1 text-[11px] text-slate-500">{new Date(item.viewedAt).toLocaleString()}</div>
          </div>
          <History size={16} className="mt-1 text-slate-400" />
        </div>
      </button>
    </li>
  );
}
