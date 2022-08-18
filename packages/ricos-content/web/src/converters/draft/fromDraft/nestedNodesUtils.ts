import type { DraftContent } from '../../../types';
import { generateId } from '../../generateRandomId';
import type { Node } from 'ricos-schema';
import { Node_Type } from 'ricos-schema';
import { fromDraft } from './fromDraft';

interface Cell {
  style?: { backgroundColor?: string; verticalAlign?: string };
  border?: { top?: string; left?: string; right?: string; bottom?: string };
  content: DraftContent;
}

type Row = Record<string, Cell>;

const parseCollapsible = (entity, opts): Node | undefined =>
  entity.pairs.map((pair: { key: string; title: DraftContent; content: DraftContent }) => ({
    id: pair.key,
    type: Node_Type.COLLAPSIBLE_ITEM,
    nodes: [
      {
        id: generateId(),
        type: Node_Type.COLLAPSIBLE_ITEM_TITLE,
        nodes: fromDraft(pair.title, opts).nodes,
      },
      {
        id: generateId(),
        type: Node_Type.COLLAPSIBLE_ITEM_BODY,
        nodes: fromDraft(pair.content, opts).nodes,
      },
    ],
  }));

const parseTable = (entity, opts) =>
  Object.entries(entity.rows).map(([, row]: [string, Row]) => ({
    id: generateId(),
    type: Node_Type.TABLE_ROW,
    nodes: Object.entries(row.columns).map(([, cell]: [string, Cell]) => ({
      id: generateId(),
      type: Node_Type.TABLE_CELL,
      tableCellData: {
        cellStyle: {
          verticalAlignment: cell.style?.verticalAlign?.toUpperCase(),
          backgroundColor: cell.style?.backgroundColor?.toUpperCase(),
        },
        borderColors: {
          top: cell.border?.top?.toUpperCase(),
          left: cell.border?.left?.toUpperCase(),
          right: cell.border?.right?.toUpperCase(),
          bottom: cell.border?.bottom?.toUpperCase(),
        },
      },
      nodes: fromDraft(cell.content, opts).nodes,
    })),
  }));

export const nestedNodesConverters = {
  [Node_Type.COLLAPSIBLE_LIST]: parseCollapsible,
  [Node_Type.TABLE]: parseTable,
};
