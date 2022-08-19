import type { Node_Type, Node } from 'ricos-schema';
import { RICOS_NODE_TYPE_TO_DATA_FIELD } from '../consts';

export const isType = (type: Node_Type) => (node: Node) => node.type === type;

export const getDataField = ({ type }: Node) => RICOS_NODE_TYPE_TO_DATA_FIELD[type];
