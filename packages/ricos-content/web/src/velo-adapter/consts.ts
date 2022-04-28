import type { RichContent } from 'ricos-schema';

export const emptyContent: RichContent = { nodes: [] };
export const applyContent: (content: RichContent) => <T>(params: Exclude<T, { content }>) => T =
  content => params => ({
    ...params,
    content,
  });
