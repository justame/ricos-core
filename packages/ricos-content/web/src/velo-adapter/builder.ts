import { addNode } from '../RicosContentAPI/builder-utils';
import type { Node, RichContent } from '@justame-ricos/ricos-schema';
class Builder {
  private onRender?: (content: RichContent) => void;

  private content: RichContent;

  constructor(content: RichContent, onRender?: (content: RichContent) => void) {
    this.content = content;
    this.onRender = onRender;
  }

  private add(addNodeParams: Parameters<typeof addNode>[0]) {
    this.content = addNode(addNodeParams);
    return this;
  }

  append(node: Node) {
    return this.add({ node, content: this.content });
  }

  insertBefore(id: string, node: Node) {
    return this.add({ node, content: this.content, before: id });
  }

  insertAfter(id: string, node: Node) {
    return this.add({ node, content: this.content, after: id });
  }

  insertAt(index: number, node: Node) {
    return this.add({ node, content: this.content, index });
  }

  render() {
    this.onRender?.(this.content);
    return this.content;
  }
}

export const createBuilder = (content: RichContent, onRender?: (content: RichContent) => void) =>
  new Builder(content, onRender);
