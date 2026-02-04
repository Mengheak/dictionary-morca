import {useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

export type DictionaryTab = "all" | "favorites" | "history";

function isTab(x: string | null): x is DictionaryTab {
  return x === "all" || x === "favorites" || x === "history";
}

export function useDictionaryUrlState() {
  const [params, setParams] = useSearchParams();

  const state = useMemo(() => {
    const q = params.get("q") ?? "";
    const id = params.get("id"); // string | null
    const tabRaw = params.get("tab");
    const tab: DictionaryTab = isTab(tabRaw) ? tabRaw : "all";
    return { q, id, tab };
  }, [params]);

  const patchParams = useCallback(
    (patch: Partial<{ q: string; id: string | null; tab: DictionaryTab }>) => {
      const next = new URLSearchParams(params);

      if (patch.q !== undefined) {
        const v = patch.q.trim();
        if (v) next.set("q", v);
        else next.delete("q");
      }

      if (patch.id !== undefined) {
        if (patch.id) next.set("id", patch.id);
        else next.delete("id");
      }

      if (patch.tab !== undefined) {
        next.set("tab", patch.tab);
      }

      setParams(next, { replace: true });
    },
    [params, setParams]
  );

  const setQuery = useCallback((q: string) => patchParams({ q }), [patchParams]);
  const setSelectedId = useCallback((id: string | null) => patchParams({ id }), [patchParams]);
  const setTab = useCallback((tab: DictionaryTab) => patchParams({ tab }), [patchParams]);

  const selectWord = useCallback(
    (id: string, term?: string) => {
      patchParams({
        id,
        q: term ?? state.q,
        tab: state.tab, // keep current tab
      });
    },
    [patchParams, state.q, state.tab]
  );

  return { state, setQuery, setSelectedId, setTab, selectWord };
}
