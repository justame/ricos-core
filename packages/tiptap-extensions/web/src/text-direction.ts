import type { TextDirection } from 'wix-rich-content-common';
import { isTextDirection } from 'wix-rich-content-common';
import { Plugin, PluginKey } from 'prosemirror-state';
import type { RicosExtension, RicosExtensionConfig } from 'ricos-types';
import { Node_Type } from 'ricos-schema';
import { getListItemDirection, getTextDirectionFromAlignment } from 'ricos-converters';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    textDirection: {
      /**
       * Set a link mark
       */
      setTextDirection: (dir: TextDirection) => ReturnType;
      /**
       * Unset a link mark
       */
      unsetTextDirection: () => ReturnType;
    };
  }
}

export const textDirection: RicosExtension = {
  type: 'extension' as const,
  groups: [],
  name: 'textDirection',
  reconfigure(config: RicosExtensionConfig, extensions: RicosExtension[]) {
    const types = extensions
      .filter(extension => extension.groups.includes('text-container'))
      .map(({ name }) => name);
    return {
      ...config,
      addGlobalAttributes() {
        return [
          {
            types,
            attributes: {
              dir: {
                default: this.options.defaultDirection,
                parseHTML: element => element.dir || this.options.defaultDirection,
                renderHTML: attributes => ({ dir: attributes.dir }),
              },
            },
          },
        ];
      },
      addCommands() {
        return {
          setTextDirection:
            direction =>
            ({ commands }) => {
              if (!isTextDirection(direction)) {
                return false;
              }
              return types.every(type => commands.updateAttributes(type, { dir: direction }));
            },
          unsetTextDirection:
            () =>
            ({ commands }) => {
              return types.every(type => commands.resetAttributes(type, 'dir'));
            },
        };
      },
    };
  },
  createExtensionConfig() {
    return {
      name: this.name,
      priority: 2,
      addOptions: () => ({
        directions: ['ltr', 'rtl', 'auto'],
        defaultDirection: 'auto',
      }),
      addProseMirrorPlugins() {
        return [
          new Plugin({
            key: new PluginKey('textDirection'),
            appendTransaction: (_transactions, oldState, newState) => {
              if (newState.doc === oldState.doc) {
                return;
              }
              const tr = newState.tr;
              const { from, to } = newState.selection;
              newState.doc.nodesBetween(from, to, (node, pos) => {
                let dir;
                if (
                  [Node_Type.BLOCKQUOTE, Node_Type.PARAGRAPH, Node_Type.HEADING].includes(
                    node.type.name as Node_Type
                  )
                ) {
                  dir = getTextDirectionFromAlignment(node.attrs.textStyle?.textAlignment);
                } else if (node.type.name === Node_Type.LIST_ITEM) {
                  const text = node?.firstChild?.firstChild?.text || undefined;
                  dir = getListItemDirection(node.attrs.textStyle?.textAlignment, text);
                }
                dir &&
                  dir !== node.attrs.dir &&
                  tr.setNodeMarkup(pos, undefined, {
                    ...node.attrs,
                    dir,
                  });
              });
              return tr;
            },
          }),
        ];
      },
    };
  },
};
