export interface IPluginsEvents {
  publishPluginAdd({
    pluginId,
    params,
  }: {
    pluginId: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    params?: Record<string, any>;
  }): boolean;

  publishPluginDelete({ pluginId }: { pluginId: string }): boolean;

  publishPluginToolbarClick({
    pluginId,
    buttonName,
    value,
    nodeId,
  }: {
    pluginId: string;
    buttonName: string;
    nodeId: string;
    value?: string;
  }): boolean;

  publishPluginPopoverClick({
    pluginId,
    buttonName,
  }: {
    pluginId: string;
    buttonName: string;
  }): boolean;

  publishPluginPopoverTabSwitch({
    pluginId,
    buttonName,
  }: {
    pluginId: string;
    buttonName: string;
  }): boolean;

  publishPluginPopoverSearch({
    pluginId,
    searchTerm,
  }: {
    pluginId: string;
    searchTerm: string;
  }): boolean;

  publishPluginChangeSettings({
    pluginId,
    actionName,
    value,
  }: {
    pluginId: string;
    actionName: string;
    value: string;
  }): boolean;

  publishPluginLinkable({
    pluginId,
    link,
    nofollow,
    newTab,
    anchor,
  }: {
    pluginId: string;
    link?: string;
    nofollow?: boolean;
    newTab?: boolean;
    anchor?: string;
  }): boolean;
}
