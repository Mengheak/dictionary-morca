"use client";
import { useMemo } from "react";
import { useStore } from "../../../lib/store";
import { useAllWord } from "../queries";

export default function FavoritePage() {
  const favoriteIds = useStore((s) => s.favoriteIds);
  const toggleFavorite = useStore((s) => s.toggleFavorite);
const setQuery = useStore(s => s.setQuery)
  const allWords = useAllWord().data

  const favWords = useMemo(
    () => allWords?.filter((w) => favoriteIds.includes(w.id)),
    [allWords, favoriteIds]
  );

  if (favoriteIds.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center p-4">
        <div className="text-center space-y-6 max-w-md">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-amber-100 to-orange-100 text-amber-600">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 17.27 18.18 21 16.54 13.97 22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">មិនទាន់មានពាក្យដែលអ្នកបានចូលចិត្តទេ</h2>
            <p className="text-slate-600">
              ចុចផ្កាយ ⭐ នៅពាក្យណាដែលអ្នកចង់រក្សាទុក។
            </p>
          </div>
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-amber-200/50 text-sm text-slate-600">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-amber-500">
              <path d="M12 17.27 18.18 21 16.54 13.97 22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
            Start bookmarking your favorite words
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="sticky top-0 z-20 mb-8 bg-white/70 backdrop-blur-xl rounded-2xl border border-slate-200/50 shadow-lg p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="inline-flex items-center gap-3 text-xl sm:text-2xl font-bold">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 text-amber-600">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 17.27 18.18 21 16.54 13.97 22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                </span>
                <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  ពាក្យដែលអ្នកចូលចិត្ត
                </span>
              </h1>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-50 to-orange-50 px-4 py-2 rounded-xl border border-amber-200/60">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-amber-500">
                  <path d="M12 17.27 18.18 21 16.54 13.97 22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
                <span className="font-bold text-lg text-amber-900">{favoriteIds.length}</span>
                <span className="text-sm text-amber-700 font-medium">ពាក្យ</span>
              </div>
            </div>
          </div>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {favWords?.map((w) => (
            <li
              key={w.id}
              className="group relative rounded-xl border border-slate-200/60 bg-white/80 backdrop-blur-sm hover:border-amber-300/60 hover:shadow-xl hover:shadow-amber-500/15 transition-all duration-300 overflow-hidden"
            onClick={() => setQuery(w.term)}
           >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-50/0 to-orange-50/0 group-hover:from-amber-50/60 group-hover:to-orange-50/60 transition-all duration-300 pointer-events-none"></div>

              <div className="relative p-5 space-y-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-start gap-2 mb-2">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors break-words">
                      {w.term}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                    {w.meaning}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    onClick={() => toggleFavorite(w.id)}
                    className="flex items-center justify-center w-9 h-9 rounded-lg bg-amber-50 text-amber-500 border border-amber-200/60 hover:bg-amber-100 hover:border-amber-300 active:scale-95 transition-all shadow-sm"
                    aria-label="Remove from favorites"
                    title="Remove from favorites"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 17.27 18.18 21 16.54 13.97 22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Stats footer */}
        <div className="mt-12 text-center">
          <p className="text-sm text-slate-500">
            You have <span className="font-semibold text-amber-600">{favoriteIds.length}</span> bookmarked word{favoriteIds.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>
    </div>
  );
}