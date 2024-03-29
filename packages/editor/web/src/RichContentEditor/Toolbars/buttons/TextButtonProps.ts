import type {
  GetEditorState,
  SetEditorState,
  ToolbarButtonProps,
  TranslationFunction,
} from 'wix-rich-content-common';
import { HEADER_BLOCK } from 'wix-rich-content-common';
import {
  AlignLeftIcon,
  AlignTextCenterIcon,
  AlignRightIcon,
  AlignJustifyIcon,
  FORMATTING_BUTTONS,
} from 'wix-rich-content-editor-common';
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  BlockQuoteIcon,
  TitleIcon,
  TitleOneIcon,
  TitleTwoIcon,
  OrderedListIcon,
  UnorderedListIcon,
} from '../../Icons';
import generateTextButtonProps from './utils/generateTextToolbarButtonProps';
import { BUTTON_STYLES } from './consts';

interface ButtonProps {
  icon: (props) => JSX.Element;
  icons?: Record<string, (props) => JSX.Element>;
  t: TranslationFunction;
  getEditorState: GetEditorState;
  setEditorState: SetEditorState;
  externalOnClick?: (style: string) => void;
  alignment: string;
  newFormattingToolbar: boolean;
}

const TextButtonProps: Record<string, (props: ButtonProps) => ToolbarButtonProps> = {
  [FORMATTING_BUTTONS.BOLD]: ({
    icon,
    t,
    getEditorState,
    setEditorState,
    externalOnClick,
    alignment,
    newFormattingToolbar,
  }) =>
    generateTextButtonProps({
      name: FORMATTING_BUTTONS.BOLD,
      styles: ['BOLD'],
      type: BUTTON_STYLES.INLINE,
      icons: [icon || (() => BoldIcon({ newFormattingToolbar }))],
      tooltipTextKey: 'BoldButton_Tooltip',
      t,
      getEditorState,
      setEditorState,
      externalOnClick,
      alignment,
    }),
  [FORMATTING_BUTTONS.ITALIC]: ({
    icon,
    t,
    getEditorState,
    setEditorState,
    externalOnClick,
    alignment,
    newFormattingToolbar,
  }) =>
    generateTextButtonProps({
      name: FORMATTING_BUTTONS.ITALIC,
      styles: ['ITALIC'],
      type: BUTTON_STYLES.INLINE,
      icons: [icon || (() => ItalicIcon({ newFormattingToolbar }))],
      tooltipTextKey: 'ItalicButton_Tooltip',
      t,
      getEditorState,
      setEditorState,
      externalOnClick,
      alignment,
    }),
  [FORMATTING_BUTTONS.UNDERLINE]: ({
    icon,
    t,
    getEditorState,
    setEditorState,
    externalOnClick,
    alignment,
    newFormattingToolbar,
  }) =>
    generateTextButtonProps({
      name: FORMATTING_BUTTONS.UNDERLINE,
      styles: ['UNDERLINE'],
      type: BUTTON_STYLES.INLINE,
      icons: [icon || (() => UnderlineIcon({ newFormattingToolbar }))],
      tooltipTextKey: 'UnderlineButton_Tooltip',
      t,
      getEditorState,
      setEditorState,
      externalOnClick,
      alignment,
    }),
  [FORMATTING_BUTTONS.TITLE]: ({
    icons,
    t,
    getEditorState,
    setEditorState,
    externalOnClick,
    alignment,
    newFormattingToolbar,
  }) =>
    generateTextButtonProps({
      name: FORMATTING_BUTTONS.TITLE,
      styles: ['unstyled', HEADER_BLOCK.TWO, HEADER_BLOCK.THREE],
      type: BUTTON_STYLES.BLOCK,
      icons: [
        icons?.inactiveIconTitle || (() => TitleIcon({ newFormattingToolbar })),
        icons?.iconForTitleOne || (() => TitleOneIcon({ newFormattingToolbar })),
        icons?.iconForTitleTwo || (() => TitleTwoIcon({ newFormattingToolbar })),
      ],
      tooltipTextKey: 'TitleButton_Tooltip',
      t,
      getEditorState,
      setEditorState,
      externalOnClick,
      alignment,
    }),
  [FORMATTING_BUTTONS.BLOCKQUOTE]: ({
    icon,
    t,
    getEditorState,
    setEditorState,
    externalOnClick,
    alignment,
    newFormattingToolbar,
  }) =>
    generateTextButtonProps({
      name: 'Quote',
      styles: ['blockquote'],
      type: BUTTON_STYLES.BLOCK,
      icons: [icon || (() => BlockQuoteIcon({ newFormattingToolbar }))],
      tooltipTextKey: 'QuoteButton_Tooltip',
      t,
      getEditorState,
      setEditorState,
      externalOnClick,
      alignment,
    }),
  [FORMATTING_BUTTONS.ALIGN_LEFT]: ({
    icon,
    t,
    getEditorState,
    setEditorState,
    externalOnClick,
    alignment,
    newFormattingToolbar,
  }) =>
    generateTextButtonProps({
      name: FORMATTING_BUTTONS.ALIGN_LEFT,
      type: BUTTON_STYLES.ALIGNMENT,
      styles: ['left'],
      icons: [icon || (() => AlignLeftIcon({ newFormattingToolbar }))],
      tooltipTextKey: 'AlignTextLeftButton_Tooltip',
      t,
      getEditorState,
      setEditorState,
      externalOnClick,
      alignment,
    }),
  [FORMATTING_BUTTONS.ALIGN_CENTER]: ({
    icon,
    t,
    getEditorState,
    setEditorState,
    externalOnClick,
    alignment,
    newFormattingToolbar,
  }) =>
    generateTextButtonProps({
      name: FORMATTING_BUTTONS.ALIGN_CENTER,
      type: BUTTON_STYLES.ALIGNMENT,
      styles: ['center'],
      icons: [icon || (() => AlignTextCenterIcon({ newFormattingToolbar }))],
      tooltipTextKey: 'AlignTextCenterButton_Tooltip',
      t,
      getEditorState,
      setEditorState,
      externalOnClick,
      alignment,
    }),
  [FORMATTING_BUTTONS.ALIGN_RIGHT]: ({
    icon,
    t,
    getEditorState,
    setEditorState,
    externalOnClick,
    alignment,
    newFormattingToolbar,
  }) =>
    generateTextButtonProps({
      name: FORMATTING_BUTTONS.ALIGN_RIGHT,
      type: BUTTON_STYLES.ALIGNMENT,
      styles: ['right'],
      icons: [icon || (() => AlignRightIcon({ newFormattingToolbar }))],
      tooltipTextKey: 'AlignTextRightButton_Tooltip',
      t,
      getEditorState,
      setEditorState,
      externalOnClick,
      alignment,
    }),
  [FORMATTING_BUTTONS.ALIGN_JUSTIFY]: ({
    icon,
    t,
    getEditorState,
    setEditorState,
    externalOnClick,
    alignment,
    newFormattingToolbar,
  }) =>
    generateTextButtonProps({
      name: FORMATTING_BUTTONS.ALIGN_JUSTIFY,
      styles: ['justify'],
      type: BUTTON_STYLES.ALIGNMENT,
      icons: [icon || (() => AlignJustifyIcon({ newFormattingToolbar }))],
      tooltipTextKey: 'AlignTextJustifyButton_Tooltip',
      t,
      getEditorState,
      setEditorState,
      externalOnClick,
      alignment,
    }),
  [FORMATTING_BUTTONS.ORDERED_LIST]: ({
    icon,
    t,
    getEditorState,
    setEditorState,
    externalOnClick,
    alignment,
    newFormattingToolbar,
  }) =>
    generateTextButtonProps({
      name: 'NumberedList',
      styles: ['ordered-list-item'],
      type: BUTTON_STYLES.BLOCK,
      icons: [icon || (() => OrderedListIcon({ newFormattingToolbar }))],
      tooltipTextKey: 'OrderedListButton_Tooltip',
      t,
      getEditorState,
      setEditorState,
      externalOnClick,
      alignment,
    }),
  [FORMATTING_BUTTONS.UNORDERED_LIST]: ({
    icon,
    t,
    getEditorState,
    setEditorState,
    externalOnClick,
    alignment,
    newFormattingToolbar,
  }) =>
    generateTextButtonProps({
      name: 'BulletedList',
      styles: ['unordered-list-item'],
      type: BUTTON_STYLES.BLOCK,
      icons: [icon || (() => UnorderedListIcon({ newFormattingToolbar }))],
      tooltipTextKey: 'UnorderedListButton_Tooltip',
      t,
      getEditorState,
      setEditorState,
      externalOnClick,
      alignment,
    }),
};

export default TextButtonProps;
