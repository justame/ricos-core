import React from 'react';
import AudioViewer from './audio-viewer';
import type { AudioPluginEditorConfig } from './types';
import { AUDIO_TYPE } from './types';
import { DEFAULTS } from './defaults';
import type {
  ComponentData,
  Helpers,
  RichContentTheme,
  Store,
  TranslationFunction,
} from 'wix-rich-content-common';
import { MediaItemErrorMsg } from 'wix-rich-content-ui-components';
import type { ContentBlock } from 'draft-js';

interface Props {
  componentData: ComponentData;
  settings: AudioPluginEditorConfig;
  theme: RichContentTheme;
  helpers: Helpers;
  store?: Store;
  block?: ContentBlock;
  isMobile: boolean;
  t?: TranslationFunction;
  isLoading?: boolean;
  tempData?: boolean;
}

class AudioComponent extends React.Component<Props> {
  static type = { AUDIO_TYPE };

  render() {
    const { componentData, settings, theme, helpers, isMobile, isLoading, t, store, block } =
      this.props;
    return (
      <>
        <AudioViewer
          componentData={componentData}
          settings={settings}
          theme={theme}
          helpers={helpers}
          isMobile={isMobile}
          isLoading={componentData?.tempData || isLoading}
          store={store}
          block={block}
          disabled
        />
        {componentData?.error && <MediaItemErrorMsg error={componentData?.error} t={t} />}
      </>
    );
  }
}

export { AudioComponent as Component, DEFAULTS };
