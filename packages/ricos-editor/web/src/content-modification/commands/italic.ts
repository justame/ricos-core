import type { Decoration } from 'ricos-schema';
import { Decoration_Type } from 'ricos-schema';
import type { CommandDescriptor } from 'ricos-types';
import type { EditableParagraph } from '../nodes/editable-paragraph';

const decoration: Decoration = { type: Decoration_Type.ITALIC, italicData: true };

export const setItalic: CommandDescriptor = {
  name: 'setItalic',
  execute:
    ({ model }) =>
    () =>
      model
        .filter(n => n.getSelection())
        .modify((n: EditableParagraph) => n.setDecoration(decoration)),
};

export const unsetItalic: CommandDescriptor = {
  name: 'unsetItalic',
  execute:
    ({ model }) =>
    () =>
      model
        .filter(n => n.getSelection())
        .modify((n: EditableParagraph) => n.unsetDecoration(decoration)),
};

export const toggleItalic: CommandDescriptor = {
  name: 'toggleItalic',
  execute:
    ({ model }) =>
    () =>
      model
        .filter(n => n.getSelection())
        .modify((n: EditableParagraph) =>
          n
            .getNodes()
            .asArray()
            .some(node =>
              node
                .getData()
                .decorations.some(currDecoration => currDecoration.type === decoration.type)
            )
            ? n.unsetDecoration(decoration)
            : n.setDecoration(decoration)
        ),
};
