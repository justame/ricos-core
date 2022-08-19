import type { RawCommands } from '@tiptap/core';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    setNodeSize: {
      /**
       * Update node size ('CONTENT' | 'SMALL' | 'ORIGINAL' | 'FULL_WIDTH').
       */
      setNodeSize: (size: 'CONTENT' | 'SMALL' | 'ORIGINAL' | 'FULL_WIDTH') => ReturnType;
    };
  }
}

export const setNodeSize: RawCommands['setNodeSize'] =
  size =>
  ({ commands, tr }) => {
    const $from = tr.selection.$from;
    const selectedNode = $from.nodeAfter;
    const nodeType = selectedNode?.type.name || '';
    const nodeContainerData = selectedNode?.attrs.containerData;
    return commands.updateAttributes(nodeType, {
      containerData: { ...nodeContainerData, width: { size } },
    });
  };
