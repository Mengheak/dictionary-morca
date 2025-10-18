import { repoSearchWords, repoGetWord, type Word, getAllWord } from "../../mock/db";

export type WordListResponse = { items: Word[]; total: number };

export async function fetchWordsMock(
  q: string,
  page: number,
  pageSize: number
): Promise<WordListResponse> {
  return repoSearchWords(q, page, pageSize);
}

export async function fetchWordByIdMock(id: string) {
  return repoGetWord(id);
}

export async function fetchAllWords() {
  return getAllWord()
}