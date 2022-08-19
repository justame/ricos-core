import type { RawCommands } from '@tiptap/core';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    toggleNodeTextWrap: {
      /**
       * Toggle node text wrapping.
       */
      toggleNodeTextWrap: () => ReturnType;
    };
  }
}

export const toggleNodeTextWrap: RawCommands['toggleNodeTextWrap'] =
  () =>
  ({ commands, tr }) => {
    const $from = tr.selection.$from;
    const selectedNode = $from.nodeAfter;
    const nodeType = selectedNode?.type.name || '';
    const nodeContainerData = selectedNode?.attrs.containerData;
    const currentTextWrap = nodeContainerData.textWrap ?? true;
    return commands.updateAttributes(nodeType, {
      containerData: { ...nodeContainerData, textWrap: !currentTextWrap },
    });
  };
