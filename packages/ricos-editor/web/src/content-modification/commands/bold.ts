import type { Decoration } from 'ricos-schema';
import { Decoration_Type } from 'ricos-schema';
import type { CommandDescriptor } from 'ricos-types';
import type { EditableParagraph } from '../nodes/editable-paragraph';

const decoration: Decoration = { type: Decoration_Type.BOLD, fontWeightValue: 700 };

export const setBold: CommandDescriptor = {
  name: 'setBold',
  execute:
    ({ model }) =>
    () =>
      model
        .filter((n: EditableParagraph) => n.getSelection())
        .modify((n: EditableParagraph) => n.setDecoration(decoration)),
};

export const unsetBold: CommandDescriptor = {
  name: 'unsetBold',
  execute:
    ({ model }) =>
    () =>
      model
        .filter(n => n.getSelection())
        .modify((n: EditableParagraph) => n.unsetDecoration(decoration)),
};

export const toggleBold: CommandDescriptor = {
  name: 'toggleBold',
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
