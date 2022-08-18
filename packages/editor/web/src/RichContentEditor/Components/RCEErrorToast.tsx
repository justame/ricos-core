import React, { Component, Suspense } from 'react';
import { GlobalContext } from 'wix-rich-content-common';
import type { Pubsub, IMessage } from 'ricos-types';
const ErrorToast = React.lazy(() => import('../../../lib/ErrorToast'));

declare global {
  interface Window {
    __internalRicosOnError__: (error: IMessage) => void;
  }
}

type ErrorToastProps = {
  commonPubsub: Pubsub;
};

type ErrorToastState = {
  error: IMessage;
  errorCount: number;
};

export default class RCEErrorToast extends Component<ErrorToastProps, ErrorToastState> {
  timer?: NodeJS.Timeout;

  constructor(props) {
    super(props);
    this.state = { error: {}, errorCount: 0 };
  }

  static contextType = GlobalContext;

  componentDidMount() {
    const { commonPubsub } = this.props;
    window.__internalRicosOnError__ = this.onError;
    commonPubsub.subscribe('onMediaUploadError', this.onError);
  }

  componentWillUnmount() {
    const { commonPubsub } = this.props;
    commonPubsub.unsubscribe('onMediaUploadError', this.onError);
  }

  closeToastAfterDelay = () => {
    this.timer && clearTimeout(this.timer);
    this.timer = setTimeout(this.close, 4000);
  };

  onError = (error: IMessage) => {
    this.setState(state => ({ error, errorCount: state.errorCount + 1 }));
    this.closeToastAfterDelay();
  };

  close = () => {
    this.setState({ errorCount: 0 });
  };

  render() {
    const { isMobile } = this.context;
    const { error, errorCount } = this.state;
    if (errorCount <= 0) {
      return null;
    }
    return (
      <Suspense fallback={<div />}>
        <ErrorToast {...{ error, errorCount, onClose: this.close, isMobile }} />;
      </Suspense>
    );
  }
}
