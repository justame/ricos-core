import type { ParagraphNode } from 'ricos-content';
import type { fromTiptap as fromTiptapFn, toTiptap as toTiptapFn } from 'ricos-converters';
import type { ITiptapEditorStateTranslator } from '../../models/tiptap-editor-state-translator';
import type { EditablesRepository } from '../../models/editable-repository';
import type { NodeDescriptorManager } from '../../models/editable-node-descriptor';
import { EditableParagraphs } from '../nodes/editable-paragraphs';

type toTiptap = typeof toTiptapFn;
type fromTiptap = typeof fromTiptapFn;

export class TiptapEditablesRepository implements EditablesRepository {
  editor: ITiptapEditorStateTranslator;

  toTiptap: toTiptap;

  fromTiptap: fromTiptap;

  constructor(editor: ITiptapEditorStateTranslator, toTiptap: toTiptap, fromTiptap: fromTiptap) {
    this.editor = editor;
    this.toTiptap = toTiptap;
    this.fromTiptap = fromTiptap;
  }

  getEditables(): EditableParagraphs {
    const tiptapContent = this.editor.getTiptapContent();
    const selectedNodesKeys = this.editor.getSelectedNodesKeys();
    const richContent = this.fromTiptap(tiptapContent);
    const paragraphs = EditableParagraphs.of(richContent.nodes as ParagraphNode[]);
    return paragraphs.setSelection(selectedNodesKeys);
  }

  commit(descriptorManager: NodeDescriptorManager): void {
    const nodes = descriptorManager
      .getDescriptors()
      .getModified()
      .getNodes()
      .map(node => node.getRefinedNode());
    const tiptapNodes = this.toTiptap({ nodes })?.content;
    tiptapNodes && this.editor.setNodes(tiptapNodes);
  }
}
