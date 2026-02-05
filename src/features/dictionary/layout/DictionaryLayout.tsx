"use client";

import { useEffect, useMemo, useState } from "react";
import { useStore } from "../../../lib/store";
import { useInfiniteWords, useWordDetails, useWordList } from "../queries";
import { useDictionaryUrlState, type DictionaryTab } from "../hooks/useDictionaryUrlState";
import DictionarySidebar from "../components/Sidebar/DictionarySidebar";
import DictionaryDetails from "../components/Details/DictionaryDetails";
import type { Word, WordDetail } from "../../../lib/api";

export default function DictionaryLayout() {
  const { state: url, setQuery: setUrlQuery, setSelectedId: setUrlId, setTab: setUrlTab } =
    useDictionaryUrlState();



  const query = useStore((s) => s.query);
  const setQuery = useStore((s) => s.setQuery);

  // const searchedWord = useWordList(query, 1, 20).data?.items;
  const {data: searchedResponse, isFetching: isSearching} = useWordList(query, 1, 20);


  const selectedWordId = useStore((s) => s.selectedWordId);
  const setSelectedWordId = useStore((s) => s.setSelectedWordId);

  const isDetailsOpen = useStore((s) => s.isDetailsOpen);
  const openDetails = useStore((s) => s.openDetails);
  const closeDetails = useStore((s) => s.closeDetails);

  const favoriteIds = useStore((s) => s.favoriteIds);
  const toggleFavorite = useStore((s) => s.toggleFavorite);

  const history = useStore((s) => s.history);
  const pushHistory = useStore((s) => s.pushHistory);

  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if ((url.q ?? "") !== (query ?? "")) setQuery(url.q ?? "");

    const idFromUrl = url.id ?? null;
    if (idFromUrl !== (selectedWordId ?? null)) {
      setSelectedWordId(idFromUrl);
      if (idFromUrl) openDetails();
      else closeDetails();
    }
  }, [url.q, url.id, closeDetails, openDetails, query, selectedWordId, setQuery, setSelectedWordId]);

  const tab: DictionaryTab = url.tab;

  const infinite = useInfiniteWords({ q: query, limit: 20 });

  const allWords: Word[] = useMemo(() => {
    return infinite.data?.pages.flatMap((page) => page.data.data) ?? [];
  }, [infinite.data]);


  const filteredWords: Word[] = useMemo(() => {
    if(query) return searchedResponse?.items;
    return allWords;
  }, [allWords, query, searchedResponse?.items]) as Word[];


  const allTotal = filteredWords?.length ?? 0;

  const { data: word, isLoading: detailsLoading } = useWordDetails(selectedWordId || "");

  useEffect(() => {
    if (word) pushHistory({ id: word.id, term: word.term, viewedAt: Date.now() });
  }, [word, pushHistory]);

  const filteredFavorites = useMemo(() => {
    const set = new Set(favoriteIds);
    const favs = allWords.filter((w) => set.has(w.id));
    return favs;
  }, [allWords, favoriteIds]);

  const filteredHistory = useMemo(() => {
    const q = (query ?? "").trim().toLowerCase();
    const base = q ? history.filter((h) => h.term.toLowerCase().includes(q)) : history;
    return [...base].sort((a, b) => b.viewedAt - a.viewedAt);
  }, [history, query]);

  const onSearchChange = (value: string) => {
    setQuery(value);
    setUrlQuery(value);
  };

  const onTabChange = (t: DictionaryTab) => {
    setUrlTab(t);
  };

  const onPickWord = (id: string) => {
    setSelectedWordId(id);
    openDetails();
    setUrlId(id);
    setMobileOpen(false);
  };

  const onCloseDetails = () => {
    closeDetails();
    setSelectedWordId(null);
    setUrlId(null);
  };

  return (
    <section className="h-screen overflow-hidden bg-[rgb(var(--card))]">
      <div className="md:grid h-full overflow-hidden grid-cols-1 md:grid-cols-[360px_1fr]">
        <DictionarySidebar
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
          tab={tab}
          onTabChange={onTabChange}
          query={query}
          onSearchChange={onSearchChange}
          allCount={allTotal}
          favoritesCount={favoriteIds.length}
          historyCount={history.length} 
          selectedWordId={selectedWordId}
          favoriteIds={favoriteIds}
          listAll={filteredWords}                 
          listFavorites={filteredFavorites} 
          listHistory={filteredHistory}
          isSearching={isSearching}
          onPickWord={onPickWord}
          fetchNextPage={infinite.fetchNextPage}
          hasNextPage={query ? false :!!infinite.hasNextPage}
          isFetchingNextPage={infinite.isFetchingNextPage}
          isLoading={infinite.isLoading}
        />

        <main className="min-h-0 overflow-hidden">
          <DictionaryDetails
            isOpen={isDetailsOpen}
            isLoading={detailsLoading}
            word={word as WordDetail}
            isFav={word ? favoriteIds.includes(word.id) : false}
            onToggleFavorite={() => word && toggleFavorite(word.id)}
            onClose={onCloseDetails}
            onClickSynonym={(s: string) => onSearchChange(s)}
          />
        </main>
      </div>
    </section>
  );
}
