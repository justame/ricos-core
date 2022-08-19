/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/aria-props */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from 'react';
import classNames from 'classnames';
import type { TextAlignment } from 'ricos-types';
import type {
  DraftContent,
  TranslationFunction,
  SEOSettings,
  Helpers,
  PluginTypeMapper,
  Decorator,
  RichContentTheme,
  AnchorTarget,
  RelValue,
  CustomAnchorScroll,
  LegacyViewerPluginConfig,
  OnErrorFunction,
  NormalizeConfig,
  PluginMapping,
  TextDirection,
  ViewerContextType,
  InlineStyleMapperFunction,
  AvailableExperiments,
  DocumentStyle,
} from 'wix-rich-content-common';
import {
  mergeStyles,
  AccessibilityListener,
  normalizeInitialState,
  getLangDir,
  SPOILER_TYPE,
  GlobalContext,
  Version,
  IMAGE_TYPE,
  GALLERY_TYPE,
  VIDEO_TYPE,
  createJustificationFixDecorator,
} from 'wix-rich-content-common';
import draftDefaultStyles from 'wix-rich-content-common/dist/statics/styles/draftDefault.rtlignore.scss';
import { convertToReact } from './utils/convertContentState';
import viewerStyles from '../statics/rich-content-viewer.scss';
import viewerAlignmentStyles from '../statics/rich-content-viewer-alignment.rtlignore.scss';
import rtlStyle from '../statics/rich-content-viewer-rtl.rtlignore.scss';
import { deprecateHelpers } from 'wix-rich-content-common/libs/deprecateHelpers';
import { combineMappers } from './utils/combineMappers';

export interface RichContentViewerProps {
  /** This is a legacy API, changes should be made also in the new Ricos Viewer API **/
  onLoad?: (any) => void;
  initialState?: DraftContent;
  isMobile?: boolean;
  renderStaticHtml?: boolean;
  helpers?: Helpers;
  platform?: string;
  locale: string;
  typeMappers: PluginTypeMapper[];
  inlineStyleMappers: InlineStyleMapperFunction[];
  decorators: Decorator[];
  t: TranslationFunction;
  theme: RichContentTheme;
  anchorTarget?: AnchorTarget;
  relValue?: RelValue;
  customAnchorScroll?: CustomAnchorScroll;
  config: LegacyViewerPluginConfig;
  textDirection?: TextDirection;
  direction?: TextDirection;
  textAlignment?: TextAlignment;
  disabled?: boolean;
  seoMode?: SEOSettings;
  iframeSandboxDomain?: string;
  onError: OnErrorFunction;
  addAnchors?: boolean | string;
  normalize: NormalizeConfig;
  localeResource?: Record<string, string>;
  experiments?: AvailableExperiments;
  isInnerRcv?: boolean;
  renderedInTable?: boolean;
  onHover?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setRef?: React.RefObject<any>;
  onMouseOver?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  documentStyle?: DocumentStyle;
  /** This is a legacy API, changes should be made also in the new Ricos Viewer API **/
}

class RichContentViewer extends Component<
  RichContentViewerProps,
  {
    raw?: DraftContent;
    error?: string;
    context: {
      experiments: AvailableExperiments;
      isMobile: boolean;
      t?: TranslationFunction;
    };
  }
> {
  styles: Record<string, string>;

  typeMappers: PluginMapping;

  static defaultProps: Partial<RichContentViewerProps> = {
    theme: {},
    decorators: [],
    typeMappers: [],
    inlineStyleMappers: [],
    locale: 'en',
    onError: err => {
      throw err;
    },
    normalize: {},
    config: {},
  };

  constructor(props) {
    super(props);
    const styles = { ...viewerStyles, ...viewerAlignmentStyles, ...rtlStyle };
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.typeMappers = combineMappers(props.typeMappers);
    const { experiments = {}, isMobile = false, t } = props;
    this.state = {
      context: { experiments, isMobile, t },
    };
  }

  static getInitialState = (props: RichContentViewerProps) => {
    const {
      initialState,
      anchorTarget,
      relValue,
      normalize: { disableInlineImages = false, removeInvalidInlinePlugins = false },
      config,
    } = props;
    const { uiSettings } = config;
    const disableImagesExpand = config[IMAGE_TYPE]?.disableExpand;
    const disableGalleryExpand = config[GALLERY_TYPE]?.disableExpand;
    const disableDownload =
      config[VIDEO_TYPE]?.disableDownload ||
      uiSettings?.disableRightClick ||
      uiSettings?.disableDownload;

    return initialState
      ? normalizeInitialState(initialState, {
          anchorTarget,
          relValue,
          disableInlineImages,
          removeInvalidInlinePlugins,
          disableDownload,
          disableImagesExpand,
          disableGalleryExpand,
        })
      : undefined;
  };

  getContextualData = (
    {
      t,
      theme,
      isMobile = false,
      anchorTarget,
      relValue,
      customAnchorScroll,
      config,
      helpers = {},
      locale,
      disabled,
      seoMode,
      iframeSandboxDomain,
      textAlignment,
      experiments,
    }: RichContentViewerProps,
    contentState?: DraftContent
  ): ViewerContextType => {
    deprecateHelpers(helpers, config);
    return {
      t,
      theme,
      isMobile,
      anchorTarget,
      relValue,
      customAnchorScroll,
      config,
      helpers,
      locale,
      disabled,
      seoMode,
      contentState,
      iframeSandboxDomain,
      disableRightClick: config?.uiSettings?.disableRightClick,
      textAlignment,
      experiments,
    };
  };

  static getDerivedStateFromProps(props: RichContentViewerProps) {
    return {
      raw: RichContentViewer.getInitialState(props),
    };
  }

  static getDerivedStateFromError(error: string) {
    return { error };
  }

  componentDidCatch(error, errorInfo) {
    console.error({ error, errorInfo });
  }

  componentDidMount() {
    this.reportDebuggingInfo();
  }

  reportDebuggingInfo() {
    if (typeof window === 'undefined') {
      return;
    }
    if (/debug/i.test(window.location.search) && !window.__RICOS_INFO__) {
      import(
        /* webpackChunkName: "debugging-info" */
        'wix-rich-content-common/libs/debugging-info'
      ).then(({ reportDebuggingInfo }) => {
        reportDebuggingInfo({
          version: Version.currentVersion,
          reporter: 'Rich Content Viewer',
          plugins: Object.keys(this.typeMappers),
          getContent: () => this.props.initialState,
          getConfig: () => this.props.config,
        });
      });
    }
  }

  render() {
    const {
      onError,
      config = {},
      onHover,
      isMobile,
      isInnerRcv,
      textDirection,
      direction,
      inlineStyleMappers,
      locale,
      addAnchors,
      renderedInTable,
      platform,
      t,
      typeMappers,
      setRef = () => {},
      onMouseOver = () => {},
      experiments = {},
    } = this.props;
    const decorators = [...this.props.decorators, createJustificationFixDecorator()];
    try {
      if (this.state.error) {
        onError(this.state.error);
        return null;
      }
      const { styles } = this;
      const wrapperClassName = classNames(styles.wrapper, {
        [styles.desktop]: !platform || platform === 'desktop',
      });
      const tableClassNames = classNames(
        styles.renderedInTable,
        viewerStyles.renderedInTable,
        draftDefaultStyles.renderedInTable
      );

      const editorClassName = classNames(styles.editor, renderedInTable && tableClassNames, {
        [styles.rtl]: textDirection === 'rtl',
        [styles.fixedTabSize]: experiments.fixedTabSize?.enabled,
      });

      const initSpoilers = config[SPOILER_TYPE]?.initSpoilersContentState;
      const SpoilerViewerWrapper = config[SPOILER_TYPE]?.SpoilerViewerWrapper;
      const contextualData = this.getContextualData(this.props, this.state.raw);
      const innerRCEViewerProps = {
        typeMappers,
        inlineStyleMappers,
        decorators,
        config,
        t,
        renderedInTable,
        isMobile,
      };

      const output = convertToReact(
        styles,
        textDirection,
        this.typeMappers,
        contextualData,
        decorators,
        inlineStyleMappers,
        config,
        initSpoilers,
        SpoilerViewerWrapper,
        { addAnchors, fixedTabSize: experiments.fixedTabSize?.enabled },
        innerRCEViewerProps,
        this.props.documentStyle
      );

      const dataId = isInnerRcv ? {} : { 'data-id': 'rich-content-viewer' };
      return (
        <GlobalContext.Provider value={this.state.context}>
          {/* eslint-disable-next-line jsx-a11y/mouse-events-have-key-events*/}
          <div
            className={wrapperClassName}
            dir={direction || getLangDir(locale)}
            onMouseEnter={e => onHover && onHover(e)}
            ref={setRef}
            onMouseOver={onMouseOver}
            {...dataId}
          >
            <div className={editorClassName}>{output}</div>
            <AccessibilityListener isMobile={isMobile} />
          </div>
        </GlobalContext.Provider>
      );
    } catch (err) {
      onError(err);
      return null;
    }
  }
}

export default RichContentViewer;
