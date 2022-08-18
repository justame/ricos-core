import type { DraftEditorCommand, EditorProps } from '@wix/draft-js';
import { isEqual } from 'lodash';
import type {
  CommandHandler,
  KeyCommand,
  ModifierKey,
  PluginKeyBindings,
  PluginTextButtons,
} from 'wix-rich-content-common';
import { COMMANDS, MODIFIERS, KeyBindingUtil } from 'wix-rich-content-editor-common';

const COMMAND_BY_SHORTCUT: KeyCommand[] = [
  {
    command: COMMANDS.TITLE,
    modifiers: [MODIFIERS.COMMAND, MODIFIERS.SHIFT],
    key: '1',
  },
  {
    command: COMMANDS.SUBTITLE,
    modifiers: [MODIFIERS.COMMAND, MODIFIERS.SHIFT],
    key: '2',
  },
  {
    command: COMMANDS.PARAGRAPH,
    modifiers: [MODIFIERS.COMMAND, MODIFIERS.ALT],
    keyCode: 48,
    key: '0',
  },
  {
    command: COMMANDS.H1,
    modifiers: [MODIFIERS.COMMAND, MODIFIERS.ALT],
    keyCode: 49,
    key: '1',
  },
  {
    command: COMMANDS.H2,
    modifiers: [MODIFIERS.COMMAND, MODIFIERS.ALT],
    keyCode: 50,
    key: '2',
  },
  {
    command: COMMANDS.H3,
    modifiers: [MODIFIERS.COMMAND, MODIFIERS.ALT],
    keyCode: 51,
    key: '3',
  },
  {
    command: COMMANDS.H4,
    modifiers: [MODIFIERS.COMMAND, MODIFIERS.ALT],
    keyCode: 52,
    key: '4',
  },
  {
    command: COMMANDS.H5,
    modifiers: [MODIFIERS.COMMAND, MODIFIERS.ALT],
    keyCode: 53,
    key: '5',
  },
  {
    command: COMMANDS.H6,
    modifiers: [MODIFIERS.COMMAND, MODIFIERS.ALT],
    keyCode: 54,
    key: '6',
  },
  {
    command: COMMANDS.INCREASE_FONT_SIZE,
    modifiers: [MODIFIERS.COMMAND, MODIFIERS.ALT],
    keyCode: 190,
    key: '.',
  },
  {
    command: COMMANDS.DECREASE_FONT_SIZE,
    modifiers: [MODIFIERS.COMMAND, MODIFIERS.ALT],
    keyCode: 188,
    key: ',',
  },
  {
    command: COMMANDS.ALIGN_LEFT,
    modifiers: [MODIFIERS.COMMAND, MODIFIERS.SHIFT],
    key: 'l',
  },
  {
    command: COMMANDS.ALIGN_RIGHT,
    modifiers: [MODIFIERS.COMMAND, MODIFIERS.SHIFT],
    key: 'r',
  },
  {
    command: COMMANDS.ALIGN_CENTER,
    modifiers: [MODIFIERS.COMMAND, MODIFIERS.SHIFT],
    key: 'e',
  },
  {
    command: COMMANDS.JUSTIFY,
    modifiers: [MODIFIERS.COMMAND, MODIFIERS.SHIFT],
    key: 'j',
  },
  {
    command: COMMANDS.NUMBERED_LIST,
    modifiers: [MODIFIERS.COMMAND, MODIFIERS.SHIFT],
    key: '7',
  },
  {
    command: COMMANDS.BULLETED_LIST,
    modifiers: [MODIFIERS.COMMAND, MODIFIERS.SHIFT],
    key: '8',
  },
  {
    command: COMMANDS.BLOCKQUOTE,
    modifiers: [MODIFIERS.COMMAND, MODIFIERS.SHIFT],
    key: '9',
  },
];

const { hasCommandModifier, usesMacOSHeuristics, isCtrlKeyCommand } = KeyBindingUtil;

// eslint-disable-next-line @typescript-eslint/ban-types
function getModifiers(e: React.KeyboardEvent<{}>): ModifierKey[] {
  return [
    //@ts-ignore
    ...(hasCommandModifier(e) || e.metaKey ? [MODIFIERS.COMMAND] : []),
    //@ts-ignore
    ...(usesMacOSHeuristics() && isCtrlKeyCommand(e) ? [MODIFIERS.CTRL] : []),
    ...(e.shiftKey ? [MODIFIERS.SHIFT] : []),
    ...(e.altKey ? [MODIFIERS.ALT] : []),
  ];
}

function getCommandByShortcut(
  shortcut: {
    modifiers: ModifierKey[];
    key: string;
    keyCode: number;
  },
  bindingMap: KeyCommand[]
): DraftEditorCommand | null {
  const commands = bindingMap
    .filter(
      mapped =>
        (mapped.key === shortcut.key || mapped.keyCode === shortcut.keyCode) &&
        isEqual(mapped.modifiers, shortcut.modifiers)
    )
    .map(mapped => mapped.command) as DraftEditorCommand[];
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return commands.length > 0 ? commands[0] : undefined;
}

export const createKeyBindingFn = (customCommands: KeyCommand[]): EditorProps['keyBindingFn'] => {
  const bindingMap = [...COMMAND_BY_SHORTCUT, ...customCommands];
  return e => {
    const shortcut = { modifiers: getModifiers(e), key: e.key, keyCode: e.keyCode };
    return getCommandByShortcut(shortcut, bindingMap);
  };
};

// merges all plugin TextButton keyBindings into an object { commands: [{ cmd1 }, ...], commandHandlers: { cmd1: handler1, ... } }
export const initPluginKeyBindings = (pluginTextButtons: PluginTextButtons[]): PluginKeyBindings =>
  pluginTextButtons.reduce<PluginKeyBindings>(
    (bindings, buttonData, i) => {
      if (buttonData) {
        // iterate each button
        const buttonBindings = Object.keys(buttonData).reduce<PluginKeyBindings>(
          (buttonBindings, key) => {
            const keyBindings = buttonData[key].keyBindings;
            if (keyBindings && keyBindings.length > 0) {
              // array of commands per button
              const buttonCommands: KeyCommand[] = keyBindings.map(binding => ({
                ...binding.keyCommand,
                // avoid cross-plugin name collisions
                command: `${binding.keyCommand.command}_${i}`,
              }));
              // handlers per button
              const buttonCommandHandlers: Record<string, CommandHandler> = {};
              keyBindings.forEach(binding => {
                buttonCommandHandlers[`${binding.keyCommand.command}_${i}`] =
                  binding.commandHandler;
              });
              // merge all button commands and handlers
              return {
                commands: [...buttonBindings.commands, ...buttonCommands],
                commandHandlers: { ...buttonBindings.commandHandlers, ...buttonCommandHandlers },
              };
            }
            return buttonBindings;
          },
          { commands: [], commandHandlers: {} }
        );
        // merge all commands and handlers
        return {
          commands: [...bindings.commands, ...buttonBindings.commands],
          commandHandlers: { ...bindings.commandHandlers, ...buttonBindings.commandHandlers },
        };
      }
      return bindings;
    },
    { commands: [], commandHandlers: {} }
  );
