import type { RawCommands } from '@tiptap/core';
import { findNodeById } from '../helpers';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    setNodeAttrsById: {
      /**
       * Update node attributes by node id.
       */
      setNodeAttrsById: (id, attrs) => ReturnType;
    };
  }
}

export const setNodeAttrsById: RawCommands['setNodeAttrsById'] =
  (id, attrs = {}) =>
  ({ tr }) => {
    const nodesWithPos = findNodeById(tr, id);
    if (nodesWithPos.length > 0) {
      const { pos } = nodesWithPos[0];
      tr.setNodeMarkup(pos, undefined, { id, ...attrs });
      return true;
    } else {
      console.error('Failed to find node by id');
      return false;
    }
  };
