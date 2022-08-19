/* eslint-disable brace-style */
import type { RicosEditorProps } from 'ricos-common';
import type {
  TiptapAdapter,
  IRicosEditor,
  EventSource,
  PublisherProvider,
  RicosServices,
} from 'ricos-types';
import { initializeTiptapAdapter } from 'wix-tiptap-editor';

type Topics = [
  'ricos.editor.instance.loaded',
  'ricos.editor.instance.error',
  'ricos.editor.functionality.firstEdit',
  'ricos.editor.content.saved'
];

const topics: Topics = [
  'ricos.editor.instance.loaded',
  'ricos.editor.instance.error',
  'ricos.editor.functionality.firstEdit',
  'ricos.editor.content.saved',
];

export class RicosEditor implements IRicosEditor, EventSource<Topics> {
  private tiptapAdapter: TiptapAdapter;

  constructor(
    editorProps: RicosEditorProps,
    services: Omit<RicosServices, 'editor'>,
    isDebugMode = false
  ) {
    this.tiptapAdapter = initializeTiptapAdapter(editorProps, services, isDebugMode);
  }

  topicsToPublish = topics;

  publishers!: PublisherProvider<Topics>;

  publishLoaded() {
    return this.publishers
      .byTopic('ricos.editor.instance.loaded')
      .publish({ msg: '🖖 editor mounted' });
  }

  publishFirstEdit() {
    return this.publishers
      .byTopic('ricos.editor.functionality.firstEdit')
      .publish({ msg: '📝 first content edit' });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  publishError(error: any, errorInfo: any): boolean {
    return this.publishers.byTopic('ricos.editor.instance.error').publish({ error, errorInfo });
  }

  publishContentSaved(): boolean {
    return this.publishers
      .byTopic('ricos.editor.content.saved')
      .publish({ msg: '💾 content saved' });
  }

  get adapter() {
    return this.tiptapAdapter;
  }

  getEditorCommands = () => this.tiptapAdapter.getEditorCommands();
}
