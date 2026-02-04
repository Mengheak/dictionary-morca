
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { fetchWordsPage, fetchWordDetails, searchWords } from "../../lib/api";

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

export function useInfiniteWords(params?: { q?: string; limit?: number }) {
  const q = params?.q ?? "";
  const limit = params?.limit ?? 20;

  return useInfiniteQuery({
    queryKey: ["dictionary-words", q, limit],

    queryFn: ({ pageParam }) =>
      fetchWordsPage({
        pageParam: pageParam as number,
        limit,
        q,
      }),

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      const page = lastPage.data;

      if (page.current_page < page.last_page) {
        return page.current_page + 1;
      }
      return undefined;
    },

    staleTime: 5 * 60_000,
  });
}

export function useWordDetails(id: string | null) {
  return useQuery({
    queryKey: ["word-details", id],
    queryFn: () => fetchWordDetails(id!),
    enabled: !!id,             
    staleTime: 5 * 60_000, 
    select: (res) => res.data, 
  });
}