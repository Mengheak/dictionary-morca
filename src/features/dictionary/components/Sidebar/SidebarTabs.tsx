import React from "react";
import { Star, History } from "lucide-react";
import type { DictionaryTab } from "../../hooks/useDictionaryUrlState";

export default function SidebarTabs({
  tab,
  onTabChange,
  counts,
}: {
  tab: DictionaryTab;
  onTabChange: (t: DictionaryTab) => void;
  counts: { all: number; favorites: number; history: number };
}) {
  return (
    <div className="grid grid-cols-3 gap-2">
      <Tab active={tab === "all"} onClick={() => onTabChange("all")} label="ទាំងអស់" count={counts.all} />
      <Tab
        active={tab === "favorites"}
        onClick={() => onTabChange("favorites")}
        label="ចូលចិត្ត"
        count={counts.favorites}
        icon={<Star size={16} />}
      />
      <Tab
        active={tab === "history"}
        onClick={() => onTabChange("history")}
        label="ប្រវត្តិ"
        count={counts.history}
        icon={<History size={16} />}
      />
    </div>
  );
}

function Tab({
  active,
  onClick,
  label,
  count,
  icon,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
  icon?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-xl border px-3 py-2 text-xs font-semibold transition flex items-center justify-center gap-2",
        active ? "border-blue-300 bg-blue-50 text-blue-700" : "border-slate-200 bg-white/60 text-slate-600 hover:bg-white",
      ].join(" ")}
    >
      {icon}
      <span className="truncate">{label}</span>
      <span className="ml-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] text-slate-600">{count}</span>
    </button>
  );
}
