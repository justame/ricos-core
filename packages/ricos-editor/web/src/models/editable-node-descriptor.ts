import type { RefinedNode } from 'ricos-content';
import type { Editable } from 'ricos-types';

export type Edit = 'none' | 'add' | 'modify' | 'delete';

export interface EditMetadata {
  change: Edit;
}

export interface EditableNodeDescriptor {
  getMetadata(): EditMetadata;
  getNode: () => Editable<RefinedNode>;
}

export interface EditableNodeDescriptors {
  filter(predicate: (node: Editable<RefinedNode>) => boolean): EditableNodeDescriptors;
  insert(node: Editable<RefinedNode>): EditableNodeDescriptors;
  modify(
    modification: (node: Editable<RefinedNode>) => Editable<RefinedNode>
  ): EditableNodeDescriptors;
  delete(): EditableNodeDescriptors;
  getModified(): EditableNodeDescriptors;
  getAdded(): EditableNodeDescriptors;
  getDeleted(): EditableNodeDescriptors;
  getNodes(): Editable<RefinedNode>[];
}

export interface NodeDescriptorManager {
  getDescriptors(): EditableNodeDescriptors;
}
