import type { JSONContent } from '@tiptap/core';
import type { Decoration, Node } from 'ricos-schema';
import type { Transform } from './models/converter';

export type TiptapNode = JSONContent & {
  type: string;
};

type WithRequiredProperty<Type, Key extends keyof Type> = Type & {
  [Property in Key]-?: Type[Property];
};

export type TiptapMark = WithRequiredProperty<JSONContent, 'marks'>['marks'][number];

export interface TiptapNodeConverter {
  toTiptap: Transform<Node, TiptapNode>;
  fromTiptap: Transform<TiptapNode, Node>;
}

export interface TiptapMarkConverter {
  toTiptap: Transform<Decoration, TiptapMark>;
  fromTiptap: Transform<TiptapMark, Decoration>;
}
