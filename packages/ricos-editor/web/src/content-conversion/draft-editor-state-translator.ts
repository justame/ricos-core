import type { ContentState } from 'draft-js';
import { EditorState } from 'draft-js';
import type { DraftContent } from 'ricos-content';
import { convertFromRaw } from 'wix-rich-content-editor/libs/editorStateConversion';
import { getSelectedBlocks } from 'wix-rich-content-editor-common';
import type { IDraftEditorStateTranslator } from '../models/draft-editor-state-translator';

export class DraftEditorStateTranslator implements IDraftEditorStateTranslator {
  private _draftContent!: DraftContent;

  private _editorState!: EditorState;

  setEditorState!: IDraftEditorStateTranslator['setEditorState'];

  onChange: IDraftEditorStateTranslator['onChange'] = (draftContent, editorState) => {
    this._editorState = editorState;
    this._draftContent = draftContent;
  };

  getDraftContent: IDraftEditorStateTranslator['getDraftContent'] = () => {
    return this._draftContent;
  };

  getSelectedBlocksKeys: IDraftEditorStateTranslator['getSelectedBlocksKeys'] = () => {
    const selectedBlocks = getSelectedBlocks(this._editorState);
    return selectedBlocks.map(block => block.getKey());
  };

  setBlocks: IDraftEditorStateTranslator['setBlocks'] = blocks => {
    const currContentState = convertFromRaw(blocks) as ContentState;
    const newBlockMap = currContentState.getBlockMap();
    const contentState = this._editorState.getCurrentContent();
    const selection = this._editorState.getSelection();
    const blockMap = contentState.getBlockMap().merge(newBlockMap);
    const newContentState = contentState.merge({
      blockMap,
    }) as ContentState;
    const newEditorState = EditorState.push(
      this._editorState,
      newContentState,
      'change-block-data'
    );
    this.setEditorState(EditorState.forceSelection(newEditorState, selection));
  };
}
