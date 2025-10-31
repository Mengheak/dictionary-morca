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
  audio_url: string;
  created_at: string;
  updated_at: string;
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
  audio_url: string;
  created_at: string;
  updated_at: string;
}

export interface WordDetailResponse {
  message: string;
  data: WordDetail;
}

export const BASE_URL = import.meta.env.VITE_BASE_URL

export async function searchWords(q: string): Promise<SearchResponse> {
  const res = await fetch(
    `${BASE_URL}/dictionary/search?q=${encodeURIComponent(q)}`
  );
  if (!res.ok) throw new Error("Failed to fetch search results");
  return res.json() as Promise<SearchResponse>;
}
export async function fetchAllWords() {
  const res = await fetch(BASE_URL + "/dictionary");
  if (!res.ok) throw new Error("Failed to fetch all words");
  return res.json() as Promise<Word[]>;
}
export async function fetchWordDetails(
  id: string
): Promise<WordDetailResponse> {
  const res = await fetch(`${BASE_URL}/dictionary/${id}`);
  if (!res.ok) throw new Error("Failed to fetch word details");
  return res.json() as Promise<WordDetailResponse>;
}
