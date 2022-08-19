import type { Decoration } from 'ricos-schema';
import { Decoration_Type } from 'ricos-schema';
import type { CommandDescriptor } from 'ricos-types';
import type { EditableParagraph } from '../nodes/editable-paragraph';

const decoration: Decoration = { type: Decoration_Type.UNDERLINE, underlineData: true };

export const setUnderline: CommandDescriptor = {
  name: 'setUnderline',
  execute:
    ({ model }) =>
    () =>
      model
        .filter(n => n.getSelection())
        .modify((n: EditableParagraph) => n.setDecoration(decoration)),
};

export const unsetUnderline: CommandDescriptor = {
  name: 'unsetUnderline',
  execute:
    ({ model }) =>
    () =>
      model
        .filter(n => n.getSelection())
        .modify((n: EditableParagraph) => n.unsetDecoration(decoration)),
};

export const toggleUnderline: CommandDescriptor = {
  name: 'toggleUnderline',
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
