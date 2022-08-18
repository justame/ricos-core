import type { ButtonProps, ToolbarButtonProps } from 'wix-rich-content-common';
import {
  createTextButtonProps,
  createPluginButtonPropMap,
} from './buttons/utils/createButtonProps';

export const createInsertPluginToolbarButtonProps = (
  pluginButtonProps: ToolbarButtonProps[],
  { buttons, t }: ButtonProps
) =>
  createPluginButtonPropMap({
    pluginButtonProps,
    pluginButtonNames: buttons,
    t,
  });

export const createFormattingToolbarButtonProps = ({
  buttons,
  textPluginButtons,
  defaultTextAlignment,
  t,
  config,
  setEditorState,
  getEditorState,
  experiments,
}) =>
  createTextButtonProps({
    buttons,
    textPluginButtons,
    defaultTextAlignment,
    t,
    config,
    setEditorState,
    getEditorState,
    experiments,
  });
