/* eslint-disable max-len */
import type { ReactElement, ReactNode, Ref, FC } from 'react';
import React, { Component } from 'react';
import classNames from 'classnames';
import ToolbarButton from './ToolbarButton';
import DropdownArrowIcon from '../Icons/DropdownArrowIcon';
import Styles from '../../statics/styles/inline-toolbar-button.scss';
import type { Helpers } from 'wix-rich-content-common';
import { mergeStyles } from 'wix-rich-content-common';

type InlineToolbarButtonProps = {
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isActive?: boolean;
  theme?: Record<string, string>;
  dataHook?: string;
  isMobile?: boolean;
  tooltipText: string;
  tabIndex?: number;
  icon: (() => JSX.Element) | FC<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  forwardRef?: Ref<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  children?: ReactElement | ReactNode;
  disabled?: boolean;
  buttonContent?: string;
  showArrowIcon?: boolean;
  helpers?: Helpers;
  pluginType?: string;
  formattingButtonName?: string;
};

class InlineToolbarButton extends Component<InlineToolbarButtonProps> {
  styles: Record<string, string>;

  constructor(props) {
    super(props);
    const { buttonStyles = {} } = props.theme || {};
    const styles = mergeStyles({ styles: Styles, theme: props.theme });

    this.styles = {
      button: classNames(
        styles.inlineToolbarButton,
        buttonStyles.inlineToolbarButton,
        buttonStyles.pluginToolbarButton
      ),
      buttonWrapper: classNames(
        styles.inlineToolbarButton_wrapper,
        buttonStyles.inlineToolbarButton_wrapper,
        buttonStyles.pluginToolbarButton_wrapper
      ),
      icon: classNames(
        styles.inlineToolbarButton_icon,
        buttonStyles.inlineToolbarButton_icon,
        buttonStyles.pluginToolbarButton_icon
      ),
      active: classNames(
        styles.inlineToolbarButton_active,
        buttonStyles.inlineToolbarButton_active,
        buttonStyles.pluginToolbarButton_active
      ),
      menuButton: classNames(
        styles.inlineToolbarButton_menuButton,
        styles.inlineToolbarButton_icon,
        buttonStyles.inlineToolbarButton_icon,
        buttonStyles.inlineToolbarButton_menuButton,
        buttonStyles.pluginToolbarButton_icon
      ),
      arrowIcon: classNames(
        styles.inlineToolbarButton_icon,
        styles.inlineToolbarDropdownButton_arrowIcon,
        buttonStyles.inlineToolbarButton_icon,
        buttonStyles.pluginToolbarButton_icon
      ),
      arrowIconOpen: styles.inlineToolbarDropdownButton_arrowIcon_isOpen,
    };
  }

  preventDefault = event => event.preventDefault();

  onClick: InlineToolbarButtonProps['onClick'] = e => {
    const { onClick, helpers, pluginType, dataHook, formattingButtonName, isActive, children } =
      this.props;
    helpers?.onToolbarButtonClick?.({
      buttonName: formattingButtonName || dataHook || '',
      pluginId: pluginType,
      value: children ? undefined : String(!isActive),
    });
    onClick?.(e);
  };

  render() {
    const {
      isActive,
      tooltipText,
      dataHook,
      tabIndex,
      icon: Icon,
      forwardRef,
      disabled,
      buttonContent,
      showArrowIcon,
    } = this.props;
    const { styles } = this;
    const arrowIcon = (
      <span
        className={classNames(styles.arrowIcon, {
          [styles.arrowIconOpen]: isActive,
          [styles.active]: isActive,
        })}
      >
        <DropdownArrowIcon />
      </span>
    );
    const iconClassNames = classNames(styles.icon, {
      [styles.active]: isActive,
    });
    const buttonTextContent = buttonContent || (
      <div className={iconClassNames}>
        <Icon />
      </div>
    );
    const menuButtonClassNames = classNames(styles.menuButton, {
      [styles.active]: isActive,
    });

    const wrapperClassNames = classNames(styles.buttonWrapper, { [styles.active]: isActive });

    const isMenu = !!showArrowIcon;
    const codeBlockButton = (
      /* eslint-disable jsx-a11y/no-static-element-interactions */
      <div className={wrapperClassNames}>
        <button
          disabled={disabled}
          tabIndex={tabIndex}
          aria-label={tooltipText}
          aria-pressed={isActive}
          data-hook={dataHook}
          onClick={this.onClick}
          className={styles.button}
          ref={forwardRef}
          onMouseDown={this.preventDefault}
        >
          {isMenu ? (
            <div className={menuButtonClassNames}>
              {buttonTextContent}
              {arrowIcon}
            </div>
          ) : (
            buttonTextContent
          )}
        </button>
        {this.props.children}
      </div>
    );
    /* eslint-enable jsx-a11y/no-static-element-interactions */
    return <ToolbarButton tooltipText={tooltipText} button={codeBlockButton} />;
  }
}

export default React.forwardRef<InlineToolbarButton, InlineToolbarButtonProps>((props, ref) => (
  <InlineToolbarButton forwardRef={ref} {...props} />
));
