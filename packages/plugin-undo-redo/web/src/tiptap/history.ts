import type { ExtensionProps, RicosExtension, RicosExtensionConfig } from 'ricos-types';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    ricosHistory: {
      /**
       * Toggle a paragraph
       */
      rebase: (count: number) => ReturnType;
      silent: () => ReturnType;
      redo: () => ReturnType;
      undo: () => ReturnType;
    };
  }
}

export const undoRedo: RicosExtension = {
  type: 'extension' as const,
  groups: [],
  name: 'ricosHistory',
  reconfigure(
    config: RicosExtensionConfig,
    _extensions: RicosExtension[],
    _ricosProps: ExtensionProps,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    settings: Record<string, any>
  ) {
    const { undo, redo, history } = settings;
    return {
      ...config,
      addCommands() {
        return {
          rebase:
            count =>
            ({ tr }) => {
              tr.setMeta('rebased', count);
              return true;
            },
          silent:
            () =>
            ({ tr }) => {
              tr.setMeta('skip', true);
              return true;
            },
          undo:
            () =>
            ({ state, dispatch }) => {
              return undo(state, dispatch);
            },
          redo:
            () =>
            ({ state, dispatch }) => {
              return redo(state, dispatch);
            },
        };
      },

      addProseMirrorPlugins() {
        return [history(this.options)];
      },
    };
  },
  createExtensionConfig() {
    return {
      name: this.name,

      priority: 1000,
      addOptions: () => ({
        depth: 100,
        newGroupDelay: 500,
      }),

      addKeyboardShortcuts() {
        return {
          'Mod-z': () => this.editor.commands.undo(),
          'Mod-y': () => this.editor.commands.redo(),
          'Shift-Mod-z': () => this.editor.commands.redo(),
        };
      },
    };
  },
};

export interface HistoryOptions {
  depth: number;
  newGroupDelay: number;
}
