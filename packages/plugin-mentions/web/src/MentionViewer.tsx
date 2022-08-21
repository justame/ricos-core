import React, { Component } from 'react';
import MentionComponent from './MentionComponent';
import type { ComponentData, RichContentTheme } from 'wix-rich-content-common';
import type { Settings } from './createMentionsPlugin';

interface Props {
  componentData: ComponentData;
  settings: Settings;
  theme: RichContentTheme;
}

class MentionViewer extends Component<Props> {
  render() {
    return <MentionComponent mention={this.props.componentData.mention} {...this.props} />;
  }
}

export default MentionViewer;
