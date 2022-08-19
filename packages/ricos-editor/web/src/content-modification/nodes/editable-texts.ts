import type { TextNode } from 'ricos-content';
import type { Decoration } from 'ricos-schema';
import type { Editables } from 'ricos-types';
import type {
  NodeDescriptorManager,
  EditableNodeDescriptors,
} from '../../models/editable-node-descriptor';
import { EditableNodes } from './editable-nodes';
import { EditableText } from './editable-text';

export class EditableTexts implements Editables<TextNode>, NodeDescriptorManager {
  private editableNodes: EditableNodes<TextNode, EditableText>;

  static of(nodes: TextNode[]) {
    const editableNodes = EditableNodes.withMapper(EditableText.of).of(nodes);
    return new EditableTexts(editableNodes);
  }

  private constructor(nodes: EditableNodes<TextNode, EditableText>) {
    this.editableNodes = nodes;
  }

  filter(predicate: (node: EditableText) => boolean): EditableTexts {
    return new EditableTexts(this.editableNodes.filter(predicate));
  }

  insert(node: TextNode): EditableTexts {
    return new EditableTexts(this.editableNodes.insert(node));
  }

  modify(modification: (node: EditableText) => EditableText): EditableTexts {
    return new EditableTexts(this.editableNodes.modify(modification));
  }

  delete(): EditableTexts {
    return new EditableTexts(this.editableNodes.delete());
  }

  getDescriptors(): EditableNodeDescriptors {
    return this.editableNodes.getDescriptors();
  }

  asArray(): EditableText[] {
    return this.editableNodes.asArray();
  }

  setDecoration(decoration: Decoration) {
    const modification = (node: EditableText) => node.setDecoration(decoration);
    return this.modify(modification);
  }

  unsetDecoration(decoration: Decoration) {
    const modification = (node: EditableText) => node.unsetDecoration(decoration);
    return this.modify(modification);
  }

  setSelection(selection: boolean) {
    return this.modify(n => n.setSelection(selection));
  }

  getRefinedNodes(): TextNode[] {
    return this.editableNodes.getRefinedNodes();
  }
}
