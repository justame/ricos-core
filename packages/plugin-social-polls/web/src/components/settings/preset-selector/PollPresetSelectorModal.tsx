import React, { PureComponent } from 'react';
import type { Helpers } from 'wix-rich-content-common';
import { PollPresetSelector } from './PollPresetSelector';

interface Props {
  helpers: Helpers;
  onConfirm: (arg: unknown) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  componentData: Record<string, any>;
}

export class PollPresetSelectorModal extends PureComponent<Props> {
  closeModal = () => {
    this.props.helpers?.closeModal?.();
  };

  onPollAdd = data => {
    const { helpers, onConfirm } = this.props;
    onConfirm(data);
    helpers?.closeModal?.();
  };

  render() {
    return (
      <PollPresetSelector {...this.props} onPollAdd={this.onPollAdd} closeModal={this.closeModal} />
    );
  }
}
