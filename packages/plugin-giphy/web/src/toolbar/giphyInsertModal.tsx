import React, { Component } from 'react';
import GiphyApiInputModal from '../toolbar/giphyApiInputModal';
import type {
  Helpers,
  Pubsub,
  TranslationFunction,
  RichContentTheme,
} from 'wix-rich-content-common';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  componentData: Record<string, any>;
  nodeId?: string;
  helpers: Helpers;
  pubsub: Pubsub;
  onConfirm: (arg: unknown) => void;
  theme: RichContentTheme;
  t: TranslationFunction;
  isMobile: boolean;
  languageDir: string;
}

class GiphyInsertModal extends Component<Props> {
  closeModal = () => {
    this.props.helpers?.closeModal?.();
  };

  onGifAdd = gif => {
    const { componentData, pubsub, onConfirm } = this.props;
    if (onConfirm) {
      onConfirm({ ...componentData, gif });
    } else {
      pubsub.update('componentData', { gif });
    }
    this.closeModal();
  };

  render() {
    return (
      <GiphyApiInputModal
        onGifAdd={this.onGifAdd}
        onCloseRequested={this.closeModal}
        {...this.props}
      />
    );
  }
}

export default GiphyInsertModal;
