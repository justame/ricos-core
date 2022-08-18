import createDecorator from './createDecorator';
import type { PluginFunctions } from 'draft-js-plugins-editor';
import type {
  default as ResizableDecoratorType,
  ResizeablePluginConfig,
} from '@draft-js-plugins/resizeable';
import type { RichContentTheme } from 'wix-rich-content-common';

export interface ExtendedResizeablePluginConfig extends ResizeablePluginConfig {
  minWidth?: number;
  theme: RichContentTheme;
  isMobile: boolean;
}
const ResizableDecorator = (
  config: ExtendedResizeablePluginConfig
): ReturnType<typeof ResizableDecoratorType> => {
  const store: Partial<PluginFunctions> = {
    getEditorRef: undefined,
    getEditorState: undefined,
    setEditorState: undefined,
  };
  return {
    initialize: ({ getEditorRef, getEditorState, setEditorState }) => {
      store.getEditorRef = getEditorRef;
      store.getEditorState = getEditorState;
      store.setEditorState = setEditorState;
    },
    decorator: createDecorator({ config, store }),
  };
};

export default ResizableDecorator;
