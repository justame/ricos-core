/* eslint-disable brace-style */
import type { ToolbarType, KeyboardShortcut } from '.';
import type { EventSource } from './orchestration';

type Topics = [
  'ricos.toolbars.functionality.buttonClick',
  'ricos.toolbars.instance.loaded',
  'ricos.toolbars.functionality.search'
];

export interface IRicosToolbar {
  readonly type: ToolbarType;

  publishButtonClick(buttonId: string): boolean;

  publishSearch(search: string): boolean;

  publishInstanceLoaded(): boolean;
}

export interface IRicosToolbars extends EventSource<Topics> {
  readonly static: IRicosToolbar;

  readonly inline: IRicosToolbar;

  readonly mobile: IRicosToolbar;

  readonly external: IRicosToolbar;

  readonly side: IRicosToolbar;

  readonly footer: IRicosToolbar;

  readonly plugin: IRicosToolbar;

  readonly pluginMenu: IRicosToolbar;

  readonly link: IRicosToolbar;

  byType(type: ToolbarType): IRicosToolbar;

  getShortcuts(): KeyboardShortcut[];
}
