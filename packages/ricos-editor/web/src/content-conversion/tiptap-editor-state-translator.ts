import type { Node } from 'prosemirror-model';
import type { Editor, JSONContent } from '@tiptap/react';
import type { ITiptapEditorStateTranslator } from '../models/tiptap-editor-state-translator';

export class TiptapEditorStateTranslator implements ITiptapEditorStateTranslator {
  private editor!: Editor;

  onChange = (editor: Editor) => (this.editor = editor);

  getTiptapContent = () => this.editor.getJSON();

  getSelectedNodesKeys = () => {
    const selection = this.editor.state.selection;
    const selectedNodes: string[] = [];
    this.editor.state.doc.nodesBetween(selection.from, selection.to, (node: Node) => {
      node.attrs.id && selectedNodes.push(node.attrs.id);
    });
    return selectedNodes;
  };

  setNodes = (nodes: JSONContent[]) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    this.editor.commands.replaceNodes(nodes);
  };
}
