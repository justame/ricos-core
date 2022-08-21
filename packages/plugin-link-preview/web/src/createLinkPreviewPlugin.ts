import { createBasePlugin } from 'wix-rich-content-plugin-commons';
import type { EditorState, DraftCommand } from 'wix-rich-content-editor-common';
import { getBlockAtStartOfSelection, getDefaultKeyBinding } from 'wix-rich-content-editor-common';
import type { LinkPreviewPluginEditorConfig } from './types';
import { LINK_PREVIEW_TYPE } from './types';
import LinkPreviewComponent from './LinkPreviewComponent';
import createLinkPreviewToolbar from './toolbar/createToolbar';
import { convertLinkPreviewToLink } from '../lib/utils';
import { REMOVE_LINK_PREVIEW } from './consts';
import type { CreatePluginFunction, GetEditorState, SetEditorState } from 'wix-rich-content-common';
import { DEFAULTS } from './defaults';

const createLinkPreviewPlugin: CreatePluginFunction<LinkPreviewPluginEditorConfig> = config => {
  const type = LINK_PREVIEW_TYPE;
  if (!config[LINK_PREVIEW_TYPE]) {
    config[LINK_PREVIEW_TYPE] = {};
  }
  const {
    [type]: settings = {},
    setEditorState,
    getEditorState,
    helpers,
    isMobile,
    t,
    experiments,
    ...rest
  } = config;
  const toolbar = createLinkPreviewToolbar({
    settings,
    setEditorState,
    getEditorState,
    helpers,
    isMobile,
    t,
    experiments,
  });

  const keyBindingFn = (event, { getEditorState }: { getEditorState: GetEditorState }) => {
    const editorState = getEditorState();
    const currentBlock = getBlockAtStartOfSelection(editorState);
    const entityKey = currentBlock.getEntityAt(0);
    const entityType = entityKey && editorState.getCurrentContent().getEntity(entityKey).getType();
    if (entityType === LINK_PREVIEW_TYPE) {
      if (event.key === 'Backspace') {
        return REMOVE_LINK_PREVIEW;
      }
    }
    return getDefaultKeyBinding(event);
  };

  const handleKeyCommand = (
    command: DraftCommand,
    editorState: EditorState,
    timestamp: number,
    { setEditorState }: { setEditorState: SetEditorState }
  ) => {
    if (command === REMOVE_LINK_PREVIEW) {
      const newState = convertLinkPreviewToLink(editorState);
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const basePluginProps = createBasePlugin(
    {
      component: LinkPreviewComponent,
      type,
      toolbar,
      settings,
      helpers,
      isMobile,
      t,
      getEditorState,
      setEditorState,
      defaultPluginData: DEFAULTS,
      ...rest,
    },
    { handleKeyCommand, keyBindingFn }
  );
  return basePluginProps;
};

createLinkPreviewPlugin.functionName = LINK_PREVIEW_TYPE;

export { createLinkPreviewPlugin };
