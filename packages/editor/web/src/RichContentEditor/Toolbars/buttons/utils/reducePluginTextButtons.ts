import type { PluginTextButtons } from 'wix-rich-content-common';

/**
 * @param {Array<any>} pluginTextButtons array of button data entries
 * @returns {object} { buttonName1: button1, ... }
 */
export const reducePluginTextButtons = (pluginTextButtons: PluginTextButtons[]) =>
  pluginTextButtons.reduce<PluginTextButtons>((buttons, buttonData) => {
    const buttonSet = Object.keys(buttonData).reduce<PluginTextButtons>(
      (singlePluginButtons, key) => ({ ...singlePluginButtons, [key]: buttonData[key] }),
      {}
    );
    return { ...buttons, ...buttonSet };
  }, {});
