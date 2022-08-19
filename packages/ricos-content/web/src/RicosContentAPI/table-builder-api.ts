import * as A from 'fp-ts/Array';
import { pipe } from 'fp-ts/function';
import type { TableCellData, TableData, RichContent, Node } from 'ricos-schema';
import { Node_Type, TableCellData_VerticalAlignment } from 'ricos-schema';
import type { BuilderFunctionsMetadata, TableCell } from '../types';
import type { TableCellNode, TableNode, TableRowNode } from '../types/node-refined-types';
import { addNode } from './builder-utils';
import type { AddMethodParams } from './node-builder-methods';
import {
  createNode,
  createTextNode,
  DEFAULT_CONTAINER_DATA,
  DEFAULT_PARAGRAPH_DATA,
} from './node-builder-methods';

const DEFAULT_CELL_DATA: TableCellData = {
  cellStyle: {
    verticalAlignment: TableCellData_VerticalAlignment.TOP,
  },
  borderColors: {},
};

const DEFAULT_LAYOUT_DIMS = {
  colsMinWidth: 120,
  rowsHeight: 47,
  colsWidthRatio: 10,
};

const toCellNode =
  (generateId: () => string) =>
  (cell: TableCell): TableCellNode =>
    createNode<TableCellNode>(generateId)(
      Node_Type.TABLE_CELL,
      cell.data || DEFAULT_CELL_DATA,
      cell.content.nodes
    );

const toRowNode =
  (generateId: () => string) =>
  (row: TableCell[]): TableRowNode =>
    createNode<TableRowNode, TableCellNode[]>(generateId)(
      Node_Type.TABLE_ROW,
      {},
      row.map(toCellNode(generateId))
    );

const getMaxRowLength = (rows: TableCell[][]): number => Math.max(...rows.map(r => r.length));

const getEmptyCell = (generateId: () => string): TableCell => ({
  content: {
    nodes: [
      createTextNode(generateId)(
        Node_Type.PARAGRAPH,
        [{ text: '', decorations: [] }],
        DEFAULT_PARAGRAPH_DATA
      ),
    ],
  },
});

const padRows =
  (rows: TableCell[][], emptyCell: TableCell) =>
  (maxLen: number): TableCell[][] =>
    rows.map(r => r.concat(Array(maxLen - r.length).fill(emptyCell)));

const calcTableDims = (rows: TableRowNode[]): [number, number] => [
  rows.length,
  rows.length > 0 ? rows[0].nodes.length : 0,
];

const toDefaultTableData = (dims: [number, number]): TableData => ({
  containerData: DEFAULT_CONTAINER_DATA,
  dimensions: {
    colsMinWidth: Array(dims[1]).fill(DEFAULT_LAYOUT_DIMS.colsMinWidth),
    colsWidthRatio: Array(dims[1]).fill(DEFAULT_LAYOUT_DIMS.colsWidthRatio),
    rowsHeight: Array(dims[0]).fill(DEFAULT_LAYOUT_DIMS.rowsHeight),
  },
});

const toTableData =
  (data?: TableData) =>
  (rows: TableRowNode[]): [TableRowNode[], TableData] =>
    [rows, data || toDefaultTableData(calcTableDims(rows))];

const toTableNode =
  (generateId: () => string) =>
  ([rows, data]: [TableRowNode[], TableData]): TableNode =>
    createNode<TableNode, TableRowNode[]>(generateId)(Node_Type.TABLE, data, rows);

const toContentWithTable =
  (args: Omit<AddMethodParams<TableData>, 'data' | 'type'>) =>
  (node: TableNode): RichContent =>
    addNode({ ...args, node: node as Node });

const toPaddedRowNodes =
  (generateId: () => string) =>
  (cells: TableCell[][]): TableRowNode[] =>
    pipe(
      cells,
      getMaxRowLength,
      padRows(cells, getEmptyCell(generateId)),
      A.map(toRowNode(generateId))
    );

export const makeTable =
  (generateId: () => string) =>
  ({
    cells,
    data,
  }: Omit<
    AddMethodParams<TableData> & { cells: TableCell[][] },
    BuilderFunctionsMetadata | 'type'
  >): Node =>
    pipe(cells, toPaddedRowNodes(generateId), toTableData(data), toTableNode(generateId)) as Node;

export const addTable =
  (generateId: () => string) =>
  ({
    cells,
    data,
    index,
    before,
    after,
    content,
  }: AddMethodParams<TableData> & { cells: TableCell[][] }): RichContent =>
    pipe(
      makeTable(generateId)({ cells, data }) as TableNode,
      toContentWithTable({ index, before, after, content })
    );
