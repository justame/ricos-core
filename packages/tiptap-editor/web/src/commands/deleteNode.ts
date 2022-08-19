import type { RawCommands } from '@tiptap/core';
import { findChildren } from '@tiptap/core';
import type { NodeType } from 'prosemirror-model';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    deleteNode: {
      /**
       * delete a node.
       */
      deleteNode: (id: string | NodeType) => ReturnType;
    };
  }
}

export const deleteNode: RawCommands['deleteNode'] =
  id =>
  ({ chain, tr, dispatch }) => {
    const nodeWithPos = findChildren(tr.doc, node => node.attrs.id === id);
    const { pos, node } = nodeWithPos?.[0] || {};
    if (pos !== undefined && dispatch) {
      return chain()
        .focus()
        .command(({ tr }) => {
          tr.delete(pos, pos + node.nodeSize);
          return true;
        })
        .run();
    } else {
      console.error(`Failed to delete node with id ${id}`);
      return false;
    }
  };
