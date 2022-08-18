import type { ContentBuilder } from '../types';
import { setupAbstractContentBuilder } from './AbstractContentBuilder';
import { addTextNode, addListNode, addNode } from './node-builder-methods';
import { addCollapsibleList } from './collapsible-list-builder-api';
import { addTable } from './table-builder-api';

export interface RicosBuilder extends ContentBuilder {
  new (): ContentBuilder;
}

const firstLetterUpperCase = (str: string) => `${str.charAt(0).toUpperCase()}${str.substring(1)}`;

export const setupContentBuilder = (
  generateId: () => string
): ContentBuilder & { RicosContentBuilder: RicosBuilder } => {
  class RicosContentBuilder {}

  const builderApis = setupAbstractContentBuilder(
    generateId,
    addTextNode,
    addListNode,
    addNode,
    addTable,
    addCollapsibleList,
    name => `add${firstLetterUpperCase(name)}` // addParagraph, addTable, ...
  );

  return {
    RicosContentBuilder: RicosContentBuilder as unknown as RicosBuilder,
    ...(builderApis as unknown as ContentBuilder),
  };
};
