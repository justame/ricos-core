const version ='2'
import type { Helpers } from 'ricos-types';
import type { RichContentProps } from '../RicosTypes';
import { createUploadEndBIData, createUploadStartBIData } from './mediaUploadBI';

export const applyBIGenerics =
  (getContentId: () => string | undefined) =>
  ({ helpers = {}, ...rest }: RichContentProps): RichContentProps => ({
    ...rest,
    helpers: {
      ...helpers,

      // Editor
      onPluginAdd: (pluginId: string, entryPoint: string) =>
        helpers.onPluginAdd?.(pluginId, entryPoint, version, getContentId()),
      onPluginAddStep: args =>
        helpers.onPluginAddStep?.({ ...args, version, contentId: getContentId() }),
      onPluginsPopOverTabSwitch: args =>
        helpers.onPluginsPopOverTabSwitch?.({ ...args, version, contentId: getContentId() }),
      onPluginsPopOverClick: args =>
        helpers.onPluginsPopOverClick?.({ ...args, version, contentId: getContentId() }),
      onChangePluginSettings: args =>
        helpers.onChangePluginSettings?.({ ...args, version, contentId: getContentId() }),
      mediaPluginsDetails: args =>
        helpers.mediaPluginsDetails?.({ ...args, version, contentId: getContentId() }),
      onPluginAddSuccess: (pluginId: string, entryPoint: string, params) =>
        helpers.onPluginAddSuccess?.(pluginId, entryPoint, params, version, getContentId()),

      onMediaUploadStart: (...args) => {
        const {
          correlationId,
          pluginId,
          fileSize,
          mediaType,
          timeStamp,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
        } = createUploadStartBIData(...args);
        helpers.onMediaUploadStart?.(
          correlationId,
          pluginId,
          fileSize,
          mediaType,
          version,
          getContentId()
        );
        return { correlationId, pluginId, fileSize, mediaType, timeStamp };
      },
      onMediaUploadEnd: (...args) => {
        const {
          correlationId,
          pluginId,
          duration,
          fileSize,
          mediaType,
          isSuccess,
          errorType,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
        } = createUploadEndBIData(...args);
        helpers.onMediaUploadEnd?.(
          correlationId,
          pluginId,
          duration,
          fileSize,
          mediaType,
          isSuccess,
          errorType,
          version,
          getContentId()
        );
      },
      onPluginAction: (eventName, params) =>
        helpers.onPluginAction?.(eventName, {
          ...params,
          version,
          contentId: getContentId(),
        }),
      onPluginChange: (pluginId: string, changeObj) =>
        helpers.onPluginChange?.(pluginId, changeObj, version, getContentId()),
      onToolbarButtonClick: args =>
        helpers.onToolbarButtonClick?.({ ...args, version, contentId: getContentId() }),
      onInlineToolbarOpen: args =>
        helpers.onInlineToolbarOpen?.({ ...args, version, contentId: getContentId() }),
      onPluginModalOpened: args =>
        helpers.onPluginModalOpened?.({ ...args, version, contentId: getContentId() }),
      onMenuLoad: args => {
        helpers.onMenuLoad?.({ ...args, version, contentId: getContentId() });
      },

      // Viewer
      onViewerLoaded: args =>
        helpers.onViewerLoaded?.({ ...args, version, contentId: getContentId() }),
      onViewerAction: (pluginId, actionName, value) =>
        helpers.onViewerAction?.(pluginId, actionName, value, getContentId()),
    } as Helpers,
  });
