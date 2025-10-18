import { useMemo, useState } from "react";
import { useStore } from "../../../lib/store";

function formatDate(d: Date) {
    return d.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

function formatTime(d: Date) {
    return d.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
    });
}

type SortMode = "recent" | "alpha";

export default function HistoryPage() {
    const history = useStore((s) => s.history);
    const favoriteIds = useStore((s) => s.favoriteIds);
    const toggleFavorite = useStore((s) => s.toggleFavorite);
    const setQuery = useStore(s => s.setQuery)
    const [q, setQ] = useState("");
    const [sort, setSort] = useState<SortMode>("recent");

    const filtered = useMemo(() => {
        const base = q.trim()
            ? history.filter((h) =>
                h.term.toLowerCase().includes(q.trim().toLowerCase())
            )
            : history;

        if (sort === "alpha") {
            return [...base].sort((a, b) => a.term.localeCompare(b.term, undefined, { sensitivity: "base" }));
        }
        return [...base].sort((a, b) => b.viewedAt - a.viewedAt);
    }, [history, q, sort]);

    const sections = useMemo(() => {
        const map = new Map<string, typeof filtered>();
        for (const item of filtered) {
            const key = formatDate(new Date(item.viewedAt));
            if (!map.has(key)) map.set(key, []);
            map.get(key)!.push(item);
        }
        return Array.from(map.entries());
    }, [filtered]);

    const clearAll = () =>
        useStore.setState((s) => ({ ...s, history: [] }));

    const removeOne = (id: string) =>
        useStore.setState((s) => ({ ...s, history: s.history.filter((x) => x.id !== id) }));

    return (
        <div className="min-h-screen">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8">
                <div className="sticky top-0 z-20 mb-8 bg-white/70 backdrop-blur-xl rounded-2xl border border-slate-200/50 shadow-lg p-5">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <h1 className="inline-flex flex-wrap items-center gap-2 text-xl text-yellow-700 sm:text-2xl font-bold">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="28"
                                height="28"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="rgb(161 98 7 / 1)"
                                strokeWidth="2"
                                className="shrink-0"
                                aria-hidden="true"
                            >
                                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
                                <path d="M8 11h8" />
                                <path d="M8 7h6" />
                            </svg>

                            <span>
                                ប្រវត្តិរបស់អ្នក
                            </span>
                        </h1>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <div className="relative flex-1 sm:flex-none">
                                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    value={q}
                                    onChange={(e) => setQ(e.target.value)}
                                    placeholder="ស្វែងរក..."
                                    className="w-full sm:w-56 pl-10 pr-10 py-2.5 rounded-lg border border-slate-200 bg-white text-sm shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                                />
                                {q && (
                                    <button
                                        onClick={() => setQ("")}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 transition-colors"
                                        aria-label="Clear"
                                    >
                                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                        </svg>
                                    </button>
                                )}
                            </div>

                            <select
                                value={sort}
                                onChange={(e) => setSort(e.target.value as SortMode)}
                                className="px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-sm font-medium shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer hover:border-slate-300"
                            >
                                <option value="recent">ថ្មីៗ</option>
                                <option value="alpha">លំដាប់</option>
                            </select>

                            <button
                                onClick={clearAll}
                                className="px-4 py-2.5 rounded-lg border-2 border-red-200 bg-white text-sm flex items-center justify-center gap-1 font-medium text-red-600 hover:bg-red-50 hover:border-red-300 active:scale-95 shadow-sm transition-all"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-trash2-icon lucide-trash-2"><path d="M10 11v6" /><path d="M14 11v6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /><path d="M3 6h18" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                                សម្អាត
                            </button>
                        </div>
                    </div>
                </div>

                {history.length === 0 ? (
                    <EmptyState />
                ) : filtered.length === 0 ? (
                    <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-white/50 p-12 text-center">
                        <div className="text-6xl mb-3">🔎</div>
                        <p className="text-slate-600 font-medium">
                            រកមិនឃើញសម្រាប់ <span className="text-blue-600">"{q}"</span>
                        </p>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {sections.map(([dateLabel, items]) => (
                            <section key={dateLabel}>
                                <div className="flex items-center gap-3 mb-4">
                                    <h2 className="text-sm font-bold tracking-widest text-slate-700 uppercase">
                                        {dateLabel}
                                    </h2>
                                    <div className="flex-1 h-px bg-gradient-to-r from-slate-300 to-transparent"></div>
                                    <span className="text-xs font-semibold text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200">
                                        {items.length}
                                    </span>
                                </div>

                                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {items.map((h) => {
                                        const d = new Date(h.viewedAt);
                                        const isFav = favoriteIds.includes(h.id);
                                        return (
                                            <li
                                                key={`${h.id}-${h.viewedAt}`}
                                                className="group relative rounded-xl border border-slate-200/60 bg-white/80 backdrop-blur-sm hover:border-blue-300/60 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 overflow-hidden"
                                                onClick={() => setQuery(h.term)}
                                            >
                                                {/* Background glow effect */}
                                                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-indigo-50/0 group-hover:from-blue-50/50 group-hover:to-indigo-50/50 transition-all duration-300 pointer-events-none"></div>

                                                <div className="relative p-4 space-y-3">
                                                    {/* Top section: Icon and term */}
                                                    <div className="flex items-start gap-3">
                                                        <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600 group-hover:shadow-md transition-all">
                                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                                <circle cx="12" cy="12" r="4" />
                                                                <path d="M3.05 13A9 9 0 1 1 11 2.05" />
                                                            </svg>
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <h3 className="truncate text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                                                                {h.term}
                                                            </h3>
                                                            <p className="text-xs text-slate-500 mt-1">
                                                                បានមើលនៅ <span className="font-semibold text-slate-600">{formatTime(d)}</span>
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Favorite badge */}
                                                    {isFav && (
                                                        <div className="flex items-center gap-1.5 w-fit rounded-full bg-gradient-to-r from-amber-50 to-orange-50 px-3 py-1 border border-amber-200/50">
                                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-amber-500">
                                                                <path d="M12 17.27 18.18 21 16.54 13.97 22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z" />
                                                            </svg>
                                                            <span className="text-xs font-semibold text-amber-700">Favorite</span>
                                                        </div>
                                                    )}

                                                    {/* Action buttons */}
                                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                        <button
                                                            onClick={() => toggleFavorite(h.id)}
                                                            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg font-medium text-sm transition-all ${isFav
                                                                ? 'bg-amber-50 text-amber-600 border border-amber-200/60 hover:bg-amber-100'
                                                                : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200'
                                                                }`}
                                                            title={isFav ? "Remove from favorites" : "Add to favorites"}
                                                        >
                                                            {isFav ? (
                                                                <>
                                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                                                        <path d="M12 17.27 18.18 21 16.54 13.97 22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z" />
                                                                    </svg>
                                                                    បានចូលចិត្ត
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                        <path d="m12 17 5 3-1.5-5.5L20 10l-5.5-.5L12 4 9.5 9.5 4 10l4.5 4.5L7 20l5-3z" />
                                                                    </svg>
                                                                    ចូលចិត្ត
                                                                </>
                                                            )}
                                                        </button>
                                                        <button
                                                            onClick={() => removeOne(h.id)}
                                                            className="flex items-center justify-center p-2 rounded-lg bg-red-50 text-red-600 border border-red-200/60 hover:bg-red-100 transition-all"
                                                            title="Remove from history"
                                                            aria-label="Remove"
                                                        >
                                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                <path d="M3 6h18" />
                                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                                                                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                                                <path d="M10 11v6M14 11v6" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </section>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function EmptyState() {
    return (
        <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-white/50 backdrop-blur-sm p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600 mb-4">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M8 6h13M8 12h13M8 18h13" />
                    <path d="M3 6h.01M3 12h.01M3 18h.01" />
                </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">មិនទាន់មានប្រវត្តិទេ</h3>
            <p className="text-sm text-slate-600 max-w-xs mx-auto">
                ស្វែងរកពាក្យនិងចុចមើល ដើម្បីអោយបង្ហាញនៅទីនេះ
            </p>
        </div>
    );
}