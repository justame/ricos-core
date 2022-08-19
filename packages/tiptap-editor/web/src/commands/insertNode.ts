import type { RawCommands } from '@tiptap/core';
import { generateId } from 'ricos-content';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    insertNode: {
      /**
       * Insert a node.
       */
      insertNode: (type: string, attrs: Record<string, unknown>) => ReturnType;
    };
  }
}

export const insertNode: RawCommands['insertNode'] =
  (type, attrs = {}) =>
  ({ chain }) => {
    return chain()
      .focus()
      .insertContent({
        type,
        attrs: { id: attrs.id || generateId(), ...attrs },
      })
      .run();
  };
