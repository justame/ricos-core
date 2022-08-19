import type { CSSProperties, ComponentType } from 'react';
import type { Styles as ReactModalStyles } from 'react-modal';
import type { ComponentData, DraftContent, RicosEntity } from 'ricos-content';
import type {
  DecorationMode,
  TranslationFunction,
  Helpers,
  LegacyEditorPluginConfig,
  LegacyViewerPluginConfig,
} from '.';
import type { BoundingRect } from 'react-measure';
import type { ContentBlock, SelectionState, EditorState } from 'draft-js';
export { Link_Rel } from 'ricos-schema';

export type ModalStyles = ReactModalStyles;
export type Styles = Record<string, CSSProperties>;

export type RichContentTheme = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [propName: string]: any;
  modalTheme?: ModalStyles;
};

export type ClassNameStrategy = (
  componentData: ComponentData,
  theme: RichContentTheme,
  styles: Record<string, string>,
  isMobile: boolean,
  innerRCERenderedIn: string
) => string;

export type ContainerClassNameStrategy = (theme: RichContentTheme) => string;

export type { TranslationFunction, ResourceKey as LocaleResource } from 'i18next';

export type AnchorTarget = HTMLAnchorElement['target'];
export type RelValue = HTMLAnchorElement['rel'];
export type CustomAnchorScroll = (event: Event, anchor: string) => void;

export type GetEditorBounds = () => BoundingRect | undefined;

export type OpenModalFunction = (data: Record<string, unknown>) => void;
export type CloseModalFunction = () => void;

export type InnerModalType = {
  openInnerModal: OpenModalFunction;
  closeInnerModal: CloseModalFunction;
};

export type ModalDecorations = {
  decorationMode: DecorationMode;
  decorator: ComponentType;
}[];

export type OnConfirmFunction = (data) => {
  newBlock: ContentBlock;
  newSelection: SelectionState;
  newEditorState: EditorState;
};

export type TextDirection = 'rtl' | 'ltr' | 'auto';
export const isTextDirection = (dir: string): dir is TextDirection =>
  ['rtl', 'ltr', 'auto'].includes(dir);

export type TextAlignment = 'left' | 'center' | 'right' | 'justify';

export type InlineStyle =
  | 'bold'
  | 'underline'
  | 'italic'
  | 'spoiler'
  | 'not_bold'
  | 'not_italic'
  | 'not_underline';

export type onAtomicBlockFocus = (params: {
  blockKey?: string;
  type?: string;
  data?: RicosEntity['data'];
}) => void;

export interface SEOSettings {
  paywall?: {
    className?: string;
    index?: number;
  };
}

interface CommonContextType {
  theme: RichContentTheme;
  t: TranslationFunction;
  locale: string;
  localeContent?: string;
  anchorTarget?: AnchorTarget;
  relValue?: RelValue;
  customAnchorScroll?: CustomAnchorScroll;
  helpers: Helpers;
  isMobile: boolean;
  iframeSandboxDomain?: string;
}

export interface EditorContextType extends CommonContextType {
  config: LegacyEditorPluginConfig;
  setEditorState: (editorState: EditorState) => void;
  getEditorState: () => EditorState;
  getEditorBounds: GetEditorBounds;
  languageDir: TextDirection;
  shouldRenderOptimizedImages?: boolean;
  siteDomain?: string;
  setInPluginEditingMode: (shouldEnable: boolean) => void;
  getInPluginEditingMode: () => boolean;
  innerModal: InnerModalType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderInnerRCE: (params: any) => JSX.Element;
  innerRCERenderedIn?: string;
  disableKeyboardEvents?: (shouldEnable: boolean) => void;
  experiments?: AvailableExperiments;
  textWrap: boolean;
  onKeyboardShortcutClick: OnKeyboardShortcutClick;
}

export interface ViewerContextType extends CommonContextType {
  config: LegacyViewerPluginConfig;
  disabled?: boolean;
  seoMode?: SEOSettings;
  disableRightClick?: boolean;
  contentState?: DraftContent;
  textAlignment?: TextAlignment;
  experiments?: AvailableExperiments;
}

export type Experiment = {
  enabled: boolean;
  value?: string;
  namespace?: string;
};

export type AvailableExperiments = Record<string, Experiment>;

export type LinkPreviewData = {
  title?: string;
  description?: string;
  thumbnail_url?: string;
  provider_url?: string;
  html?: string;
};

export type LinkDataUrl = {
  url: string;
  target?: string;
  rel?: string;
};

export type AddLinkData = LinkDataUrl & { anchor?: string };

export type OnKeyboardShortcutClick = (param: { buttonName: string; pluginId?: string }) => void;
