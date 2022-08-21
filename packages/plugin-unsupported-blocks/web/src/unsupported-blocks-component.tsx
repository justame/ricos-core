import React from 'react';
import UnsupportedBlocks from './unsupported-blocks';
import { UNSUPPORTED_BLOCKS_TYPE } from 'wix-rich-content-plugin-commons';
import { DEFAULTS } from './defaults';
import type { RichContentTheme, TranslationFunction } from 'wix-rich-content-common';

export interface UnsupportedBlockProps {
  theme: RichContentTheme;
  t: TranslationFunction;
}

class UnsupportedBlocksComponent extends React.Component<UnsupportedBlockProps> {
  static type = { UNSUPPORTED_BLOCKS_TYPE };

  render() {
    const { theme, t } = this.props;
    return <UnsupportedBlocks theme={theme} t={t} />;
  }
}

export { UnsupportedBlocksComponent as Component, DEFAULTS };
