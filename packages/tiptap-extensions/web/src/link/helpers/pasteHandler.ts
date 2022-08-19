import type { Editor } from '@tiptap/core';
import { find } from 'linkifyjs';
import type { MarkType } from 'prosemirror-model';
import { Plugin, PluginKey } from 'prosemirror-state';
import type { RicosLink } from '../models';

type PasteHandlerOptions = {
  editor: Editor;
  type: MarkType;
  defaultLink: RicosLink;
};

export function pasteHandler(options: PasteHandlerOptions): Plugin {
  return new Plugin({
    key: new PluginKey('handlePasteLink'),
    props: {
      handlePaste: (view, event, slice) => {
        const { state } = view;
        const { selection } = state;
        const { empty } = selection;

        if (empty) {
          return false;
        }

        let textContent = '';

        slice.content.forEach(node => {
          textContent += node.textContent;
        });

        const link = find(textContent).find(item => item.isLink && item.value === textContent);

        if (!textContent || !link) {
          return false;
        }

        const ricosLink = options.defaultLink.setUrl(link.href);

        options.editor.commands.setMark(options.type, {
          link: ricosLink.toLink(),
        });

        return true;
      },
    },
  });
}
