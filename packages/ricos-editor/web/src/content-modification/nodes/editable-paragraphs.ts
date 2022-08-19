import type { ParagraphNode } from 'ricos-content';
import type { Decoration } from 'ricos-schema';
import type { Editables } from 'ricos-types';
import type {
  NodeDescriptorManager,
  EditableNodeDescriptors,
} from '../../models/editable-node-descriptor';
import { EditableNodes } from './editable-nodes';
import { EditableParagraph } from './editable-paragraph';

export class EditableParagraphs implements Editables<ParagraphNode>, NodeDescriptorManager {
  private nodes: EditableNodes<ParagraphNode, EditableParagraph>;

  static of(nodes: ParagraphNode[]) {
    const editableNodes = EditableNodes.withMapper(EditableParagraph.of).of(nodes);
    return new EditableParagraphs(editableNodes);
  }

  private constructor(nodes: EditableNodes<ParagraphNode, EditableParagraph>) {
    this.nodes = nodes;
  }

  getDescriptors(): EditableNodeDescriptors {
    return this.nodes.getDescriptors();
  }

  filter(predicate: (node: EditableParagraph) => boolean): EditableParagraphs {
    return new EditableParagraphs(this.nodes.filter(predicate));
  }

  insert(node: ParagraphNode): EditableParagraphs {
    return new EditableParagraphs(this.nodes.insert(node));
  }

  modify(modification: (node: EditableParagraph) => EditableParagraph): EditableParagraphs {
    return new EditableParagraphs(this.nodes.modify(modification));
  }

  delete(): EditableParagraphs {
    return new EditableParagraphs(this.nodes.delete());
  }

  asArray(): EditableParagraph[] {
    return this.nodes.asArray();
  }

  setDecoration(decoration: Decoration): EditableParagraphs {
    const modification = (node: EditableParagraph) => node.setDecoration(decoration);
    return this.modify(modification);
  }

  unsetDecoration(decoration: Decoration): EditableParagraphs {
    const modification = (node: EditableParagraph) => node.unsetDecoration(decoration);
    return this.modify(modification);
  }

  setSelection(nodeIds: string[]): EditableParagraphs {
    const modification = (node: EditableParagraph) =>
      nodeIds.includes(node.getId()) ? node.setSelection(true) : node;
    return this.modify(modification);
  }

  getRefinedNodes() {
    return this.nodes.getRefinedNodes();
  }
}
