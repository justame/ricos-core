import React from 'react';
import type { DocumentStyle, EditorCommands } from 'wix-rich-content-common';
import { DRAFT_TO_DOC_TYPE_WITH_LISTS, normalizeUrl } from 'wix-rich-content-common';
import {
  convertRelStringToObject,
  convertRelObjectToString,
} from 'wix-rich-content-common/libs/linkConverters';
import { scrollToBlock } from 'wix-rich-content-editor-common';
import { AlignTextCenterIcon, AlignJustifyIcon, AlignLeftIcon, AlignRightIcon } from '../icons';
import {
  defaultLineSpacing,
  decorationButtons,
  HEADING_TYPE_TO_ELEMENT,
  HEADING_TYPE_TO_ICON,
  setTextAlignment,
} from './buttonsListCreatorConsts';
import style from './ToolbarButtonNew.scss';
import type { TextBlockType } from 'ricos-types';

type editorCommands = EditorCommands;

export const getFontSizeNumber = (fontSize: string) => {
  const pxRegex = new RegExp('[0-9]+[px]');
  return pxRegex.exec(fontSize) ? fontSize.split('p')[0] : '';
};

export const hasStyleChanges = (
  currentHeading: string,
  inlineStyles: Record<string, string>,
  documentStyle?: DocumentStyle
) => {
  const headerStyle = documentStyle?.[DRAFT_TO_DOC_TYPE_WITH_LISTS[currentHeading]] || {};
  return Object.entries(inlineStyles).some(([key, value]) => headerStyle[key] !== value);
};

export const getBlockStyle = (editorCommands: EditorCommands) => {
  const blockType = editorCommands.getAnchorBlockType();
  const documentStyle = editorCommands.getDocumentStyle();
  return documentStyle?.[DRAFT_TO_DOC_TYPE_WITH_LISTS[blockType]];
};

export const findOsName = () => {
  if (navigator.userAgent.indexOf('Win') !== -1) return 'Windows';
  if (navigator.userAgent.indexOf('Mac') !== -1) return 'MacOS';
  return null;
};

const headingShortcuts = {
  MacOS: number => ` (⌘⌥${number})`,
  Windows: number => ` (Ctrl+Alt+${number})`,
};

export const translateHeading = (option = 'P', t, shouldAddShortcut = false) => {
  const number = parseInt(option.slice(-1)) ? option.slice(-1) : undefined;
  const osName = findOsName();
  const shortcut = shouldAddShortcut && osName ? headingShortcuts[osName](number || 0) : undefined;
  return option === 'P'
    ? t('FormattingToolbar_TextStyle_Paragraph', shortcut && { shortcut })
    : t('FormattingToolbar_TextStyle_Heading', shortcut ? { number, shortcut } : { number });
};

export const getSpacing = (currentSpacing = {}, userDefaultSpacing = {}) => {
  const hasCurrentSpacing = Object.keys(currentSpacing).length !== 0;
  const hasDefaultSpacing = Object.keys(userDefaultSpacing).length !== 0;
  const defaultSpacing = hasDefaultSpacing ? userDefaultSpacing : defaultLineSpacing;
  return hasCurrentSpacing ? currentSpacing : defaultSpacing;
};

export const handleLinkSettings = linkSettings => {
  const { anchorTarget = '_blank', customAnchorScroll } = linkSettings;
  let { relValue, rel } = linkSettings;
  if (relValue) {
    // eslint-disable-next-line no-console
    console.warn(
      // eslint-disable-next-line max-len
      `relValue is deprecated, Please use rel prop instead.`
    );
    rel = convertRelStringToObject(relValue) || rel;
  }
  relValue = convertRelObjectToString(rel);
  return { relValue, anchorTarget, customAnchorScroll };
};

export const goToLink = (event, linkData, linkPanelData) => {
  const { anchor, url, target } = linkData;
  if (anchor) {
    const { customAnchorScroll } = linkPanelData;
    if (customAnchorScroll) {
      customAnchorScroll(event, anchor);
    } else {
      scrollToBlock(anchor);
    }
  } else {
    const href = url ? normalizeUrl(url) : undefined;
    window.open(href, target);
  }
};

export const updateDynamicStyles = (value, editorCommands: editorCommands, buttonName) => {
  const data =
    buttonName === 'FONT_SIZE'
      ? { fontSize: value < 1 ? 1 : value > 900 ? 900 : value }
      : { dynamicStyles: value };
  editorCommands.insertDecoration(decorationButtons[buttonName], { ...data });
};

export const getCurrentHeading = (editorCommands: editorCommands) => {
  let currentHeading = 'P';
  Object.keys(HEADING_TYPE_TO_ELEMENT).forEach(headingType => {
    if (editorCommands.isBlockTypeSelected(headingType as TextBlockType)) {
      currentHeading = HEADING_TYPE_TO_ELEMENT[headingType];
    }
  });
  return currentHeading;
};

export const getHeadingIcon = (editorCommands: editorCommands) => {
  const currentHeading = getCurrentHeading(editorCommands);
  return HEADING_TYPE_TO_ICON[currentHeading];
};

export const handleAlignmentIcon = editorCommands => {
  const currentAlignment = editorCommands.getTextAlignment();
  let alignmentIcon;
  switch (currentAlignment) {
    case setTextAlignment.AlignCenter:
      alignmentIcon = AlignTextCenterIcon;
      break;
    case setTextAlignment.AlignRight:
      alignmentIcon = AlignRightIcon;
      break;
    case setTextAlignment.Justify:
      alignmentIcon = AlignJustifyIcon;
      break;
    default:
      alignmentIcon = AlignLeftIcon;
      break;
  }
  return alignmentIcon;
};

export const getHeadingsLabel = (editorCommands: editorCommands, t, headingsData) => {
  const currentHeading = getCurrentHeading(editorCommands);
  let label = translateHeading(currentHeading, t);
  const inlineStyles = editorCommands.getAnchorBlockInlineStyles() || {};
  if (
    headingsData.allowHeadingCustomization &&
    hasStyleChanges(currentHeading, inlineStyles, editorCommands.getDocumentStyle())
  ) {
    label = (
      <>
        {label}
        <span className={style.toolbarLabelUpdate}>*</span>
      </>
    );
  }
  return label;
};

export const getFontSize = (editorCommands: editorCommands) => {
  const fontSize = editorCommands.getFontSize() || '';
  return getFontSizeNumber(fontSize);
};
