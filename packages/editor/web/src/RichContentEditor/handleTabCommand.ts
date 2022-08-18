/* eslint-disable no-restricted-globals */
import type { CommandHandler } from 'wix-rich-content-common';
import type { EditorState } from 'wix-rich-content-editor-common';
import {
  insertString,
  deleteCharacterBeforeCursor,
  isTypeText,
  CHARACTERS,
  getCharacterBeforeSelection,
} from 'wix-rich-content-editor-common';

const isCodeBlock = (blockType: string) => blockType === 'code-block';

const handleTabOnText = (editorState: EditorState): EditorState | undefined => {
  let newState: EditorState | undefined;
  const selectionState = editorState.getSelection();

  if (selectionState.isCollapsed()) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: deprecated
    if (!event.shiftKey) {
      newState = insertString(editorState, CHARACTERS.TAB);
    } else {
      const character = getCharacterBeforeSelection(editorState);
      if (character === '\t') {
        newState = deleteCharacterBeforeCursor(editorState);
      }
    }
  }
  return newState;
};

export default (
  editorState: EditorState,
  blockType: string,
  customHandlers: Record<string, CommandHandler>,
  command: string
) => {
  let newState: EditorState | null = null;
  if (isTypeText(blockType)) {
    newState = handleTabOnText(editorState) || null;
  } else if (!isCodeBlock(blockType)) {
    newState = customHandlers[command](editorState) || null;
  }
  return newState;
};
