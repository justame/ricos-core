import typeMapper from './typeMapper';
import type { MentionsPluginViewerConfig } from './types';
import { MENTION_TYPE } from './types';
import { DEFAULTS } from './defaultSettings';
import type { ViewerPluginCreator } from 'wix-rich-content-common';
export { MENTION_TYPE, typeMapper as mentionsTypeMapper };

/*
Interface Mention {
  name: string;
  slug: string;
  avatar?: string;
}

Interface Settings {
  mentionPrefix?: string;
  mentionTrigger?: string;
  getMentionLink?: (mention: Mention) => string;
  getMentions: (search: string) => Promise<Mention[]>
  onMentionClick: (mention: Mention) => void;
  repositionSuggestions: boolean, // when you are in iframe and want suggestions to be repositioned if they go out of iframe
  entryHeight: number, // suggestion entry height
  additionalHeight: number, // extra spacing in suggestion popup
}
*/

export const pluginMentions: ViewerPluginCreator<MentionsPluginViewerConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: MENTION_TYPE,
    typeMapper,
  };
};
