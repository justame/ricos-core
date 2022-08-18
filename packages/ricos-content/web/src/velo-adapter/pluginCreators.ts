import { generateId } from '../converters/generateRandomId';
import type { Node } from 'ricos-schema';
import { Node_Type } from 'ricos-schema';
import type { NodeCreatorsCollection } from '../types';
import { setupAbstractContentBuilder } from '../RicosContentAPI/AbstractContentBuilder';
import { makeTextNode, makeListNode, makeNode } from '../RicosContentAPI/node-builder-methods';
import { makeCollapsibleList } from '../RicosContentAPI/collapsible-list-builder-api';
import { makeTable } from '../RicosContentAPI/table-builder-api';

// native elements
import { createImageData } from './nativeElements/addImage';

const setupNodeCreators: NodeCreatorsCollection = setupAbstractContentBuilder<Node>(
  generateId,
  makeTextNode,
  makeListNode,
  makeNode,
  makeTable,
  makeCollapsibleList
) as unknown as NodeCreatorsCollection;

// override native elements
setupNodeCreators.image = ({ data }) =>
  makeNode(generateId)({ data: createImageData(data), type: Node_Type.IMAGE });

export default setupNodeCreators;
