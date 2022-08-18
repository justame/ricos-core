import { isObject } from 'lodash';
import type { ButtonProps, ToolbarButtonProps, TranslationFunction } from 'wix-rich-content-common';
import { TOOLBARS, FORMATTING_BUTTONS, BUTTON_TYPES } from 'wix-rich-content-editor-common';
import getTextButtonProps from '../TextButtonProps';

export const createTextButtonProps = ({
  buttons: textButtonNames,
  textPluginButtons,
  defaultTextAlignment,
  t,
  config,
  setEditorState,
  getEditorState,
  experiments,
}: ButtonProps) => {
  const customSettings = config
    ?.getToolbarSettings?.({})
    .find(setting => setting.name === TOOLBARS.TEXT);
  const icons = customSettings?.getIcons?.() || {};
  const buttonPropsByName: Record<string, ToolbarButtonProps> = [
    FORMATTING_BUTTONS.BOLD,
    FORMATTING_BUTTONS.ITALIC,
    FORMATTING_BUTTONS.UNDERLINE,
    FORMATTING_BUTTONS.BLOCKQUOTE,
    FORMATTING_BUTTONS.ALIGN_LEFT,
    FORMATTING_BUTTONS.ALIGN_CENTER,
    FORMATTING_BUTTONS.ALIGN_RIGHT,
    FORMATTING_BUTTONS.ALIGN_JUSTIFY,
    FORMATTING_BUTTONS.ORDERED_LIST,
    FORMATTING_BUTTONS.UNORDERED_LIST,
  ].reduce<Record<string, ToolbarButtonProps>>(
    (list, name) => ({
      ...list,
      [name]: getTextButtonProps[name]({
        icon: icons[name],
        t,
        setEditorState,
        getEditorState,
        alignment: defaultTextAlignment,
        newFormattingToolbar: experiments?.newFormattingToolbar?.enabled,
      }),
    }),
    {}
  );
  // eslint-disable-next-line
  buttonPropsByName.Title = getTextButtonProps.Title({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: this should probably be an object based on how it's used in TextButtonProps.ts
    icons: [icons.inactiveIconTitle, icons.TitleOne, icons.TitleTwo],
    t,
    getEditorState,
    setEditorState,
    alignment: defaultTextAlignment,
    newFormattingToolbar: experiments?.newFormattingToolbar?.enabled,
  });

  buttonPropsByName['|'] = {
    type: BUTTON_TYPES.SEPARATOR,
    name: 'Separator',
  };

  const textPluginButtonProps = Object.entries(textPluginButtons).reduce<
    Record<string, ToolbarButtonProps>
  >(
    (list, [name, { externalizedButtonProps }]) =>
      externalizedButtonProps
        ? {
            ...list,
            [name]: {
              ...externalizedButtonProps,
              name,
            },
          }
        : list,
    {}
  );
  const buttonPropMap: Record<string, ToolbarButtonProps> = {
    ...buttonPropsByName,
    ...textPluginButtonProps,
  };
  return mapButtonNamesToProps(textButtonNames, buttonPropMap, t);
};

const mapButtonNamesToProps = (
  names: string[],
  buttonPropMap: Record<string, ToolbarButtonProps>,
  t: TranslationFunction,
  filter = (buttonProps, buttonName) => buttonProps[buttonName]
) => {
  return names.reduce((list, buttonName, idx) => {
    // grouped button props added as a sublist
    if (isObject(buttonName)) {
      const { name, tooltipKey, dataHook, buttons } = buttonName;
      return {
        ...list,
        [name]: {
          type: BUTTON_TYPES.GROUP,
          name,
          dataHook,
          tooltip: t(tooltipKey),
          buttonList: mapButtonNamesToProps(buttons, buttonPropMap, t, filter),
        },
      };
    }

    // multiple separators case
    const currentName = list[buttonName] ? `${buttonName}_${idx}` : buttonName;
    const button = filter(buttonPropMap, buttonName);
    return button ? { ...list, [currentName]: button } : list;
  }, {});
};

export const createPluginButtonPropMap = ({
  pluginButtonProps,
  pluginButtonNames,
  t,
}: {
  pluginButtonProps: ToolbarButtonProps[];
  pluginButtonNames: string[];
  t: TranslationFunction;
}) => {
  const buttonPropMap = pluginButtonProps.reduce<Record<string, ToolbarButtonProps>>(
    (list, button) => (button.name ? { ...list, [button.name]: button } : list),
    {}
  );
  return mapButtonNamesToProps(pluginButtonNames, buttonPropMap, t);
};
