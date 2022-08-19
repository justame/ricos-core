import type { RefinedNode } from 'ricos-content';
import type { Editable } from 'ricos-types';
import type { EditableNodeDescriptors } from '../../models/editable-node-descriptor';
import { EditableDescriptor } from './editable-descriptor';

export class EditableDescriptors implements EditableNodeDescriptors {
  descriptors: EditableDescriptor[];

  static of(nodes: Editable<RefinedNode>[]) {
    return new EditableDescriptors(
      nodes.map(node => EditableDescriptor.of(node, { change: 'none' }))
    );
  }

  private constructor(descriptors: EditableDescriptor[]) {
    this.descriptors = descriptors;
  }

  filter(predicate: (node: Editable<RefinedNode>) => boolean): EditableDescriptors {
    const descriptors = this.descriptors.filter(descriptor => predicate(descriptor.getNode()));
    return new EditableDescriptors(descriptors);
  }

  insert(node: Editable<RefinedNode>): EditableDescriptors {
    const descriptor = EditableDescriptor.of(node, { change: 'add' });
    const descriptors = [...this.descriptors, descriptor];
    return new EditableDescriptors(descriptors);
  }

  modify(
    modification: (node: Editable<RefinedNode>) => Editable<RefinedNode>
  ): EditableDescriptors {
    const descriptors = this.descriptors.map(descriptor =>
      EditableDescriptor.of(modification(descriptor.getNode()), { change: 'modify' })
    );
    return new EditableDescriptors(descriptors);
  }

  delete(): EditableDescriptors {
    const descriptors = this.descriptors.map(descriptor =>
      EditableDescriptor.of(descriptor.getNode(), { change: 'delete' })
    );
    return new EditableDescriptors(descriptors);
  }

  getModified(): EditableDescriptors {
    const descriptors = this.descriptors.filter(
      descriptor => descriptor.getMetadata().change === 'modify'
    );
    return new EditableDescriptors(descriptors);
  }

  getAdded(): EditableDescriptors {
    const descriptors = this.descriptors.filter(
      descriptor => descriptor.getMetadata().change === 'add'
    );
    return new EditableDescriptors(descriptors);
  }

  getDeleted(): EditableDescriptors {
    const descriptors = this.descriptors.filter(
      descriptor => descriptor.getMetadata().change === 'delete'
    );
    return new EditableDescriptors(descriptors);
  }

  getNodes(): Editable<RefinedNode>[] {
    const nodes = this.descriptors.map(descriptor => descriptor.getNode());
    return nodes;
  }
}
