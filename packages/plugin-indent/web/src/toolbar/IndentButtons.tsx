import type { FC, FunctionComponent } from 'react';
import React from 'react';
import {
  InlineToolbarButton,
  indentSelectedBlocks,
  FORMATTING_BUTTONS,
} from 'wix-rich-content-editor-common';
import decreaseIndentPluginIcon from '../icons/decreaseIndentPluginIcon';
import increaseIndentPluginIcon from '../icons/increaseIndentPluginIcon';
import { INDENT_TYPE } from '../types';
import type {
  TranslationFunction,
  RichContentTheme,
  GetEditorState,
  SetEditorState,
  Helpers,
} from 'wix-rich-content-common';

interface IndentButtonProps {
  getEditorState: GetEditorState;
  setEditorState: SetEditorState;
  theme: RichContentTheme;
  isMobile?: boolean;
  t: TranslationFunction;
  tabIndex?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config?: any;
  adjustment: number;
  tooltipKey: string;
  dataHook?: string;
  icon: (() => JSX.Element) | FC<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  helpers?: Helpers;
}

const IndentButton: FunctionComponent<IndentButtonProps> = props => {
  const {
    theme,
    helpers,
    isMobile,
    t,
    tabIndex,
    setEditorState,
    getEditorState,
    adjustment,
    tooltipKey,
    dataHook,
    icon,
  } = props;
  const { INCREASE_INDENT, DECREASE_INDENT } = FORMATTING_BUTTONS;
  return (
    <InlineToolbarButton
      onClick={() => {
        const editorState = getEditorState();
        const newState = indentSelectedBlocks(editorState, adjustment);
        if (newState !== editorState) {
          setEditorState(newState);
        }
      }}
      helpers={helpers}
      theme={theme}
      isMobile={isMobile}
      tooltipText={t(tooltipKey)}
      dataHook={dataHook}
      formattingButtonName={adjustment > 0 ? INCREASE_INDENT : DECREASE_INDENT}
      tabIndex={tabIndex}
      icon={icon}
      pluginType={INDENT_TYPE}
    />
  );
};

export const DecreaseIndentButton: FunctionComponent<IndentButtonProps> = props => (
  <IndentButton
    {...props}
    adjustment={-1}
    tooltipKey="decreaseIndentButton_Tooltip"
    dataHook="decreaseIndentButton"
    icon={decreaseIndentPluginIcon}
  />
);

export const IncreaseIndentButton: FunctionComponent<IndentButtonProps> = (
  props: IndentButtonProps
) => (
  <IndentButton
    {...props}
    adjustment={1}
    tooltipKey="increaseIndentButton_Tooltip"
    dataHook="increaseIndentButton"
    icon={increaseIndentPluginIcon}
  />
);
