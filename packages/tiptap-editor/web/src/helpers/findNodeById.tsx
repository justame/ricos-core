import { findChildren } from '@tiptap/core';
import type { Transaction } from 'prosemirror-state';

export const findNodeById = (tr: Transaction, id: string) => {
  const predicate = node => node.attrs.id === id;
  return findChildren(tr.doc, predicate);
};
