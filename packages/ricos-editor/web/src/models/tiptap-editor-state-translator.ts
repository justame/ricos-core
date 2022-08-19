import type { Editor, JSONContent } from '@tiptap/react';

export interface ITiptapEditorStateTranslator {
  onChange(editor: Editor): void;
  getTiptapContent(): JSONContent;
  getSelectedNodesKeys(): string[];
  setNodes(nodes: JSONContent[]): void;
}
