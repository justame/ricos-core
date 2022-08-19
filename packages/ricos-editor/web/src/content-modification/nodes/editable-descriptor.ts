import type { Editable } from 'ricos-types';
import type { RefinedNode } from 'ricos-content';
import type { EditableNodeDescriptor, EditMetadata } from '../../models/editable-node-descriptor';

export class EditableDescriptor implements EditableNodeDescriptor {
  node: Editable<RefinedNode>;

  metadata: EditMetadata;

  static of(node: Editable<RefinedNode>, metadata: EditMetadata): EditableDescriptor {
    return new EditableDescriptor(node, metadata);
  }

  private constructor(node: Editable<RefinedNode>, metadata: EditMetadata) {
    this.node = node;
    this.metadata = metadata;
  }

  getMetadata(): EditMetadata {
    return this.metadata;
  }

  getNode(): Editable<RefinedNode> {
    return this.node;
  }
}
