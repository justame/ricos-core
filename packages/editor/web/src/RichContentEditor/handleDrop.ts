import type { DraftHandleValue } from '@wix/draft-js';
import type { EditorPlugin } from 'draft-js-plugins-editor';

type DropHandler = Required<EditorPlugin>['handleDrop'];

export default (handleDrop: DropHandler): DropHandler =>
  (selection, dataTransfer, isInternal, pluginFunctions): DraftHandleValue => {
    const editorState = pluginFunctions.getEditorState();
    const contentState = editorState.getCurrentContent();
    const firstKey = contentState.getFirstBlock().getKey();

    if (selection.getAnchorKey() === firstKey && selection.getAnchorOffset() === 0) {
      return 'not-handled';
    }

    return handleDrop(selection, dataTransfer, isInternal, pluginFunctions);
  };
