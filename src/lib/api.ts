// src/lib/api.ts
export interface RelatedWord {
  term: string;
  partOfSpeech: string;
  meaning: string;
}

export interface Word {
  id: string;
  term: string;
  phonetic: string;
  part_of_speech: string;
  meaning: string;
  category: string;
  sing_khmer: string;
  examples: string[];
  synonyms: string[];
  related_words: RelatedWord[];
  royal_voc: string | null;
  audio_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface PaginatedResponse<T> {
  current_page: number;
  data: T;

  first_page_url: string;
  from: number | null;

  last_page: number;
  last_page_url: string;

  next_page_url: string | null;
  path: string;

  per_page: number;

  prev_page_url: string | null;
  to: number | null;

  total: number;
}



export interface SearchResponse {
  message: string;
  data: Word[];
}

export interface WordDetail {
  id: string;
  term: string;
  phonetic: string;
  part_of_speech: string;
  meaning: string;
  category: string;
  sing_khmer: string;
  examples: string[];
  synonyms: string[];
  related_words: RelatedWord[];
  royal_voc: string | null;
  audio_url: string;
  created_at: string;
  updated_at: string;
}
export type BaseResponse<T> = {
  message: string
  data: T
}
export interface WordDetailResponse {
  message: string;
  data: WordDetail;
}
type FetchWordsParams = {
  pageParam?: number;
  limit?: number;
  q?: string;
};

export const BASE_URL = import.meta.env.VITE_BASE_URL

export async function searchWords(q: string): Promise<SearchResponse> {
  const res = await fetch(
    `${BASE_URL}/dictionary/search?q=${encodeURIComponent(q)}`
  );
  if (!res.ok) throw new Error("Failed to fetch search results");
  return res.json() as Promise<SearchResponse>;
}

export async function fetchWordsPage({
  pageParam = 1,
  limit = 20,
  q,
}: FetchWordsParams): Promise<BaseResponse<PaginatedResponse<Word[]>>> {
  const url = new URL(BASE_URL + "/dictionary");

  url.searchParams.set("page", String(pageParam));
  url.searchParams.set("limit", String(limit));
  if (q && q.trim()) {
    url.searchParams.set("q", q.trim());
  }

  const res = await fetch(url.toString());

  if (!res.ok) {
    throw new Error("Failed to fetch words");
  }

  return res.json();
}





export async function fetchWordDetails(
  id: string
): Promise<WordDetailResponse> {
  const res = await fetch(`${BASE_URL}/dictionary/${id}`);
  if (!res.ok) throw new Error("Failed to fetch word details");
  return res.json() as Promise<WordDetailResponse>;
}
