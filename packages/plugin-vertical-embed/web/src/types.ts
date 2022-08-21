import type { EditorPluginConfig, ViewerPluginConfig } from 'wix-rich-content-common';

export const VERTICAL_EMBED_TYPE = 'wix-draft-plugin-vertical-embed';

interface VerticalPluginConfig {
  slimLayout?: boolean;
}

export interface VerticalEmbedPluginEditorConfig extends EditorPluginConfig, VerticalPluginConfig {
  getIsVisiblePromise?: (type: string, locale: string) => Promise<boolean>;
  exposeEmbedButtons?: string[];
  slimLayout?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  verticalsApi?: (type: 'event' | 'booking' | 'product') => any;
}
export interface VerticalEmbedPluginViewerConfig extends ViewerPluginConfig {
  changeBaseUrl?: (url: string) => string;
  disabled?: boolean;
  slimLayout?: boolean;
}
