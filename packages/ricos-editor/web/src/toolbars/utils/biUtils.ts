import type { Helpers, ToolbarType, BICallbacks, OnAddPluginLink } from 'wix-rich-content-common';
import {
  Version,
  ANCHOR_CATEGORY,
  WEB_ADDRESS_CATEGORY,
  ADD_PLUGIN_LINK_BI,
} from 'wix-rich-content-common';
interface SimplifiedBICallbacks
  extends Omit<BICallbacks, 'onToolbarButtonClick' | 'onInlineToolbarOpen'> {
  onToolbarButtonClick: (
    name: string,
    toolbarType: ToolbarType,
    value?: string | boolean,
    pluginId?: string
  ) => void;
  onInlineToolbarOpen: (toolbarType: ToolbarType) => void;
  onAddPluginLink: OnAddPluginLink;
}

export const getBiFunctions = (helpers: Helpers, contentId?: string): SimplifiedBICallbacks => ({
  onInlineToolbarOpen: toolbarType =>
    helpers?.onInlineToolbarOpen?.({
      toolbarType,
      version: Version.currentVersion,
      contentId,
    }),
  onToolbarButtonClick: (name, toolbarType, value, pluginId) => {
    helpers?.onToolbarButtonClick?.({
      buttonName: name,
      pluginId,
      type: toolbarType,
      value: value === undefined ? undefined : typeof value === 'boolean' ? `${!value}` : value,
      version: Version.currentVersion,
      contentId,
    });
    if (pluginId && value && typeof value === 'string') {
      helpers?.onPluginAdd?.(pluginId, 'FormattingToolbar', Version.currentVersion, contentId);
      helpers?.onPluginAddSuccess?.(
        pluginId,
        'FormattingToolbar',
        value,
        Version.currentVersion,
        contentId
      );
    }
  },
  onAddPluginLink: (data, plugin_id) => {
    const { url, anchor, target, rel } = data;
    const params = anchor
      ? { anchor, category: ANCHOR_CATEGORY }
      : {
          link: url,
          rel,
          newTab: target === '_blank',
          category: WEB_ADDRESS_CATEGORY,
        };
    helpers.onPluginAction?.(ADD_PLUGIN_LINK_BI, {
      plugin_id,
      params,
      version: Version.currentVersion,
      contentId,
    });
  },
});
