import type { RawCommands } from '@tiptap/core';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    setNodeAlignment: {
      /**
       * Update node alignment ('CENTER' | 'LEFT' | 'RIGHT').
       */
      setNodeAlignment: (alignment: 'CENTER' | 'LEFT' | 'RIGHT') => ReturnType;
    };
  }
}

export const setNodeAlignment: RawCommands['setNodeAlignment'] =
  alignment =>
  ({ commands, tr }) => {
    const $from = tr.selection.$from;
    const selectedNode = $from.nodeAfter;
    const nodeType = selectedNode?.type.name || '';
    const nodeContainerData = selectedNode?.attrs.containerData;
    return commands.updateAttributes(nodeType, {
      containerData: { ...nodeContainerData, alignment },
    });
  };
