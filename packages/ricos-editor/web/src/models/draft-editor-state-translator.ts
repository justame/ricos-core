import type { EditorState } from 'draft-js';
import type { DraftContent } from 'ricos-content';

export interface IDraftEditorStateTranslator {
  onChange(content: DraftContent, editorState: EditorState): void;
  getDraftContent(): DraftContent;
  getSelectedBlocksKeys(): string[];
  setBlocks(blocks: DraftContent): void;
  setEditorState(editorState: EditorState): void;
}
