import type { NodeType, MarkType, Schema } from 'prosemirror-model';
import type { RawCommands } from '@tiptap/core';
import { getMarkType, getNodeType } from '@tiptap/core';
import { merge } from 'lodash';

function getSchemaTypeNameByName(name: string, schema: Schema): 'node' | 'mark' | null {
  if (schema.nodes[name]) {
    return 'node';
  }

  if (schema.marks[name]) {
    return 'mark';
  }

  return null;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    updateAttributesWithDeepMerge: {
      /**
       * Update attributes of a node or mark (deep merge).
       */
      updateAttributesWithDeepMerge: (
        typeOrName: string | NodeType | MarkType,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        attributes: Record<string, any>
      ) => ReturnType;
    };
  }
}

export const updateAttributesWithDeepMerge: RawCommands['updateAttributesWithDeepMerge'] =
  (typeOrName, attributes = {}) =>
  ({ tr, state, dispatch }) => {
    let nodeType: NodeType | null = null;
    let markType: MarkType | null = null;

    const schemaType = getSchemaTypeNameByName(
      typeof typeOrName === 'string' ? typeOrName : typeOrName.name,
      state.schema
    );

    if (!schemaType) {
      return false;
    }

    if (schemaType === 'node') {
      nodeType = getNodeType(typeOrName as NodeType, state.schema);
    }

    if (schemaType === 'mark') {
      markType = getMarkType(typeOrName as MarkType, state.schema);
    }

    if (dispatch) {
      tr.selection.ranges.forEach(range => {
        const from = range.$from.pos;
        const to = range.$to.pos;

        state.doc.nodesBetween(from, to, (node, pos) => {
          if (nodeType && nodeType === node.type) {
            tr.setNodeMarkup(pos, undefined, {
              ...merge({}, node.attrs, attributes),
            });
          }

          if (markType && node.marks.length) {
            node.marks.forEach(mark => {
              if (markType === mark.type) {
                const trimmedFrom = Math.max(pos, from);
                const trimmedTo = Math.min(pos + node.nodeSize, to);
                tr.addMark(
                  trimmedFrom,
                  trimmedTo,
                  markType.create({
                    ...merge({}, mark.attrs, attributes),
                  })
                );
              }
            });
          }
        });
      });
    }

    return true;
  };
