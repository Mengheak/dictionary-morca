// src/features/dictionary/queries.ts
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { fetchAllWords, fetchWordDetails, searchWords } from "../../lib/api";

function useDebounced<T>(value: T, delay = 300) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return v;
}

export function useWordList(q: string, page: number, pageSize: number) {
  const dq = useDebounced(q, 300);

  return useQuery({
    queryKey: ["dictionary-search", dq, page, pageSize],
    queryFn: () => searchWords(dq),
    enabled: dq.trim().length > 0,
    placeholderData: (previousData) => previousData,
    staleTime: 60_000,
    select: (res) => {
      const items = res.data || [];
      return {
        items,
        total: items.length,
      };
    },
  });
}

export function useAllWords() {
  return useQuery({
    queryKey: ["all-words"], 
    queryFn: fetchAllWords, 
    staleTime: 5 * 60_000, 
    select: (res) => res, 
  });
}
export function useWordDetails(id: string | null) {
  return useQuery({
    queryKey: ["word-details", id],
    queryFn: () => fetchWordDetails(id!),
    enabled: !!id,             // only run when an ID exists
    staleTime: 5 * 60_000,     // cache fresh for 5 minutes
    select: (res) => res.data, // extract the data object directly
  });
}