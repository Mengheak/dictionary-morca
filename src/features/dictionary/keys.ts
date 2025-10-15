export const wordKeys = {
  all: ['words'] as const,
  list: (q: string, page: number, pageSize: number) =>
    [...wordKeys.all, 'list', { q, page, pageSize }] as const,
  detail: (id: string) => [...wordKeys.all, 'detail', id] as const,
};
