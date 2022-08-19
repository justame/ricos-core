import { pipe } from 'fp-ts/function';
import type { JSONContent } from '@tiptap/core';
import { getModifier } from 'ricos-content/libs/modifier-infra';

export type JSONContentModifier = {
  filter: (predicate: (node: JSONContent) => boolean) => JSONContentModifier;
  set: (setter: (node: JSONContent) => JSONContent | JSONContent[]) => JSONContent;
};

const nodesAccessor = (node: JSONContent): JSONContent[] => node.content || [];
const nodesSetter = (nodes: JSONContent[]) => ({ content: nodes });

export const modify = (content: JSONContent): JSONContentModifier =>
  pipe(content, getModifier<JSONContent>(nodesAccessor, nodesSetter));
