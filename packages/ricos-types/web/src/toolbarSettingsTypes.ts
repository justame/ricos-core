/* eslint-disable @typescript-eslint/no-explicit-any */
import type { EditorState } from 'draft-js';
import type { ComponentType } from 'react';
import type {
  ToolbarType,
  InsertButton,
  ToolbarButtonProps,
  TextButtonMapping,
  PluginTextButtons,
} from '.';

interface PlatformSettings<T> {
  desktop?: T;
  mobile?: {
    ios?: T;
    android?: T;
  };
}

export interface ToolbarSettingsFunctions {
  name: ToolbarType;
  shouldCreate?: () => PlatformSettings<boolean>;
  getVisibilityFn?: () => PlatformSettings<(editorState: EditorState) => boolean>;
  getPositionOffset?: () => PlatformSettings<{ x: number; y: number }>;
  getButtons?: () => PlatformSettings<any[]>;
  getTextPluginButtons?: () => PlatformSettings<{
    [key: string]: ComponentType | TextButtonMapping;
  }>;
  getInstance?: (config: any) => any;
  getDisplayOptions?: () => PlatformSettings<any>;
  getToolbarDecorationFn?: () => PlatformSettings<any>;
  getIcons?: () => Record<string, (props: any) => JSX.Element>;
  addPluginMenuConfig?: AddPluginMenuConfig;
  footerToolbarConfig?: FooterToolbarConfig;
  onClick?: () => void;
  buttonsOverrides?: () => PlatformSettings<any>;
}

export interface AddPluginMenuConfig {
  showSearch?: boolean;
  splitToSections?: boolean;
  tablePluginMenu?: boolean;
  horizontalMenuLayout?: boolean;
}

export interface FooterToolbarConfig {
  morePluginsMenu?: {
    splitToSections?: boolean;
    showSearch?: boolean;
  };
  pluginsToDisplayInToolbar?: string[];
}

export type TextGroupButtons = {
  name: string;
  buttons: string[];
};

export type DesktopTextButtons = (string | TextGroupButtons)[];

export type TextButtons = {
  desktop: DesktopTextButtons;
  mobile: string[];
};

export type PluginButton = {
  buttonSettings: InsertButton;
  component: ComponentType;
  blockType: string;
};

export type GetToolbarSettings = ({
  textButtons,
  pluginButtons,
  pluginButtonNames,
  pluginTextButtons,
  pluginButtonProps,
  tablePluginMenu,
}: {
  textButtons?: TextButtons;
  pluginButtons?: PluginButton[];
  pluginButtonNames?: string[];
  pluginTextButtons?: PluginTextButtons;
  pluginButtonProps?: ToolbarButtonProps[];
  tablePluginMenu?: boolean;
}) => ToolbarSettingsFunctions[];
