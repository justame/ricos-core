import { FORMATTING_BUTTONS, INSERT_PLUGIN_BUTTONS } from 'wix-rich-content-editor-common';
export const desktopTextButtonList = [
  FORMATTING_BUTTONS.HEADINGS,
  // '|',
  FORMATTING_BUTTONS.BOLD,
  FORMATTING_BUTTONS.ITALIC,
  FORMATTING_BUTTONS.UNDERLINE,
  FORMATTING_BUTTONS.TEXT_COLOR,
  FORMATTING_BUTTONS.TEXT_HIGHLIGHT,
  FORMATTING_BUTTONS.TITLE,
  FORMATTING_BUTTONS.BLOCKQUOTE,
  FORMATTING_BUTTONS.SPOILER,
  '|',
  'Alignment', // TODO: replace when toolbars externalized
  FORMATTING_BUTTONS.ORDERED_LIST,
  FORMATTING_BUTTONS.UNORDERED_LIST,
  FORMATTING_BUTTONS.DECREASE_INDENT,
  FORMATTING_BUTTONS.INCREASE_INDENT,
  '|',
  FORMATTING_BUTTONS.LINE_SPACING,
  FORMATTING_BUTTONS.LINK,
  FORMATTING_BUTTONS.CODE_BLOCK,
];

export const mobileTextButtonList = [
  'AddPlugin',
  FORMATTING_BUTTONS.HEADINGS,
  FORMATTING_BUTTONS.BOLD,
  FORMATTING_BUTTONS.ITALIC,
  FORMATTING_BUTTONS.TEXT_COLOR,
  FORMATTING_BUTTONS.TEXT_HIGHLIGHT,
  FORMATTING_BUTTONS.UNDERLINE,
  FORMATTING_BUTTONS.TITLE,
  FORMATTING_BUTTONS.LINK,
  FORMATTING_BUTTONS.BLOCKQUOTE,
  FORMATTING_BUTTONS.ALIGN_LEFT,
  FORMATTING_BUTTONS.ALIGN_CENTER,
  FORMATTING_BUTTONS.ALIGN_RIGHT,
  FORMATTING_BUTTONS.ALIGN_JUSTIFY,
  FORMATTING_BUTTONS.ORDERED_LIST,
  FORMATTING_BUTTONS.UNORDERED_LIST,
  FORMATTING_BUTTONS.SPOILER,
  FORMATTING_BUTTONS.DECREASE_INDENT,
  FORMATTING_BUTTONS.INCREASE_INDENT,
  FORMATTING_BUTTONS.LINE_SPACING,
  FORMATTING_BUTTONS.CODE_BLOCK,
  FORMATTING_BUTTONS.UNDO,
  FORMATTING_BUTTONS.REDO,
];

export const pluginButtonNames = Object.values(INSERT_PLUGIN_BUTTONS);

export { default as textAlignmentButton } from './TextAlignmentButton';
export { default as AddPluginButton } from './AddPluginButton';
export {
  boldButton,
  italicButton,
  underlineButton,
  titleButton,
  blockquoteButton,
  alignTextLeftButton,
  alignTextCenterButton,
  alignTextRightButton,
  alignTextJustifyButton,
  orderedListButton,
  unorderedListButton,
} from './TextButtons';
