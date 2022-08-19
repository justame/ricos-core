/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import type { ReactElement } from 'react';
import React, { Component } from 'react';
import classNames from 'classnames';
import { KEYS_CHARCODE } from 'wix-rich-content-editor-common';
import styles from './ToolbarContainerNew.scss';

interface StaticToolbarContainerProps {
  children: ReactElement;
  isMobile?: boolean;
  focusEditor: () => void;
}

interface State {
  keyForRerender: boolean;
}

class StaticToolbarContainer extends Component<StaticToolbarContainerProps, State> {
  toolbarContainerRef?: HTMLDivElement | null;

  constructor(props) {
    super(props);
    this.state = { keyForRerender: true };
  }

  componentDidMount() {
    const { isMobile } = this.props;
    !isMobile && window.addEventListener('resize', this.onResizeWindow);
  }

  componentWillUnmount() {
    const { isMobile } = this.props;
    !isMobile && window.removeEventListener('resize', this.onResizeWindow);
  }

  onResizeWindow = () => {
    const { keyForRerender } = this.state;
    this.setState({ keyForRerender: !keyForRerender });
  };

  setToolbarContainerRef = ref => (this.toolbarContainerRef = ref);

  onKeyDown = e => {
    if (e.keyCode === KEYS_CHARCODE.ESCAPE) {
      this.props.focusEditor?.();
    }
  };

  render() {
    const { children, isMobile } = this.props;
    return (
      <div
        key={`${this.state.keyForRerender}`}
        data-hook="static-toolbar"
        tabIndex={0}
        ref={this.setToolbarContainerRef}
        className={classNames(
          styles.container,
          styles.staticContainer,
          isMobile && styles.staticContainerMobile
        )}
        onKeyDown={this.onKeyDown}
      >
        {children}
      </div>
    );
  }
}

export default StaticToolbarContainer;
