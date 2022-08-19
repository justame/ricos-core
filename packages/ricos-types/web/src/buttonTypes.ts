import type { ComponentType } from 'react';
import type { EditorState } from 'draft-js';
import type {
  ComponentData,
  ModalStyles,
  TranslationFunction,
  Pubsub,
  GetEditorBounds,
  ButtonType,
  ModifierKey,
  ToolbarType,
  ModalDecorations,
  LegacyEditorPluginConfig,
  SetEditorState,
  GetEditorState,
  AvailableExperiments,
  IMediaPluginService,
  Helpers,
  EditorPluginConfig,
  IFileUploader,
} from '.';

export type InlineButton = {
  type: ButtonType;
  keyName: string;
  icon?: (props) => JSX.Element;
  mobile?: boolean;
  mapComponentDataToButtonProps?: (componentData: ComponentData) => Partial<InlineButton>;
  tooltipTextKey?: string;
  multiple?: boolean;
  onFilesSelected?: (pubsub: Pubsub, files: File[]) => void;
  panelContent?: ComponentType;
  min?: number;
  max?: number;
  inputMax?: number;
  modalName?: string;
  modalStyles?: ModalStyles;
  t?: TranslationFunction;
  anchorTarget?: string;
  relValue?: string;
  disabled?: boolean;
  desktop?: boolean;
  getEditorBounds?: GetEditorBounds;
};

export type InlineUploadButton = InlineButton & {
  mediaPluginService?: IMediaPluginService;
  getUploader?: (
    helpers: Helpers,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    settings: Record<string, any> & EditorPluginConfig
  ) => IFileUploader;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  settings: Record<string, any> & EditorPluginConfig;
};

export type ToolbarButtonProps = {
  type?: string;
  tooltip?: string;
  toolbars?: ToolbarType[];
  getIcon?: () => ComponentType;
  getLabel?: () => string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (e: any & { ref?: any; render?: any }) => void;
  isActive?: () => boolean;
  isDisabled?: () => boolean;
  onChange?: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  dataHook?: string;
  name?: string;
};

export type InsertButton = ToolbarButtonProps & {
  name: string;
  componentData?: ComponentData;
  modalElement?: ComponentType;
  modalStyles?: ModalStyles;
  modalStylesFn?: (params: {
    buttonRef: HTMLElement;
    toolbarName: ToolbarType;
    pubsub?: Pubsub;
  }) => ModalStyles;
  section?: string;
  modalName?: string;
  modalDecorations?: ModalDecorations;
  multi?: boolean;
  addBlockHandler?: (editorState: EditorState) => void;
  mediaPluginService?: IMediaPluginService;
  getUploader?: (
    helpers: Helpers,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    settings: Record<string, any> & EditorPluginConfig
  ) => IFileUploader;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CreateInlineButtons = (config?: any) => InlineButton[];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CreateInsertButtons = (config?: any) => InsertButton[];

export type CommandHandler = (editorState: EditorState, event?: Event) => EditorState | void;

export interface KeyCommand {
  command: string;
  modifiers?: ModifierKey[];
  key: string;
  keyCode?: number;
}

export type KeyBinding = {
  keyCommand: KeyCommand;
  commandHandler: CommandHandler;
};

export interface TextButtonMapping {
  component?: ComponentType;
  isMobile?: boolean;
  position?: {
    mobile?: number;
    desktop?: number;
  };
  keyBindings?: KeyBinding[];
  externalizedButtonProps?: ToolbarButtonProps;
}

export type PluginTextButtons = { [buttonName: string]: TextButtonMapping };

export type TextButtonMapper = (pubsub?: Pubsub) => PluginTextButtons;

export interface PluginKeyBindings {
  commands: KeyCommand[];
  commandHandlers: Record<string, CommandHandler>;
}

export type CreatePluginToolbar = (config) => {
  name: string;
  InlineButtons?: InlineButton[];
  InlinePluginToolbarButtons?: InlineButton[]; // TODO: this looks like a duplicate. Should be removed.
  InsertButtons?: InsertButton[];
  TextButtonMapper?: TextButtonMapper;
  isMobile?: boolean;
};

export interface ButtonProps {
  buttons: string[];
  textPluginButtons: TextButtonMapping[];
  defaultTextAlignment: string;
  t: TranslationFunction;
  config: LegacyEditorPluginConfig;
  setEditorState: SetEditorState;
  getEditorState: GetEditorState;
  experiments: AvailableExperiments;
}
