import type { Pubsub } from 'wix-rich-content-common';

/**
  createExternalToolbarPlugin
  registers draft-plugins-editor lifecycle events for usage in externalized button props
* */

export default (commonPubsub: Pubsub) => ({
  initialize: ({ getEditorState, setEditorState }) => {
    commonPubsub.set('getEditorState', getEditorState);
    commonPubsub.set('setEditorState', setEditorState);
  },
  onChange: editorState => {
    commonPubsub.set('selection', editorState.getSelection());
    return editorState;
  },
});
