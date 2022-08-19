import type { RawCommands } from '@tiptap/core';
import { findNodeById } from '../helpers';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    updateNodeAttrsById: {
      /**
       * Update node attributes by node id.
       */
      updateNodeAttrsById: (id, attrs) => ReturnType;
    };
  }
}

export const updateNodeAttrsById: RawCommands['updateNodeAttrsById'] =
  (id, attrs = {}) =>
  ({ tr }) => {
    const nodesWithPos = findNodeById(tr, id);
    if (nodesWithPos.length > 0) {
      const { pos, node } = nodesWithPos[0];
      tr.setNodeMarkup(pos, undefined, { id, ...(node.attrs || {}), ...attrs });
      return true;
    } else {
      console.error('Failed to find node by id');
      return false;
    }
  };
