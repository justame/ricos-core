/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import type { ReactElement, ReactNode } from 'react';
import cx from 'classnames';
import styles from './ToolbarButton.scss';
import Tooltip from 'wix-rich-content-common/libs/Tooltip';

type ToolbarButtonProps = {
  isMobile?: boolean;
  active?: boolean;
  disabled?: boolean;
  tooltip?: string;
  label?: string;
  onClick: (any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Icon: (props?: any) => JSX.Element;
  dataHook?: string;
  children?: ReactElement | ReactNode;
};

const ToolbarButton = ({
  isMobile = false,
  active,
  disabled,
  tooltip,
  onClick,
  Icon,
  dataHook,
  label,
  children,
}: ToolbarButtonProps) => {
  return (
    <Tooltip key={tooltip} content={tooltip} tooltipOffset={{ x: 0, y: -8 }}>
      <button
        className={cx(styles.toolbarButtonWrapper, {
          [styles.mobileToolbarButtonWrapper]: isMobile,
          [styles.active]: active,
          [styles.disabled]: disabled,
        })}
        onClick={onClick}
        onMouseDown={e => e.preventDefault()}
        data-hook={dataHook}
      >
        <div className={cx(styles.iconTextWrapper, { [styles.mobileToolbarButton]: isMobile })}>
          <Icon />
          {label && <div>{label}</div>}
          {children && children}
        </div>
      </button>
    </Tooltip>
  );
};

export default ToolbarButton;
