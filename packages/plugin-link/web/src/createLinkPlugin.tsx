import { createBasePlugin } from 'wix-rich-content-plugin-commons';
import type { EditorState } from 'wix-rich-content-editor-common';
import {
  insertLinkInPosition,
  fixPastedLinks,
  hasLinksInSelection,
  getVisibleSelectionRect,
  createLinkEntityData,
} from 'wix-rich-content-editor-common';
import { addLinkPreview, LINK_PREVIEW_TYPE } from 'wix-rich-content-plugin-link-preview/libs/utils';
import type { CreatePluginFunction } from 'wix-rich-content-common';
import { isValidUrl } from 'wix-rich-content-common';
import type { KeyboardEvent } from 'react';
import React from 'react';
import type { LinkPluginEditorConfig } from './types';
import { LINK_TYPE } from './types';
import LinkViewer from './LinkViewer';
import { linkEntityStrategy } from './strategy';
import createLinkToolbar from './toolbar/createToolbar';
import { DEFAULTS } from './defaults';
import type { DraftHandleValue, ContentBlock } from 'draft-js';

type LinkifyData = {
  string: string;
  block: ContentBlock;
  blockKey: string;
  index: number;
  endIndex: number;
};

const createLinkPlugin: CreatePluginFunction<LinkPluginEditorConfig> = config => {
  const type = LINK_TYPE;
  const { theme, anchorTarget, relValue, [type]: settings = {}, commonPubsub, ...rest } = config;
  const target = anchorTarget;
  const rel = relValue;
  settings.minLinkifyLength = settings.minLinkifyLength || 6;
  const toolbar = createLinkToolbar({ ...config, settings, closeInlinePluginToolbar });

  const decorators = [
    {
      strategy: linkEntityStrategy,
      component: props => {
        const componentData = props?.contentState.getEntity(props?.entityKey).getData();
        return (
          <LinkViewer
            componentData={componentData}
            anchorTarget={anchorTarget}
            relValue={relValue}
            theme={theme}
            {...props}
          />
        );
      },
    },
  ];
  let linkifyData: LinkifyData | undefined;

  const handleReturn = (
    event: KeyboardEvent,
    editorState: EditorState,
    pluginFunctions // eslint-disable-line @typescript-eslint/no-unused-vars, no-unused-vars
  ): DraftHandleValue => {
    linkifyData = getLinkifyData(editorState);
    if (shouldConvertToLinkPreview(linkifyData)) {
      const url = getBlockLinkUrl(linkifyData);
      const blockKey = linkifyData?.block.getKey();
      if (url && blockKey) {
        const linkData = createLinkEntityData({
          url,
          target,
          rel,
        }) as { url: string; target?: string; rel?: string };
        addLinkPreview(editorState, config, blockKey, linkData);
      }
    }
    return 'not-handled';
  };

  const shouldConvertToLinkPreview = (linkifyData?: LinkifyData) =>
    linkifyData && linkifyData.block?.getType() === 'unstyled' && config[LINK_PREVIEW_TYPE];

  const getBlockLinkUrl = linkifyData => {
    const { string, block } = linkifyData;
    if (block.getText() === string) {
      return string;
    }
  };

  const handleBeforeInput = (
    chars: string,
    editorState: EditorState,
    eventTimeStamp: number, // eslint-disable-line @typescript-eslint/no-unused-vars, no-unused-vars
    pluginFunctions // eslint-disable-line @typescript-eslint/no-unused-vars, no-unused-vars
  ): DraftHandleValue => {
    if (/\s/.test(chars)) {
      linkifyData = getLinkifyData(editorState);
    }
    return 'not-handled';
  };

  let prevContentState;
  const isPasteChange = (editorState: EditorState) => {
    const contentState = editorState.getCurrentContent();
    const contentChanged = contentState !== prevContentState;
    prevContentState = contentState;
    return contentChanged && editorState.getLastChangeType() === 'insert-fragment';
  };

  function openInlinePluginToolbar(commonPubsubData) {
    commonPubsub.set('cursorOnInlinePlugin', commonPubsubData);
  }
  function closeInlinePluginToolbar() {
    commonPubsub.set('cursorOnInlinePlugin', null);
  }

  const onChange = (editorState: EditorState) => {
    const selection = editorState.getSelection();
    if (hasLinksInSelection(editorState) && selection.isCollapsed() && selection.getHasFocus()) {
      setTimeout(() => {
        const boundingRect = getVisibleSelectionRect(window);
        openInlinePluginToolbar({ type, boundingRect });
      });
    } else {
      closeInlinePluginToolbar();
    }
    let newEditorState = editorState;
    if (isPasteChange(editorState)) {
      newEditorState = fixPastedLinks(editorState, { anchorTarget, relValue });
    } else if (linkifyData) {
      newEditorState = addLinkAt(linkifyData, editorState);
    }
    linkifyData = undefined;
    return newEditorState;
  };

  const getLinkifyData = (editorState: EditorState) => {
    const strData = findLastStringWithNoSpacesAndSoftLines(editorState);
    return shouldLinkify(strData) ? strData : undefined;
  };

  const shouldLinkify = (consecutiveString: LinkifyData) =>
    consecutiveString.string.length >= settings.minLinkifyLength &&
    isValidUrl(consecutiveString.string) &&
    !(rangeContainsEntity(consecutiveString) && blockContainsPlainText(consecutiveString)) &&
    !settings?.disableAutoLink;

  const findLastStringWithNoSpacesAndSoftLines = (editorState: EditorState): LinkifyData => {
    const selection = editorState.getSelection();
    const blockKey = selection.getAnchorKey();
    const block = editorState.getCurrentContent().getBlockForKey(blockKey);
    const text = block.getText();
    const endIndex = selection.getEndOffset();
    const spaceIndex = text.lastIndexOf(' ', endIndex) + 1;
    const softLineIndex = text.lastIndexOf('\n', endIndex) + 1;
    const index = Math.max(spaceIndex, softLineIndex);
    const string = text.slice(index, endIndex);
    return { string, block, blockKey, index, endIndex };
  };

  const rangeContainsEntity = ({ block, index, endIndex }: LinkifyData) => {
    // eslint-disable-next-line fp/no-loops
    for (let i = index; i < endIndex; i++) {
      if (block.getEntityAt(i) !== null) {
        return true;
      }
    }
    return false;
  };

  const blockContainsPlainText = ({ block, string }: LinkifyData) =>
    block.getText().length > string.length;

  const addLinkAt = ({ string, index, endIndex, blockKey }, editorState) => {
    return insertLinkInPosition(editorState, blockKey, index, endIndex, {
      url: string,
      rel,
      target,
    });
  };

  return createBasePlugin(
    {
      theme,
      toolbar,
      type,
      anchorTarget,
      relValue,
      settings,
      commonPubsub,
      defaultPluginData: DEFAULTS,
      ...rest,
    },
    { decorators, handleBeforeInput, handleReturn, onChange }
  );
};

createLinkPlugin.functionName = LINK_TYPE;

export { createLinkPlugin };
