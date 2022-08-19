import type { RawCommands } from '@tiptap/core';
import type { JSONContent } from '@tiptap/react';
import { NodeSelection } from 'prosemirror-state';
import { findNodeById } from '../helpers';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    replaceNode: {
      /**
       * Update node attributes by node id.
       */
      replaceNode: (node: JSONContent) => ReturnType;
    };
  }
}

export const replaceNode: RawCommands['replaceNode'] =
  node =>
  ({ tr, editor, commands }) => {
    const id = node?.attrs?.id;
    const nodesWithPos = findNodeById(tr, id);
    if (nodesWithPos.length > 0) {
      const { pos } = nodesWithPos[0];
      const { from, to } = NodeSelection.create(editor.view.state.doc, pos);
      return commands.insertContentAt({ from, to }, node, {
        updateSelection: false,
      });
    } else {
      console.error('Failed to find node by id');
      return false;
    }
  };
