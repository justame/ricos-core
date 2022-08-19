import type { FC, ReactChild } from 'react';
import React, { useContext, useEffect, useRef } from 'react';
import { configure, HotKeys, GlobalHotKeys } from 'react-hotkeys';
import { EditorContext, RicosContext, ShortcutsContext } from 'ricos-context';
import type { Shortcuts as ShortcutManager } from './models/shortcuts';

export type ShortcutsProps = {
  group: string;
  root?: boolean;
  children: ReactChild;
};

const defaultProps = {
  group: 'global',
  root: false,
  children: null,
  plugins: [],
};

// TODO: move to utils
const useComponentWillMount = (callback: () => void) => {
  const mounted = useRef(false);
  if (!mounted.current) callback();

  useEffect(() => {
    mounted.current = true;
  }, []);
};

export const Shortcuts: FC<ShortcutsProps> = (props: ShortcutsProps) => {
  const { group, root, children } = { ...defaultProps, ...props };

  const shortcuts = useContext(ShortcutsContext) as ShortcutManager;

  const { t } = useContext(RicosContext);
  const { getEditorCommands } = useContext(EditorContext);
  const commands = getEditorCommands();
  // TODO: get real platform
  const { handlers, keyMap } = shortcuts.getHotKeysProps(group, commands, t, 'macOs');

  useComponentWillMount(() => {
    if (root) {
      configure({
        ignoreTags: [],
        ignoreEventsCondition: () => false,
        logLevel: shortcuts.isDebugMode ? 'debug' : 'warn',
      });
    }
  });

  return (
    <>
      <HotKeys root={root} handlers={handlers} keyMap={keyMap}>
        {children}
      </HotKeys>
      {root && <GlobalHotKeys />}
    </>
  );
};
