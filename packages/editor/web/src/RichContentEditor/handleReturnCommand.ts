import type { EditorProps } from '@wix/draft-js';
import type { Pubsub } from 'wix-rich-content-common';
import {
  getAnchorBlockData,
  RichUtils,
  Modifier,
  EditorState,
  KeyBindingUtil,
} from 'wix-rich-content-editor-common';

const HANDLED = 'handled';
const NOT_HANDLED = 'not-handled';
const SPLIT_BLOCK = 'split-block';

export default (
    updateEditorState: (editorState: EditorState) => void,
    pubsub: Pubsub
  ): EditorProps['handleReturn'] =>
  (command, editorState) => {
    if (KeyBindingUtil.isSoftNewlineEvent(command)) {
      const newState = RichUtils.insertSoftNewline(editorState);
      updateEditorState(newState);
      return HANDLED;
    }

    const { dynamicStyles, textAlignment } = getAnchorBlockData(editorState);

    if (dynamicStyles || textAlignment) {
      const styles = Object.assign(
        {},
        dynamicStyles ? { dynamicStyles } : undefined,
        textAlignment ? { textAlignment } : undefined
      );

      const newState = splitState(editorState, styles);
      pubsub.set('editorState', newState);
      updateEditorState(newState);
      return HANDLED;
    }
    return NOT_HANDLED;
  };

const splitState = (editorState: EditorState, styles) => {
  const splitContentState = Modifier.splitBlock(
    editorState.getCurrentContent(),
    editorState.getSelection()
  );
  const contentStateWithStyles = Modifier.mergeBlockData(
    splitContentState,
    splitContentState.getSelectionAfter(),
    styles
  );
  return EditorState.push(editorState, contentStateWithStyles, SPLIT_BLOCK);
};
