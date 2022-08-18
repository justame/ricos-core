import type { NonTextualTranslatable, NonTextualNode } from '../types';
import type { Node } from 'ricos-schema';
import { get } from 'lodash';

const fieldsToPath = (path: (string | number | symbol)[]) =>
  path
    .map(field => (typeof field === 'number' ? `[${field}]` : field))
    .join('.')
    .replace(/(.\[)/g, '[');

/**
 * Typesafe-way to create a translatable object which points to a string field located
 * within a Node of plugin. The translatable object contains, among others, the value (text)
 * of the field, ready to be translated.
 * @param node Plugin's Node
 * @param fields Path from root starting at the node level, to the string field
 * @returns Translatable ready for translation
 */
export const fieldsToTranslatables = <
  K1 extends keyof Node,
  K2 extends keyof NonNullable<Node[K1]>,
  K3 extends keyof NonNullable<NonNullable<Node[K1]>[K2]>,
  K4 extends keyof NonNullable<NonNullable<NonNullable<Node[K1]>[K2]>[K3]>,
  K5 extends keyof NonNullable<NonNullable<NonNullable<NonNullable<Node[K1]>[K2]>[K3]>[K4]>
>(
  node: NonTextualNode,
  fields: [K1] | [K1, K2] | [K1, K2, K3] | [K1, K2, K3, K4] | [K1, K2, K3, K4, K5]
): NonTextualTranslatable[] => {
  const { id, type } = node;
  const text = get(node, fields);
  const path = fieldsToPath(fields);
  if (!text) {
    return [];
  }
  return [{ id, text, type, path }];
};
