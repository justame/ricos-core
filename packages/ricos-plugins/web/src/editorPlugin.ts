import type {
  AddButton,
  EditorPlugin as EditorPluginType,
  FormattingToolbarButton,
  RicosEditorPlugin,
  PluginAddButton,
  PluginToolbar,
  LegacyEditorPluginConfig,
  TiptapEditorPlugin,
  RicosServices,
  ToolbarButton,
} from 'ricos-types';
import type { PluginServices } from './editorPlugins';
import { PluginTextButton } from './plugin-text-button';
import { RicosPluginAddButton } from './pluginAddButton';
import { RicosPluginToolbar } from './pluginToolbar';

export class EditorPlugin implements RicosEditorPlugin {
  private readonly plugin: EditorPluginType;

  private addButtons?: PluginAddButton[];

  private textButtons?: PluginTextButton[];

  private toolbars?: PluginToolbar[];

  services: PluginServices;

  static of(plugin: EditorPluginType, services: PluginServices): EditorPlugin {
    return new EditorPlugin(plugin, services);
  }

  private constructor(plugin: EditorPluginType, services: PluginServices) {
    this.plugin = plugin;
    this.services = services;
  }

  private initAddButtons() {
    if (this.plugin.getAddButtons) {
      this.addButtons = this.plugin
        .getAddButtons(this.plugin.config, this.services as RicosServices)
        .map((button: AddButton) => RicosPluginAddButton.of(button, this.services));
      this.addButtons?.map(b => b.register());
    }
  }

  // TODO: pass real platform
  private initTextButtons() {
    if (this.plugin.textButtons) {
      this.textButtons = this.plugin.textButtons.map(b =>
        PluginTextButton.of(b, this.services, 'macOs')
      );
      this.textButtons?.map(b => b.register());
    }
  }

  private getExtensionNames(): string[] {
    return (this.plugin as TiptapEditorPlugin).tiptapExtensions
      ?.filter(({ type }) => type === 'node')
      ?.map(({ name }) => name);
  }

  private initPluginToolbar() {
    if (this.plugin.toolbar) {
      this.toolbars = this.getExtensionNames()?.map(name =>
        RicosPluginToolbar.of(
          {
            buttons: this.plugin.toolbar?.getButtons(
              this.plugin.config,
              this.services as RicosServices
            ) as ToolbarButton[],
            isVisible: this.plugin.toolbar?.isVisible,
          },
          name,
          this.services as RicosServices
        )
      );
      this.toolbars?.map(toolbar => toolbar.register());
    }
  }

  register() {
    this.plugin.shortcuts?.map(shortcut => this.services.shortcuts.register(shortcut));
    this.initAddButtons();
    this.initTextButtons();
    this.initPluginToolbar();
  }

  unregister() {
    this.toolbars?.map(toolbar => toolbar.unregister());
    this.textButtons?.map(b => b.unregister());
    this.addButtons?.map(b => b.unregister());
    this.plugin.shortcuts?.map(shortcut => this.services.shortcuts.unregister(shortcut));
  }

  getType(): string {
    return this.plugin.type;
  }

  getTiptapExtensions() {
    return (this.plugin as TiptapEditorPlugin).tiptapExtensions?.map(extension => ({
      ...extension,
      settings: this.getConfig(),
    }));
  }

  getConfig(): LegacyEditorPluginConfig {
    return this.plugin.config;
  }

  getTextButtons(): FormattingToolbarButton[] {
    return this.textButtons || [];
  }

  getAddButtons() {
    return this.addButtons || [];
  }

  getToolbars() {
    return this.toolbars || [];
  }

  equals(plugin: RicosEditorPlugin) {
    return this.plugin.type === plugin.getType();
  }
}
