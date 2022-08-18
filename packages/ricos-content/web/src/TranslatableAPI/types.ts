import type { PropertyPath } from 'lodash';
import type { Node } from '@justame-ricos/ricos-schema';
import { Node_Type } from '@justame-ricos/ricos-schema';
import type { RICOS_NODE_TYPE_TO_DATA_FIELD } from '../consts';

interface TranslatableCommons {
  id: Node['id'];
  text: string;
}

export type Translatable = TextualTranslatable | NonTextualTranslatable;

/** Node of type `PARAGRAPH` or `HEADING` */
export interface TextualNode extends Node {
  type: TextualNodeType;
}

export const isTextualNode = (node: Node): node is TextualNode =>
  [Node_Type.PARAGRAPH, Node_Type.HEADING].includes(node.type);

/** Any node that is not of type `PARAGRAPH` or `HEADING` */
export interface NonTextualNode extends Node {
  type: NonTextualNodeType;
}

export const isNonTextualNode = (node: Node): node is NonTextualNode => !isTextualNode(node);

/** Translatable object for `PARAGRAPH` or `HEADING` node */
export interface TextualTranslatable extends TranslatableCommons {
  type: TextualNodeType;
}

export interface NonTextualTranslatable extends TranslatableCommons {
  type: NonTextualNodeType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  path: PropertyPath;
}

export type TextualNodeType = Node_Type.PARAGRAPH | Node_Type.HEADING;
export type NonTextualNodeType = Exclude<Node_Type, Node_Type.PARAGRAPH | Node_Type.HEADING>;

type NodeToDataField = typeof RICOS_NODE_TYPE_TO_DATA_FIELD;
export type DataFieldsNames = NodeToDataField[keyof NodeToDataField] & keyof Node;

export type DataFieldNamesWithContainerData = DataFieldsNames &
  NodeToDataField[keyof Pick<
    NodeToDataField,
    | Node_Type.BUTTON
    | Node_Type.DIVIDER
    | Node_Type.EMBED
    | Node_Type.FILE
    | Node_Type.GALLERY
    | Node_Type.GIF
    | Node_Type.HTML
    | Node_Type.IMAGE
    | Node_Type.LINK_PREVIEW
    | Node_Type.MAP
    | Node_Type.VIDEO
  >];

export type DataFieldsWithContainerData = NonNullable<Node[DataFieldNamesWithContainerData]>;
