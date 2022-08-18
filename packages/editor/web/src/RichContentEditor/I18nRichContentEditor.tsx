import React, { Component } from 'react';
import type { ToolbarType } from 'wix-rich-content-common';
import { withI18n } from 'wix-rich-content-common';
import englishResources from 'wix-rich-content-common/dist/statics/locale/messages_en.json';
import type { RichContentEditorProps } from './RichContentEditor';
import RichContentEditor from './RichContentEditor';

const WrappedEditor = withI18n<RichContentEditor, Partial<RichContentEditorProps>>(
  RichContentEditor,
  englishResources
);

export default class I18nRichContentEditor extends Component<Partial<RichContentEditorProps>> {
  editor!: RichContentEditor;

  static displayName = 'RichContentEditor';

  setEditorRef = editor => (this.editor = editor ? editor.getWrappedInstance() : undefined);

  getToolbars = () => this.editor.getToolbars();

  getToolbarProps = (type: ToolbarType) => this.editor.getToolbarProps(type);

  getT = () => this.editor.getT();

  getContainer = () => this.editor?.getContainer();

  getPlugins = () => this.editor.getPlugins();

  focus = () => this.editor.focus();

  blur = () => this.editor.blur();

  getEditorCommands = () => this.editor.EditorCommands;

  isInnerRCERenderedInTable = () => this.editor.isInnerRCERenderedInTable();

  setEditorState = editorState => this.editor?.updateEditorState(editorState);

  render() {
    return <WrappedEditor {...this.props} ref={this.setEditorRef} />;
  }
}
