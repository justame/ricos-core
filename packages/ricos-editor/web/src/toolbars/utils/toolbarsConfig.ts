import type { ToolbarSettings } from 'ricos-common';
import type { TextButtons } from 'wix-rich-content-common';
import { isiOS } from 'wix-rich-content-editor-common';
import { get } from 'lodash';

export const toolbarSettingsFromConfig = ({
  toolbarSettings,
  isMobile,
  textButtons,
  toolbarType,
}: {
  toolbarSettings: ToolbarSettings;
  isMobile?: boolean;
  textButtons?: TextButtons;
  toolbarType?: string | null;
}) => {
  const toolbarConfig = toolbarSettings
    ?.getToolbarSettings?.({ textButtons })
    .find(toolbar => toolbar?.name === toolbarType);
  const deviceName = !isMobile ? 'desktop' : isiOS() ? 'mobile.ios' : 'mobile.android';
  const shouldCreate = get(toolbarConfig?.shouldCreate?.(), deviceName, true);
  const getButtons = toolbarConfig?.getButtons
    ? get(toolbarConfig?.getButtons?.() as TextButtons, deviceName, [])
    : null;
  const getTextPluginButtons = get(toolbarConfig?.getTextPluginButtons?.(), deviceName, []);
  const buttonsOverrides = get(toolbarConfig?.buttonsOverrides?.(), deviceName, []);
  return { shouldCreate, getButtons, getTextPluginButtons, buttonsOverrides };
};
