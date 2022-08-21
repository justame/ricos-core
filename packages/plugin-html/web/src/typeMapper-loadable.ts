import { HTML_TYPE } from './types';
import type { PluginTypeMapper } from 'wix-rich-content-common';
import loadable from '@loadable/component';

export const typeMapper: PluginTypeMapper = () => ({
  [HTML_TYPE]: { component: loadable(() => import('./HtmlComponent')) },
});
