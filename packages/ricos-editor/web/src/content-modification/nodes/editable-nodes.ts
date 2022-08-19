/* eslint-disable brace-style */
import type { RefinedNode } from 'ricos-content';
import type { Editable, Editables } from 'ricos-types';
import type {
  NodeDescriptorManager,
  EditableNodeDescriptors,
} from '../../models/editable-node-descriptor';
import { EditableDescriptors } from './editable-descriptors';

export class EditableNodes<TNode extends RefinedNode, TEditable extends Editable<TNode>>
  // eslint-disable-next-line prettier/prettier
  implements Editables<TNode>, NodeDescriptorManager
{
  private readonly descriptors: EditableNodeDescriptors;

  private mapper: (nodes: TNode) => TEditable;

  private get nodes(): TEditable[] {
    return this.descriptors.getNodes() as TEditable[];
  }

  static withMapper<TNode extends RefinedNode, TEditable extends Editable<TNode>>(
    mapper: (node: TNode) => TEditable
  ) {
    return { of: EditableNodes.of(mapper) };
  }

  private static of<TNode extends RefinedNode, TEditable extends Editable<TNode>>(
    mapper: (node: TNode) => TEditable
  ) {
    return function (nodes: TNode[]) {
      return new EditableNodes(mapper, EditableDescriptors.of(nodes.map(mapper)));
    };
  }

  private constructor(mapper: (node: TNode) => TEditable, descriptors: EditableNodeDescriptors) {
    this.mapper = mapper;
    this.descriptors = descriptors;
  }

  filter(predicate: (node: TEditable) => boolean): EditableNodes<TNode, TEditable> {
    return new EditableNodes(this.mapper, this.descriptors.filter(predicate));
  }

  insert(node: TNode): EditableNodes<TNode, TEditable> {
    return new EditableNodes(this.mapper, this.descriptors.insert(this.mapper(node)));
  }

  modify(modification: (node: TEditable) => TEditable): EditableNodes<TNode, TEditable> {
    return new EditableNodes(this.mapper, this.descriptors.modify(modification));
  }

  delete(): EditableNodes<TNode, TEditable> {
    return new EditableNodes(this.mapper, this.descriptors.delete());
  }

  getDescriptors(): EditableNodeDescriptors {
    return this.descriptors;
  }

  asArray(): TEditable[] {
    return this.nodes;
  }

  getRefinedNodes() {
    return this.nodes.map(n => n.getRefinedNode());
  }
}
