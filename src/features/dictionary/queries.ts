import { useQuery } from "@tanstack/react-query";
import { fetchWordsMock, fetchWordByIdMock } from "./api.mock";
import { wordKeys } from "./keys";
import { useEffect, useState } from "react";

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
    queryKey: wordKeys.list(dq, page, pageSize),
    queryFn: () => fetchWordsMock(dq, page, pageSize),
    enabled: dq.trim().length > 0,
    placeholderData: (previousData) => previousData,
    staleTime: 60_000,
  });
}

export function useWordDetail(id: string | null) {
  return useQuery({
    queryKey: id ? wordKeys.detail(id) : ["noop"],
    queryFn: () => fetchWordByIdMock(id!),
    enabled: !!id,
    staleTime: 5 * 60_000,
  });
}
