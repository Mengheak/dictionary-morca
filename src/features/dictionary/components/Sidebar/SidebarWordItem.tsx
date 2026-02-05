import { Star } from "lucide-react";
import type { Word } from "../../../../lib/api";

export default function SidebarWordItem({
  word,
  active,
  isFav,
  onClick,
}: {
  word: Word;
  active: boolean;
  isFav: boolean;
  onClick: () => void;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        className={[
          "w-full rounded-xl border px-3 py-3 text-left transition hover:bg-white/50",
          active ? "border-slate-300 bg-white shadow-sm" : "border-slate-200 bg-white/60 hover:bg-white",
        ].join(" ")}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="truncate text-sm font-bold text-slate-900 py-1">{word.term}</span>
              {word.phonetic ? (
                <span className="shrink-0 rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] text-slate-600">
                  {word.phonetic}
                </span>
              ) : null}
            </div>
            <p className="mt-1 line-clamp-2 text-xs text-slate-600 py-1">{word.meaning}</p>
          </div>
          {isFav ? <Star size={16} className="mt-1 text-amber-500 fill-amber-400" /> : null}
        </div>
      </button>
    </li>
  );
}
