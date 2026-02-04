"use client";

import { Menu, X } from "lucide-react";
import { useCallback, useRef } from "react";
import type { DictionaryTab } from "../../hooks/useDictionaryUrlState";
import SidebarSearch from "./SidebarSearch";
import SidebarTabs from "./SidebarTabs";
import SidebarWordItem from "./SidebarWordItem";
import SidebarHistoryItem from "./SidebarHistoryItem";
import type { Word } from "../../../../lib/api";

type HistoryItem = { id: string; term: string; viewedAt: number };

type Props = {
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;

  tab: DictionaryTab;
  onTabChange: (t: DictionaryTab) => void;

  query: string;
  onSearchChange: (v: string) => void;

  allCount: number;
  favoritesCount: number;
  historyCount: number;

  selectedWordId: string | null;

  favoriteIds: string[];

  listAll: Word[];
  listFavorites: Word[];
  listHistory: HistoryItem[];

  onPickWord: (id: string) => void;

  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isLoading: boolean;
};

export default function DictionarySidebar(props: Props) {
  const {
    mobileOpen,
    setMobileOpen,
    tab,
    onTabChange,
    query,
    onSearchChange,
    allCount,
    favoritesCount,
    historyCount,
    selectedWordId,
    favoriteIds,
    listAll,
    listFavorites,
    listHistory,
    onPickWord,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = props;

  const isHistory = tab === "history";
  const list = tab === "all" ? listAll : tab === "favorites" ? listFavorites : [];

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const onScroll = useCallback(() => {
    if (tab !== "all") return;

    const el = scrollRef.current;
    if (!el) return;

    const threshold = 160; 
    const nearBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - threshold;

    if (!nearBottom) return;
    if (!hasNextPage) return;
    if (isFetchingNextPage) return;

    fetchNextPage();
  }, [tab, fetchNextPage, hasNextPage, isFetchingNextPage]);

  const HeaderArea = (
    <div className="shrink-0 p-3 border-b border-slate-200 bg-[rgb(var(--card))]">
      <SidebarSearch value={query} onChange={onSearchChange} />
      <div className="mt-3">
        <SidebarTabs
          tab={tab}
          onTabChange={onTabChange}
          counts={{ all: allCount, favorites: favoritesCount, history: historyCount }}
        />
      </div>
    </div>
  );

  const ListArea = (
    <div
      ref={scrollRef}
      onScroll={onScroll}
      className="flex-1 min-h-0 overflow-y-auto custom-scrollbar p-2"
    >
      {!isHistory ? (
        isLoading && tab === "all" && list.length === 0 ? (
          <LoadingBlock />
        ) : list?.length ? (
          <>
            <ul className="space-y-2">
              {list.map((w) => (
                <SidebarWordItem
                  key={w.id}
                  word={w}
                  active={selectedWordId === w.id}
                  isFav={favoriteIds.includes(w.id)}
                  onClick={() => onPickWord(w.id)}
                />
              ))}
            </ul>

            {tab === "all" && (
              <div className="py-3 flex items-center justify-center">
                {isFetchingNextPage ? (
                  <span className="text-xs text-slate-600">កំពុងទាញយកបន្ថែម…</span>
                ) : hasNextPage ? (
                  <span className="text-xs text-slate-500">scroll ដើម្បីទាញយកបន្ថែម…</span>
                ) : (
                  <span className="text-xs text-slate-500">អស់ហើយ</span>
                )}
              </div>
            )}
          </>
        ) : (
          <EmptyList label={tab === "favorites" ? "មិនទាន់មានពាក្យចូលចិត្ត" : "គ្មានលទ្ធផល"} />
        )
      ) : listHistory.length ? (
        <ul className="space-y-2">
          {listHistory.map((h) => (
            <SidebarHistoryItem key={`${h.id}-${h.viewedAt}`} item={h} onClick={() => onPickWord(h.id)} />
          ))}
        </ul>
      ) : (
        <EmptyList label="មិនទាន់មានប្រវត្តិទេ" />
      )}
    </div>
  );

  const Desktop = (
    <aside className="hidden md:flex h-screen flex-col border-r border-slate-200 bg-[rgb(var(--card))] overflow-hidden">
      {HeaderArea}
      {ListArea}
    </aside>
  );

  return (
    <>
      <div className="md:hidden sticky top-0 z-30 border-b content-center border-slate-200 bg-[rgb(var(--card))] px-3 py-3 flex items-center justify-between">
        <button
          className="inline-flex items-center justify-center rounded-lg border border-slate-400 px-3 py-2 text-sm"
          onClick={() => setMobileOpen(true)}
          type="button"
          aria-label="Open sidebar"
        >
          <Menu className="text-gray-600" size={18} />
        </button>
      </div>

      {Desktop}

      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />

          <div className="absolute left-0 top-0 h-screen w-[86%] max-w-[380px] border-r bg-gray-200 border-slate-200 flex flex-col bg-[rgb(var(--card))] overflow-hidden">
            <div className="shrink-0 flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-[rgb(var(--card))]">
              <div className="font-semibold text-[rgb(var(--text))]">វចនានុក្រម</div>
              <button
                className="rounded-lg border border-slate-200 p-2"
                onClick={() => setMobileOpen(false)}
                type="button"
                aria-label="Close"
              >
                <X size={18} className="text-[rgb(var(--text))]" />
              </button>
            </div>

            {HeaderArea}
            {ListArea}
          </div>
        </div>
      )}
    </>
  );
}

function EmptyList({ label }: { label: string }) {
  return (
    <div className="mx-2 rounded-xl border border-slate-200 bg-white/40 px-4 py-6 text-center">
      <div className="text-sm font-medium text-slate-800">{label}</div>
      <div className="mt-1 text-xs text-slate-500">សូមស្វែងរកពាក្យ ឬជ្រើស Tab ផ្សេង</div>
    </div>
  );
}

function LoadingBlock() {
  return (
    <div className="mx-2 rounded-xl border border-slate-200 bg-white/40 px-4 py-6 text-center">
      <div className="text-sm font-medium text-slate-800">កំពុងទាញយក…</div>
      <div className="mt-1 text-xs text-slate-500">សូមរង់ចាំបន្តិច</div>
    </div>
  );
}
