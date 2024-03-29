import {
  getToolbarTheme,
  TOOLBARS,
  DISPLAY_MODE,
  mergeToolbarSettings,
  isiOS,
} from 'wix-rich-content-editor-common';
import { withToolbarType } from './utils';
import { getDefaultToolbarSettings } from './default-toolbar-settings';
import { mobileTextButtonList, desktopTextButtonList, pluginButtonNames } from './buttons';
import { reducePluginTextButtons } from './buttons/utils';
import { get } from 'lodash';
import type {
  PluginButton,
  EditorContextType,
  ToolbarButtonProps,
  TextButtons,
  Pubsub,
  PluginTextButtons,
  AvailableExperiments,
} from 'wix-rich-content-common';
import type { EditorProps } from 'draft-js';
import type { TextAlignment } from 'ricos-types';

const createEditorToolbars = ({
  buttons,
  textAlignment,
  refId,
  context,
  pluginButtonProps,
  isInnerRCE,
  tablePluginMenu,
  pubsub,
  experiments,
  focusEditor,
}: {
  buttons: {
    pluginButtons: PluginButton[];
    pluginTextButtons: PluginTextButtons[];
  };
  textAlignment: TextAlignment;
  refId: number;
  context: EditorContextType;
  pluginButtonProps: ToolbarButtonProps[];
  isInnerRCE?: boolean;
  tablePluginMenu?: boolean;
  pubsub: Pubsub;
  experiments?: AvailableExperiments;
  focusEditor?: () => void;
}) => {
  const { uiSettings = {}, getToolbarSettings = () => [] } = context.config;
  const { pluginButtons, pluginTextButtons } = buttons;

  const { isMobile, theme = {}, helpers } = context;

  const textButtons: TextButtons = {
    mobile: mobileTextButtonList,
    desktop: desktopTextButtonList,
  };

  const pluginTextButtonMap = reducePluginTextButtons(pluginTextButtons);

  const defaultSettings = getDefaultToolbarSettings({
    pluginButtons,
    pluginButtonNames,
    textButtons,
    pluginTextButtons: pluginTextButtonMap,
    pluginButtonProps,
    tablePluginMenu,
  });
  const customSettings = getToolbarSettings({
    pluginButtons,
    pluginButtonNames,
    textButtons,
    pluginTextButtons: pluginTextButtonMap,
    pluginButtonProps,
  });
  if (tablePluginMenu) {
    const sideToolbarSettings = customSettings.find(setting => setting.name === TOOLBARS.SIDE);
    const pluginMenuSettings = { tablePluginMenu, horizontalMenuLayout: true };
    !sideToolbarSettings
      ? customSettings.push({ name: TOOLBARS.SIDE, addPluginMenuConfig: pluginMenuSettings })
      : (sideToolbarSettings.addPluginMenuConfig = pluginMenuSettings);
  }
  const toolbarSettings = mergeToolbarSettings({ defaultSettings, customSettings });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const toolbars: any = {};
  const deviceName = !isMobile ? 'desktop' : isiOS() ? 'mobile.ios' : 'mobile.android';

  const shouldCreateExternalToolbar = (name: TOOLBARS) =>
    name === TOOLBARS.FORMATTING && isInnerRCE;

  toolbarSettings
    .filter(({ name }) => name !== TOOLBARS.PLUGIN)
    .filter(
      ({ shouldCreate, name }) =>
        shouldCreateExternalToolbar(name) ||
        get(shouldCreate?.(), deviceName, true) ||
        name === TOOLBARS.SIDE
    )
    .forEach(
      ({
        name,
        getButtons,
        getTextPluginButtons,
        getPositionOffset,
        getVisibilityFn,
        getInstance,
        getDisplayOptions,
        getToolbarDecorationFn,
        addPluginMenuConfig,
        footerToolbarConfig,
        onClick,
        shouldCreate,
      }) => {
        toolbars[name] = getInstance?.({
          ...context,
          helpers: withToolbarType(helpers, name),
          displayOptions: get(getDisplayOptions?.(), deviceName, {
            displayMode: DISPLAY_MODE.NORMAL,
          }),
          toolbarDecorationFn: get(getToolbarDecorationFn?.(), deviceName, () => null),
          textPluginButtons: get(getTextPluginButtons?.(), deviceName, []),
          offset: get(getPositionOffset?.(), deviceName, { x: 0, y: 0 }),
          visibilityFn: get(getVisibilityFn?.(), deviceName, () => true),
          buttons: get(getButtons?.(), deviceName, []),
          theme: { ...getToolbarTheme(theme, name.toLowerCase()), ...theme },
          defaultTextAlignment: textAlignment,
          pluginButtons,
          uiSettings,
          pubsub,
          refId,
          addPluginMenuConfig,
          footerToolbarConfig,
          onClick,
          experiments,
          focusEditor,
          shouldNotDisplay: !get(shouldCreate?.(), deviceName, true),
        });
      }
    );

  return toolbars;
};

export default createEditorToolbars;
