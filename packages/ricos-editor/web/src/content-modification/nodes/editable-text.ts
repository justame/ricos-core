import type { TextData, Decoration } from 'ricos-schema';
import type { Editable, Editables } from 'ricos-types';
import type { TextNode } from 'ricos-content';
import EmptyNodes from './empty-nodes';

export class EditableText implements Editable<TextNode> {
  private readonly node: TextNode;

  private readonly selection: boolean;

  private constructor(node: TextNode, selection: boolean) {
    this.node = node;
    this.selection = selection;
  }

  static of(textNode: TextNode) {
    return new EditableText(textNode, false);
  }

  getRefinedNode(): TextNode {
    return this.node;
  }

  getNodes(): Editables<never> {
    return EmptyNodes.of(this.node.nodes);
  }

  getId(): '' {
    return '';
  }

  getSelection(): boolean {
    return this.selection;
  }

  getData(): TextData {
    return this.node.textData;
  }

  setSelection(selection: boolean): EditableText {
    return new EditableText(this.node, selection);
  }

  setData(data: TextData): EditableText {
    return new EditableText({ ...this.node, textData: data }, this.selection);
  }

  setDecoration(decoration: Decoration): EditableText {
    const decorations = [
      ...this.getData().decorations.filter(
        currDecoration => currDecoration.type !== decoration.type
      ),
      decoration,
    ];
    return this.setData({ ...this.getData(), decorations });
  }

  unsetDecoration(decoration: Decoration): EditableText {
    const decorations = this.getData().decorations.filter(
      currDecoration => currDecoration.type !== decoration.type
    );
    return this.setData({ ...this.getData(), decorations });
  }
}
