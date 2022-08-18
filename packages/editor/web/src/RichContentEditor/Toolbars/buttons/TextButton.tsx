import React, { Component } from 'react';
import classNames from 'classnames';
import type { RichContentTheme } from 'wix-rich-content-common';
import { mergeStyles } from 'wix-rich-content-common';
import { ToolbarButton } from 'wix-rich-content-editor-common';
import styles from 'wix-rich-content-editor-common/dist/statics/styles/inline-toolbar-button.scss';

export default class TextButton extends Component<{
  icon: (props) => JSX.Element;
  onClick: (event) => void;
  isActive?: () => boolean;
  theme: RichContentTheme;
  tooltipOffset?: { x: number; y: number };
  tooltipText?: string;
  dataHook?: string;
  tabIndex?: number;
  isMobile?: boolean;
}> {
  styles: Record<string, string>;

  constructor(props) {
    super(props);
    const { buttonStyles } = props.theme || {};
    this.styles = mergeStyles({ styles, theme: buttonStyles });
  }

  static defaultProps = {
    tabIndex: 0,
  };

  isActive = () => {
    const { isActive } = this.props;
    return isActive ? isActive() : false;
  };

  handleClick = event => {
    const { onClick } = this.props;
    onClick && onClick(event);
  };

  preventBubblingUp = event => event.preventDefault();

  render() {
    const { styles } = this;
    const { icon: Icon, tooltipText, dataHook, tabIndex, tooltipOffset } = this.props;
    const iconClassNames = classNames(styles.inlineToolbarButton_icon, {
      [styles.inlineToolbarButton_active]: this.isActive(),
    });

    const wrapperClassNames = classNames(this.styles.inlineToolbarButton_wrapper, {
      [styles.inlineToolbarButton_active]: this.isActive(),
    });

    /* eslint-disable jsx-a11y/no-static-element-interactions */
    const textButton = (
      <div className={wrapperClassNames} onMouseDown={this.preventBubblingUp}>
        <button
          tabIndex={tabIndex}
          aria-label={tooltipText}
          aria-pressed={this.isActive()}
          className={styles.inlineToolbarButton}
          data-hook={dataHook}
          onClick={this.handleClick}
        >
          <div className={iconClassNames}>
            <Icon />
          </div>
        </button>
      </div>
    );
    /* eslint-enable jsx-a11y/no-static-element-interactions */

    return (
      <ToolbarButton tooltipOffset={tooltipOffset} tooltipText={tooltipText} button={textButton} />
    );
  }
}
