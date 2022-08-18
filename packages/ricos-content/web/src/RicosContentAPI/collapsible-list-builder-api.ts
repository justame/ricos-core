import * as A from 'fp-ts/Array';
import { pipe } from 'fp-ts/function';
import type { CollapsibleListData, RichContent, Node } from '@justame-ricos/ricos-schema';
import {
  Node_Type,
  CollapsibleListData_InitialExpandedItems,
  CollapsibleListData_Direction,
} from '@justame-ricos/ricos-schema';
import type { BuilderFunctionsMetadata, CollapsibleListItem } from '../types';
import type {
  CollapsibleItemBodyNode,
  CollapsibleItemNode,
  CollapsibleItemTitleNode,
  CollapsibleListNode,
} from '../types/node-refined-types';
import { addNode } from './builder-utils';
import type { AddMethodParams } from './node-builder-methods';
import { createNode, DEFAULT_CONTAINER_DATA } from './node-builder-methods';

const DEFAULT_COLLAPSIBLE_LIST_DATA: CollapsibleListData = {
  initialExpandedItems: CollapsibleListData_InitialExpandedItems.FIRST,
  direction: CollapsibleListData_Direction.LTR,
  containerData: DEFAULT_CONTAINER_DATA,
  expandOnlyOne: false,
};

const toCollapsibleItemNode =
  (generateId: () => string) =>
  (item: CollapsibleListItem): CollapsibleItemNode =>
    createNode<CollapsibleItemNode, [CollapsibleItemTitleNode, CollapsibleItemBodyNode]>(
      generateId
    )(Node_Type.COLLAPSIBLE_ITEM, {}, [
      createNode<CollapsibleItemTitleNode>(generateId)(
        Node_Type.COLLAPSIBLE_ITEM_TITLE,
        {},
        item.title.nodes
      ),
      createNode<CollapsibleItemBodyNode>(generateId)(
        Node_Type.COLLAPSIBLE_ITEM_BODY,
        {},
        item.content.nodes
      ),
    ]);

const toCollapsibleListNode =
  (generateId: () => string) =>
  (data: CollapsibleListData = DEFAULT_COLLAPSIBLE_LIST_DATA) =>
  (nodes: CollapsibleItemNode[]): CollapsibleListNode =>
    createNode<CollapsibleListNode, CollapsibleItemNode[]>(generateId)(
      Node_Type.COLLAPSIBLE_LIST,
      data,
      nodes
    );

const toContentWithCollapsibleList =
  (args: Omit<AddMethodParams<CollapsibleListData>, 'data' | 'type'>) =>
  (node: CollapsibleListNode): RichContent =>
    addNode({ ...args, node: node as Node });

export const makeCollapsibleList =
  (generateId: () => string) =>
  ({
    items,
    data,
  }: Omit<
    AddMethodParams<CollapsibleListData> & { items: CollapsibleListItem[] },
    BuilderFunctionsMetadata | 'type'
  >): Node => {
    return pipe(
      items,
      A.map(toCollapsibleItemNode(generateId)),
      toCollapsibleListNode(generateId)(data)
    ) as Node;
  };

export const addCollapsibleList =
  (generateId: () => string) =>
  ({
    items,
    data,
    index,
    before,
    after,
    content,
  }: AddMethodParams<CollapsibleListData> & { items: CollapsibleListItem[] }) => {
    return pipe(
      makeCollapsibleList(generateId)({ items, data }) as CollapsibleListNode,
      toContentWithCollapsibleList({ index, before, after, content })
    );
  };
