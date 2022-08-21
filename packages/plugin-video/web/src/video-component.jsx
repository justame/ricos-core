import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { findDOMNode } from 'react-dom';
import { mergeStyles } from 'wix-rich-content-common';
import { MediaItemErrorMsg, Loader } from 'wix-rich-content-ui-components';
import VideoViewer from './video-viewer';
import styles from '../statics/styles/default-video-styles.scss';
import { VIDEO_TYPE_LEGACY, VIDEO_TYPE } from './types';
import { omit } from 'lodash';
import { isiOS } from 'wix-rich-content-editor-common';

const DEFAULTS = Object.freeze({
  config: {
    size: 'content',
    alignment: 'center',
  },
});

const RICOS_DEFAULTS = Object.freeze({
  containerData: {
    alignment: 'CENTER',
    width: {
      size: 'CONTENT',
    },
    textWrap: true,
  },
});

class VideoComponent extends React.Component {
  static type = { VIDEO_TYPE_LEGACY, VIDEO_TYPE };

  constructor(props) {
    super(props);
    const isPlayable = !props.blockProps;
    this.state = {
      isLoaded: false,
      isPlayable,
      iosFixKey: 1,
    };
  }

  componentDidMount() {
    this.handlePlayerFocus();
  }

  componentDidUpdate() {
    this.handlePlayerFocus();
  }

  handlePlayerFocus() {
    // eslint-disable-next-line react/no-find-dom-node
    const element = findDOMNode(this).querySelector('iframe, video');
    if (element) {
      element.tabIndex = -1;
    }
  }

  handleReady = player => {
    if (!this.state.isLoaded && !this.props.componentData.tempData) {
      this.setState({ isLoaded: true });
    }
    this.handleDuration(player);
  };

  handleDuration = player => {
    setTimeout(() => {
      const duration = player.getDuration();
      if (duration) {
        this.saveDurationToData(duration);
      } else {
        this.setState({ shouldRenderDurationFix: true });
      }
    }, 3000);
  };

  renderOverlay = styles => {
    return <div className={classNames(styles.video_overlay)} />;
  };

  renderLoader = () => {
    const {
      isLoading,
      componentData: { tempData, isCustomVideo },
    } = this.props;
    const loading = isLoading || tempData;
    return (
      <div className={this.styles.videoOverlay}>
        <Loader
          type={'medium'}
          isVerySlowFakeLoader={isCustomVideo}
          percent={this.props.loadingPercentage}
          disableProgress={!loading && !this.state.isLoaded}
        />
      </div>
    );
  };

  onReloadIosFix = () => {
    //fixing IOS bug in Safari: when replace video src the new video src is not load
    if (isiOS()) {
      this.setState({ iosFixKey: this.state.iosFixKey + 1 });
    }
  };

  onReload = () => {
    this.setState({ isLoaded: false });
    this.onReloadIosFix();
  };

  saveDurationToData = duration => {
    const { componentData } = this.props;
    this.props.store.update(
      'componentData',
      { ...omit(componentData, ['tempData']), duration },
      this.props.block.getKey()
    );
  };

  renderPlayer = () => {
    const { theme, componentData, disabled, settings, setComponentUrl } = this.props;
    return (
      <VideoViewer
        componentData={componentData}
        settings={settings}
        onReady={this.handleReady}
        disabled={disabled}
        theme={theme}
        setComponentUrl={setComponentUrl}
        onReload={this.onReload}
        isLoaded={this.state.isLoaded}
        key={this.state.iosFixKey}
      />
    );
  };

  renderPlayerDurationFix = () => {
    // In some instances the video doesn't completely load, and we don't get its duration. This is a fix for that. (happens in facebook)
    const { theme, componentData, settings } = this.props;
    const stylesHide = {
      width: 0,
      height: 0,
      position: 'absolute',
      overflow: 'hidden',
      visibility: 'hidden',
    };

    let timeoutId;
    const onReady = player => {
      const internalPlayer = player.getInternalPlayer();
      if (internalPlayer.play) {
        internalPlayer.play();
      } else {
        timeoutId = setTimeout(() => {
          // try again, sometimes it takes a while
          player.getInternalPlayer()?.play();
        }, 10000);
      }
    };

    return (
      <div style={stylesHide}>
        <VideoViewer
          componentData={componentData}
          theme={theme}
          settings={settings}
          onReady={onReady}
          onDuration={duration => {
            this.setState({ shouldRenderDurationFix: false });
            this.saveDurationToData(duration);
            clearTimeout(timeoutId);
          }}
          muted
        />
      </div>
    );
  };

  onKeyDown = e => {
    if (e.key === 'Enter' || e.key === ' ') {
      this.props.onClick();
    }
  };

  render() {
    this.styles = this.styles || mergeStyles({ styles, theme: this.props.theme });
    const {
      className,
      onClick,
      t,
      componentData: { error, tempData },
      isDraggable = true,
      isLoading,
    } = this.props;
    const { isPlayable, isLoaded, shouldRenderDurationFix } = this.state;
    const containerClassNames = classNames(this.styles.video_container, className || '');
    const loading = isLoading || tempData || !isLoaded;
    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
      <div
        data-hook="videoPlayer"
        onClick={onClick}
        className={containerClassNames}
        onKeyDown={this.onKeyDown}
        draggable={isDraggable}
      >
        {!isPlayable && this.renderOverlay(this.styles, this.props.t)}
        {this.renderPlayer()}
        {shouldRenderDurationFix ? this.renderPlayerDurationFix() : null}
        {loading && !error && this.renderLoader()}
        {error && <MediaItemErrorMsg error={error} t={t} />}
      </div>
    );
    /* eslint-enable jsx-a11y/no-static-element-interactions */
  }
}

VideoComponent.propTypes = {
  componentData: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  blockProps: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  setComponentUrl: PropTypes.func,
  store: PropTypes.object.isRequired,
  block: PropTypes.object.isRequired,
  isDraggable: PropTypes.bool,
  isLoading: PropTypes.bool,
  loadingPercentage: PropTypes.number,
};

export { VideoComponent as Component, DEFAULTS, RICOS_DEFAULTS };
