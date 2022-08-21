import { createInlineButtons } from './inline-buttons';
import { createInsertButtons } from './insert-buttons';
import type { CreatePluginToolbar, TranslationFunction } from 'wix-rich-content-common';
import type { DividerPluginEditorConfig } from '../types';

const createToolbar: CreatePluginToolbar = ({
  settings,
  styles,
  t,
}: {
  t: TranslationFunction;
  settings: DividerPluginEditorConfig;
  styles: Record<string, string>;
}) => {
  return {
    InlineButtons: createInlineButtons({ styles, t, settings }),
    InsertButtons: createInsertButtons({ t, settings }),
    name: 'divider',
  };
};

export default createToolbar;
