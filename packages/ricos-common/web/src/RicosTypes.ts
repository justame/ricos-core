import type { RicosTheme } from './themeStrategy/themeTypes';
import type {
  DraftContent,
  OnErrorFunction,
  SEOSettings,
  LinkPanelSettings,
  GetToolbarSettings,
  AnchorTarget,
  RelValue,
  EditorPlugin,
  ViewerPlugin,
  onAtomicBlockFocus,
  CustomAnchorScroll,
  Link_Rel,
  AvailableExperiments,
  LinkPreviewData,
  CommandDescriptor,
} from 'ricos-types';
import type { EditorState, EditorProps } from 'draft-js';
import type { PreviewConfig } from 'wix-rich-content-preview';
import type { ReactElement, FC } from 'react';
import type { RicosCssOverride } from './types';
import type { DRAFT_EDITOR_PROPS } from './consts';
import type { RichContentEditorProps } from 'wix-rich-content-editor';
import type { RichContentViewerProps } from 'wix-rich-content-viewer';

export type RichContentProps = Partial<RichContentEditorProps | RichContentViewerProps>;

export interface RicosProps {
  /* Changes to this interface should also be reflected in the API docs */
  _rcProps?: RichContentProps; // For internal use by WixRicos only
  children?: ReactElement;
  content?: DraftContent;
  cssOverride?: RicosCssOverride;
  isMobile?: boolean;
  linkSettings?: LinkSettings;
  locale?: string;
  localeContent?: string;
  mediaSettings?: MediaSettings;
  onError?: OnErrorFunction;
  theme?: RicosTheme;
  textAlignment?: TextAlignment;
  onAtomicBlockFocus?: onAtomicBlockFocus;
  experiments?: AvailableExperiments;
  iframeSandboxDomain?: string;
  textWrap?: boolean;
  /* Changes to this interface should also be reflected in the API docs */
}

interface EditorEvents {
  subscribe: (
    event: string,
    callback: () => Promise<{ type: string; data: unknown }>
  ) => (event: string, callback: () => Promise<{ type: string; data: unknown }>) => void;
  unsubscribe: (event: string, callback: () => Promise<{ type: string; data: unknown }>) => void;
  dispatch: (event: string) => Promise<unknown>;
}

export interface RicosEditorProps extends RicosProps {
  /* Changes to this interface should also be reflected in the API docs */
  plugins?: EditorPlugin[];
  draftEditorSettings?: DraftEditorSettings;
  linkPanelSettings?: LinkPanelSettings;
  modalSettings?: ModalSettings;
  onChange?: OnContentChangeFunction;
  placeholder?: string;
  toolbarSettings?: ToolbarSettings;
  onBusyChange?: OnBusyChangeFunction;
  injectedContent?: DraftContent;
  maxTextLength?: number;
  editorEvents?: EditorEvents;
  sideBlockComponent?: FC<{ id: string }>;
  commands?: CommandDescriptor<unknown>[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onLoad?: (editor: any) => void;
  /* Changes to this interface should also be reflected in the API docs */
}

export interface RicosViewerProps extends RicosProps, Pick<RichContentViewerProps, 'addAnchors'> {
  /* Changes to this interface should also be reflected in the API docs */
  plugins?: ViewerPlugin[];
  preview?: PreviewConfig;
  seoSettings?: boolean | SEOSettings;
  textSelectionToolbar?: boolean;
  linkPreviewPopoverFetchData?: (url: string) => Promise<LinkPreviewData>;
  /* Changes to this interface should also be reflected in the API docs */
}

export interface ContentStateGetterArgs {
  shouldRemoveErrorBlocks?: boolean;
}

export type ContentStateGetter = (args?: ContentStateGetterArgs) => DraftContent;

export interface EditorDataInstance {
  getContentState: ContentStateGetter;
  getContentTraits: () => {
    isEmpty: boolean;
    isContentChanged: boolean;
    isLastChangeEdit: boolean;
  };
  getEditorState: () => EditorState;
  refresh: (editorState: EditorState, onError?: OnErrorFunction | undefined) => void;
  waitForUpdate: () => void;
  getContentStatePromise: () => Promise<DraftContent>;
}

export type OnContentChangeFunction = (content: DraftContent) => void;

export type OnBusyChangeFunction = (isBusy: boolean) => void;

// draft-js props - https://draftjs.org/docs/api-reference-editor
export type DraftEditorSettings = Pick<EditorProps, typeof DRAFT_EDITOR_PROPS[number]>;

export interface ModalSettings {
  openModal?: (data: Record<string, unknown>) => void;
  closeModal?: () => void;
  ariaHiddenId?: string;
  container?: HTMLElement;
  onModalOpen?: (data: Record<string, unknown>) => void;
  onModalClose?: () => void;
}

export interface ToolbarSettings {
  getToolbarSettings?: GetToolbarSettings;
  textToolbarContainer?: HTMLElement;
  useStaticTextToolbar?: boolean | { disabled: boolean };
}

export type FullscreenProps = { backgroundColor?: string; foregroundColor?: string };

export interface MediaSettings {
  pauseMedia?: boolean;
  disableRightClick?: boolean;
  disableDownload?: boolean;
  fullscreenProps?: FullscreenProps;
}

export interface LinkSettings {
  anchorTarget?: AnchorTarget;
  relValue?: RelValue;
  rel?: Link_Rel;
  customAnchorScroll?: CustomAnchorScroll;
}

export type TextAlignment = 'left' | 'right';
