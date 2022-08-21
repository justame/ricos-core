import { Component as HtmlComponent } from './HtmlComponent';
import { HTML_TYPE } from './types';
import type { PluginTypeMapper } from 'wix-rich-content-common';
import type { ComponentType } from 'react';

export const typeMapper: PluginTypeMapper = () => ({
  [HTML_TYPE]: { component: HtmlComponent as ComponentType },
});
