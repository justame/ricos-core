import type { RawCommands } from '@tiptap/core';
import type { JSONContent } from '@tiptap/react';
import { TextSelection } from 'prosemirror-state';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    replaceNodes: {
      /**
       * Update node attributes by node id.
       */
      replaceNodes: (nodes: JSONContent[]) => ReturnType;
    };
  }
}

export const replaceNodes: RawCommands['replaceNodes'] =
  nodes =>
  ({ tr, chain }) => {
    const from = tr.selection.from;
    const to = tr.selection.to;
    return nodes
      .reduce((chain, node) => chain.replaceNode(node), chain().focus())
      .command(({ tr }) => {
        tr.setSelection(TextSelection.create(tr.doc, from, to));
        return true;
      })
      .run();
  };
