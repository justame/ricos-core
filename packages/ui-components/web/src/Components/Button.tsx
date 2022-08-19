import React from 'react';
import type { CSSProperties } from 'react';
import classNames from 'classnames';
import type { RichContentTheme } from 'wix-rich-content-common';
import { mergeStyles } from 'wix-rich-content-common';
import { BUTTON_SIZE } from '..';
import Styles from '../../statics/styles/button.scss';

export interface ButtonProps {
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
  isMobile?: boolean;
  dataHook: string;
  size?: string;
  ariaLabel?: string;
  tabIndex?: number;
  disabled?: boolean;
  secondary?: boolean;
  borderless?: boolean;
  theme: RichContentTheme;
  style?: CSSProperties;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  dataHook,
  ariaLabel,
  size = BUTTON_SIZE.small,
  children,
  tabIndex = 0,
  disabled = false,
  secondary = false,
  borderless = false,
  theme,
  isMobile = false,
  style,
}) => {
  const styles = mergeStyles({ styles: Styles, theme });
  const buttonStyle = secondary ? styles.button_secondary : styles.button_primary;
  return (
    <button
      aria-label={ariaLabel}
      data-hook={dataHook}
      onClick={onClick}
      tabIndex={tabIndex}
      disabled={disabled}
      className={classNames(buttonStyle, styles[size], {
        [styles.borderLess]: borderless,
        [styles.mobile]: isMobile,
      })}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;
