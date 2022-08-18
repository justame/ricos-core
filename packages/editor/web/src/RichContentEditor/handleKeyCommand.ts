/* eslint-disable complexity */
/* eslint-disable no-restricted-globals */
import type { DraftHandleValue, EditorProps } from '@wix/draft-js';
import type { CommandHandler, OnKeyboardShortcutClick } from 'wix-rich-content-common';
import type { EditorState } from 'wix-rich-content-editor-common';
import { COMMANDS, mergeBlockData, RichUtils } from 'wix-rich-content-editor-common';
import handleBackspaceCommand from './handleBackspaceCommand';
import handleDeleteCommand from './handleDeleteCommand';
import handleTabCommand from './handleTabCommand';
import { setFontSize, getFontSize } from './utils/editorCommandsUtils';

const isTab = (command: string) => command === COMMANDS.TAB || command === COMMANDS.SHIFT_TAB;

const isUndoRedo = (command: string) => command === COMMANDS.UNDO || command === COMMANDS.REDO;

const getFontSizeValue = (editorState: EditorState) => {
  const fontSize = getFontSize(editorState).split('p');
  return fontSize.length > 1 ? parseInt(fontSize[0]) : null;
};

const incrementFontSize = (editorState: EditorState) => {
  const fontSize = getFontSizeValue(editorState);
  return fontSize ? setFontSize(editorState, { fontSize: (fontSize + 1).toString() }) : editorState;
};

const decrementFontSize = (editorState: EditorState) => {
  const fontSize = getFontSizeValue(editorState);
  return fontSize ? setFontSize(editorState, { fontSize: (fontSize - 1).toString() }) : editorState;
};

export default (
    updateEditorState: (editorState: EditorState) => void,
    customHandlers: Record<string, CommandHandler>,
    blockType: string,
    onKeyboardShortcutClick: OnKeyboardShortcutClick,
    onBackspace?: (editorState: EditorState) => void
  ): EditorProps['handleKeyCommand'] =>
  (command, editorState) => {
    let newState: EditorState | null;

    if (customHandlers[command]) {
      if (isTab(command)) {
        newState = handleTabCommand(editorState, blockType, customHandlers, command);
      } else if (isUndoRedo(command)) {
        onKeyboardShortcutClick({ buttonName: command });
        // TODO: handleUndoCommand and handleRedoCommand return a DraftHandleValue, they should behave like any other CommandHandler (their updateEditorState should move here)
        return customHandlers[command](editorState, event) as unknown as DraftHandleValue;
      } else {
        newState = customHandlers[command](editorState, event) || null;
      }
    } else {
      switch (command) {
        case COMMANDS.ALIGN_RIGHT:
        case COMMANDS.ALIGN_LEFT:
        case COMMANDS.ALIGN_CENTER:
        case COMMANDS.JUSTIFY:
          onKeyboardShortcutClick({ buttonName: command });
          newState = mergeBlockData(editorState, { textAlignment: command });
          break;
        case COMMANDS.TITLE:
        case COMMANDS.SUBTITLE:
        case COMMANDS.PARAGRAPH:
        case COMMANDS.H1:
        case COMMANDS.H2:
        case COMMANDS.H3:
        case COMMANDS.H4:
        case COMMANDS.H5:
        case COMMANDS.H6:
        case COMMANDS.NUMBERED_LIST:
        case COMMANDS.BULLETED_LIST:
        case COMMANDS.BLOCKQUOTE:
        case COMMANDS.CODE:
          onKeyboardShortcutClick({ buttonName: command });
          newState = RichUtils.toggleBlockType(editorState, command);
          break;
        case COMMANDS.BACKSPACE:
          onBackspace?.(editorState);
          newState = handleBackspaceCommand(editorState);
          break;
        case COMMANDS.DELETE:
          newState = handleDeleteCommand(editorState);
          break;
        case COMMANDS.INCREASE_FONT_SIZE:
          newState = incrementFontSize(editorState);
          break;
        case COMMANDS.DECREASE_FONT_SIZE:
          newState = decrementFontSize(editorState);
          break;
        default:
          newState = RichUtils.handleKeyCommand(editorState, command);
          onKeyboardShortcutClick({ buttonName: command });
          break;
      }
    }

    if (newState) {
      updateEditorState(newState);
      return 'handled';
    }

    return 'not-handled';
  };
