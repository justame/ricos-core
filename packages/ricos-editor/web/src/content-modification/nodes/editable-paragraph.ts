import type { ParagraphNode } from 'ricos-content';
import type { Decoration } from 'ricos-schema';
import type { Editable } from 'ricos-types';
import { EditableTexts } from './editable-texts';

export class EditableParagraph implements Editable<ParagraphNode> {
  private readonly node: ParagraphNode;

  private readonly nodes: EditableTexts;

  private readonly selection: boolean;

  private constructor(node: ParagraphNode, nodes: EditableTexts, selection: boolean) {
    this.node = node;
    this.nodes = nodes;
    this.selection = selection;
  }

  static of(node: ParagraphNode) {
    const nodes = EditableTexts.of(node.nodes);
    return new EditableParagraph(node, nodes, false);
  }

  getRefinedNode(): ParagraphNode {
    return {
      ...this.node,
      nodes: this.nodes.getRefinedNodes(),
    };
  }

  getNodes(): EditableTexts {
    return this.nodes;
  }

  getId() {
    return this.node.id;
  }

  getSelection(): boolean {
    return this.selection;
  }

  setSelection(selection: boolean): EditableParagraph {
    const nodes = this.nodes.setSelection(selection);
    return new EditableParagraph(this.node, nodes, selection);
  }

  setDecoration(decoration: Decoration): EditableParagraph {
    const nodes = this.nodes.setDecoration(decoration);
    return new EditableParagraph(this.node, nodes, this.selection);
  }

  unsetDecoration(decoration: Decoration): EditableParagraph {
    const nodes = this.nodes.unsetDecoration(decoration);
    return new EditableParagraph(this.node, nodes, this.selection);
  }
}
