import type { CSSProperties } from 'react';
import React from 'react';
import classNames from 'classnames';
import type { RichContentTheme } from 'wix-rich-content-common';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/loaders.rtlignore.scss';
import { isNumber } from 'lodash';

const styleLoader: CSSProperties = {
  position: 'absolute',
  top: '0',
};

function createFakeProgressStepper(
  onProgress: (percent: number) => void,
  approximateExpectedDuration = 5000
) {
  let lastTimeoutId: NodeJS.Timeout;
  let progress = 0;
  const startDate = Date.now();

  const getTimeoutDelay = () => {
    const linearStep = approximateExpectedDuration / 100;
    if (progress <= 25) {
      return linearStep / 4;
    } else if (progress <= 50) {
      return linearStep / 3;
    } else if (progress <= 90) {
      return linearStep / 1.5;
    } else {
      const timeRemaining = approximateExpectedDuration - (Date.now() - startDate);
      return timeRemaining / (100 - progress);
    }
  };

  const run = () => {
    progress += 1;

    if (progress >= 100) {
      return;
    }

    lastTimeoutId = setTimeout(run, getTimeoutDelay());
    onProgress(progress);
  };

  run();
  return () => {
    clearTimeout(lastTimeoutId);
  };
}

interface LoaderProps {
  type: string;
  theme?: RichContentTheme;
  isFastFakeLoader?: boolean;
  isVerySlowFakeLoader?: boolean;
  percent?: number;
  disableProgress?: boolean;
}

class Loader extends React.Component<LoaderProps> {
  static defaultProps = {
    type: 'mini',
    isFastFakeLoader: true,
  };

  state: { percent: number; localUrl?: string } = { percent: 1 };

  resetFakeLoader?: () => void;

  styles!: Record<string, string>;

  componentDidMount() {
    const { percent } = this.props;
    if (!isNumber(percent)) {
      let approximateExpectedDuration: number | undefined;
      if (this.props.isFastFakeLoader) {
        approximateExpectedDuration = 8500;
      }

      if (this.props.isVerySlowFakeLoader) {
        approximateExpectedDuration = 50000;
      }
      this.resetFakeLoader = createFakeProgressStepper(
        (percent: number) => this.setState({ percent }),
        approximateExpectedDuration
      );
    }
  }

  componentWillUnmount() {
    this.resetFakeLoader && this.resetFakeLoader();
  }

  initiateStyles() {
    if (!this.styles) {
      const theme = this.props.theme || {};
      this.styles = mergeStyles({ styles, theme });
    }
  }

  renderProgress() {
    const percent = isNumber(this.props.percent) ? this.props.percent : this.state.percent;
    return (
      <div>
        <div
          className={classNames(this.styles.progress, {
            [this.styles[this.props.type]]: this.props.type,
          })}
        >
          {`${percent}%`}
        </div>
      </div>
    );
  }

  render() {
    this.initiateStyles();
    const style = this.state.localUrl
      ? { ...styleLoader, backgroundImage: `url(${this.state.localUrl})` }
      : styleLoader;
    return (
      <div className={classNames(this.styles.loaderOverlay)} data-hook="loader" style={style}>
        <div
          className={classNames(this.styles.loader, {
            [this.styles[this.props.type]]: this.props.type,
          })}
        />
        {this.props.disableProgress ? null : this.renderProgress()}
      </div>
    );
  }
}

export default Loader;
