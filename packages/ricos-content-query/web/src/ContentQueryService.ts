import type { ContentQueryService } from './types';
import type { Editor } from '@tiptap/react';
import { extract } from 'ricos-content/libs/extract';
import { fromTiptap } from 'ricos-converters';

class GetContentExtractorError extends Error {}

export class RicosContentQueryService implements ContentQueryService {
  private editor!: Editor;

  public setEditor(editor: Editor) {
    this.editor = editor;
  }

  public getContentExtractor(): ReturnType<typeof extract> {
    if (!this.editor) {
      throw new GetContentExtractorError(
        'getContentExtractor called without initialize editor instance (setEditor)'
      );
    }

    const tiptapContent = this.editor.getJSON();
    const richContent = fromTiptap(tiptapContent);
    const nodes = richContent.nodes;
    return extract(nodes);
  }
}
