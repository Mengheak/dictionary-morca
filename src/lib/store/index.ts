import type { MouseEventHandler } from "react";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type HistoryItem = { id: string; term: string; viewedAt: number };

type Store = {
  query: string;
  page: number;
  pageSize: number;
  selectedWordId: string | null;
  isDetailsOpen: boolean;
  isShowHeader: boolean;
  history: HistoryItem[];
  favoriteIds: string[];

  setQuery: (q: string) => void;
  setPage: (p: number) => void;
  setPageSize: (n: number) => void;
  setSelectedWordId: (id: string | null) => void;
  openDetails: () => void;
  closeDetails: () => void;
  pushHistory: (h: HistoryItem) => void;
  hideHeader: MouseEventHandler<HTMLButtonElement>
  showHeader: MouseEventHandler<HTMLButtonElement>
  toggleFavorite: (id: string) => void;
};

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      query: "",
      page: 1,
      pageSize: 5,
      selectedWordId: null,
      isDetailsOpen: false,
      isShowHeader: true,
      history: [],
      favoriteIds: [],

      setQuery: (q) => set({ query: q, page: 1 }),
      setPage: (p) => set({ page: p }),
      setPageSize: (n) => set({ pageSize: n, page: 1 }),
      setSelectedWordId: (id) => set({ selectedWordId: id }),
      openDetails: () => set({ isDetailsOpen: true }),
      closeDetails: () => set({ isDetailsOpen: false }),
      hideHeader: () => set({ isShowHeader: false }),
      showHeader: () => set({isShowHeader: true}),
      pushHistory: (h) => set({ history: [h, ...get().history].slice(0, 100) }),
      toggleFavorite: (id) => {
        const has = get().favoriteIds.includes(id);
        set({
          favoriteIds: has
            ? get().favoriteIds.filter((x) => x !== id)
            : [id, ...get().favoriteIds],
        });
      },
    }),
    {
      name: "dictionary-ui",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        pageSize: s.pageSize,
        history: s.history,
        favoriteIds: s.favoriteIds,
      }),
    }
  )
);
