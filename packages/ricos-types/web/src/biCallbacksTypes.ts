import type { ToolbarType } from './toolbarEnums';
import type { OnPluginAction } from './pluginsBiCallbacksTypes';

export type PluginsCountSummary = Record<string, number>;

export interface BICallbackParams {
  version?: string;
  contentId?: string;
}

export type PluginAddParams =
  | {
      // Table
      columns: number;
      rows: number;
    }
  | {
      // Embeds
      link: string;
      service: string;
    }
  | {
      // Wix Embed
      id: unknown;
    }
  | {
      // Poll
      type: 'list' | 'grid';
    };

type EntryType = ToolbarType;

export interface onPluginAddStepArgs extends BICallbackParams {
  pluginId: string;
  pluginDetails: unknown;
  entryPoint: ToolbarType;
  entryType: EntryType;
  params?: PluginAddParams;
  step: 'FileUploadDialog' | 'PluginModal';
}

export interface pluginsPopoverArgs extends BICallbackParams {
  pluginId: string;
  buttonName: string;
}
export interface changePluginSettingsArgs extends BICallbackParams {
  pluginId: string;
  actionName: string;
  value: string;
}
export interface mediaPluginsDetailsArgs extends BICallbackParams {
  pluginId: string;
  creator?: string;
  title?: string;
  track_duration?: string;
  type: 'File Upload' | 'Spotify' | 'SoundCloud';
  url: string;
}

export interface onPluginDeleteArgs extends BICallbackParams {
  pluginId: string;
  pluginDetails: unknown;
}

export interface onViewerLoadedArgs extends BICallbackParams {
  isPreview: boolean;
  pluginsCount: PluginsCountSummary;
  version: string;
  url: string;
}

export interface onPluginModalOpenedArgs extends BICallbackParams {
  pluginId: string;
  pluginDetails: unknown;
  entryPoint: ToolbarType;
  entryType: EntryType;
}

export interface OnInlineToolbarOpen extends BICallbackParams {
  toolbarType: ToolbarType;
  pluginId?: string;
}

export interface onMenuLoadArgs extends BICallbackParams {
  menu: EntryType;
}

export interface onContentEditedArgs extends BICallbackParams {}
export interface onToolbarButtonClickArgs extends BICallbackParams {
  /** The name of the button the user clicked on (`Bold`, `Italic`, `SpoilerButton`, ...) */
  buttonName: string;
  /** Toolbar / Sidebar/ else */
  origin?: string;
  /** toolbar type (`FORMATTING`, `PLUGIN`, ...) */
  type?: ToolbarType;
  /** The new value that was changed (center, right...) */
  value?: string;
  /** Category of change (alignment / size / settings...) */
  category?: string;
  /** Plugin's Type (e.g. values of `LINK_TYPE`, `HASHTAG_TYPE`...) */
  pluginId?: string;
  /** Schema: Node's key. Draft: `blockKey` of plugin. Prose: attr's key */
  pluginUniqueId?: string;
  /** Additional specification of plugin */
  pluginDetails?: string;
}

export interface onKeyboardShortcutActionArgs extends BICallbackParams {
  /** The name of the button the user clicked on (`Bold`, `Italic`, `SpoilerButton`, ...) */
  buttonName: string;
  /** The new value that was changed (center, right...) */
  value?: string;
  /** Plugin's Type (e.g. values of `LINK_TYPE`, `HASHTAG_TYPE`...) */
  pluginId?: string;
  /** Ricos version */
  version?: string;
}

export interface BICallbacks {
  onPluginAdd?(pluginId: string, entryPoint: string, version: string, contentId?: string): void;
  onPluginAddSuccess?(
    pluginId: string,
    entryPoint: string,
    params: PluginAddParams,
    version: string,
    contentId?: string
  ): void;
  onPluginAddStep?(params: onPluginAddStepArgs): void;
  onPluginsPopOverTabSwitch?(params: pluginsPopoverArgs): void;
  onPluginsPopOverClick?(params: pluginsPopoverArgs): void;
  onChangePluginSettings?(params: changePluginSettingsArgs): void;
  mediaPluginsDetails?(params: mediaPluginsDetailsArgs): void;
  onPluginDelete?(params: onPluginDeleteArgs): void;
  onPublish?(
    postId: string | undefined,
    pluginsCount: Record<string, number> | undefined,
    pluginsDetails:
      | {
          type: string;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data: any;
        }[]
      | undefined,
    version: string,
    contentId?: string
  ): void;
  onViewerAction?(
    pluginId: string,
    actionName: ActionName,
    value: string,
    contentId?: string
  ): void;
  onViewerLoaded?(params: onViewerLoadedArgs): void;
  onOpenEditorSuccess?(version: string, toolbarType: ToolbarType, contentId?: string): void;
  onContentEdited?(params: onContentEditedArgs): void;
  /** evid: 3 - 'changePlugin' */
  onToolbarButtonClick?(params: onToolbarButtonClickArgs): void;
  onKeyboardShortcutAction?(params: onKeyboardShortcutActionArgs): void;
  onPluginChange?(
    pluginId: string,
    changeObject: { from: string; to: string },
    version: string,
    contentId?: string
  ): void;
  onMediaUploadStart?(
    correlationId: string,
    pluginId: string,
    fileSize: number | undefined,
    mediaType: string | undefined,
    version: string,
    contentId?: string
  ): void;
  onMediaUploadEnd?(
    correlationId: string,
    pluginId: string,
    duration: number,
    fileSize: number | undefined,
    mediaType: string | undefined,
    isSuccess: boolean,
    errorType: string | undefined,
    version: string,
    contentId?: string
  ): void;
  onPluginModalOpened?(params: onPluginModalOpenedArgs): void;
  onMenuLoad?(params: onMenuLoadArgs): void;
  onInlineToolbarOpen?(params: OnInlineToolbarOpen): void;
  onPluginAction?: OnPluginAction;
}

type ActionName = 'expand_gallery' | 'expand_image' | 'Click' | 'playAudio' | 'fileDownloaded';
