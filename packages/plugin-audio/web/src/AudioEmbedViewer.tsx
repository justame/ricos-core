import React, { useEffect } from 'react';
import type { ComponentData, Helpers, RichContentTheme } from 'wix-rich-content-common';
import { AUDIO_TYPE } from 'wix-rich-content-common';
import HtmlComponent from 'wix-rich-content-plugin-html/libs/HtmlComponent';
import { AUDIO_TYPES } from './consts';
import type { AudioPluginEditorConfig } from './types';

interface Props {
  componentData: ComponentData;
  settings: AudioPluginEditorConfig;
  theme: RichContentTheme;
  isMobile: boolean;
  helpers?: Helpers;
}

const AudioEmbedViewer: React.FC<Props> = ({
  isMobile,
  componentData,
  settings,
  theme,
  helpers,
}) => {
  const {
    audio: {
      src: { url },
    },
    html,
  } = componentData;

  const htmlCompProps = {
    componentData: {
      html,
      srcType: 'html',
      src: unescape(html),
      config: {
        link: { rel: '', url, target: '_blank' },
        height: '100%',
        width: '100%',
      },
    },
    settings,
    theme,
    isMobile,
  };

  useEffect(() => {
    helpers?.mediaPluginsDetails?.({
      pluginId: AUDIO_TYPE,
      creator: undefined,
      title: undefined,
      track_duration: undefined,
      type: AUDIO_TYPES.spotify,
      url,
    });
  }, []);

  return <HtmlComponent {...htmlCompProps} />;
};

export default AudioEmbedViewer;
