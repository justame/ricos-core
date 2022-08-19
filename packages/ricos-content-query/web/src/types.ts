import type { Editor } from '@tiptap/core';
import type { extract } from 'ricos-content/libs/extract';

export interface ContentQueryService {
  getContentExtractor: () => ReturnType<typeof extract>;
  setEditor: (editor: Editor) => void;
}
