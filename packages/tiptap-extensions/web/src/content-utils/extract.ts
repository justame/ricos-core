import { flow } from 'fp-ts/function';
import type { JSONContent } from '@tiptap/core';
import type { Extractor } from 'ricos-content/libs/modifier-infra';
import { getExtractor } from 'ricos-content/libs/modifier-infra';

const nodesAccessor = (node: JSONContent) => node.content || [];

const getRootNode = (content: JSONContent | JSONContent[]): JSONContent =>
  Array.isArray(content)
    ? {
        type: 'root',
        content,
      }
    : content;

export const extract: (content: JSONContent | JSONContent[]) => Extractor<JSONContent> = flow(
  getRootNode,
  getExtractor<JSONContent>(nodesAccessor)
);
