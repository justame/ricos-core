/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FunctionComponent } from 'react';
import React from 'react';
import classNames from 'classnames';
import redoIcon from './icons/RedoIcon';
import { InlineToolbarButton, FORMATTING_BUTTONS } from 'wix-rich-content-editor-common';
import { UNDO_REDO_TYPE } from './types';
import type { TranslationFunction, RichContentTheme, Helpers } from 'wix-rich-content-common';

interface RedoButtonProps {
  theme?: RichContentTheme;
  helpers?: Helpers;
  isMobile?: boolean;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config?: any;
  tabIndex?: number;
  t: TranslationFunction;
  isDisabled: () => boolean;
  onClick: (e: any & { ref?: any; render?: any }) => void;
}

const RedoButton: FunctionComponent<RedoButtonProps> = props => {
  const {
    isMobile,
    theme = {},
    helpers,
    children,
    className,
    config,
    tabIndex,
    t,
    isDisabled,
    onClick,
  } = props;
  const combinedClassName = classNames(theme.redo, className);
  const icon = config?.toolbar?.icons?.Redo || redoIcon();
  const disabled = isDisabled();

  if (isMobile) {
    return (
      <InlineToolbarButton
        disabled={disabled}
        onClick={onClick}
        isActive={false}
        theme={theme}
        helpers={helpers}
        isMobile={isMobile}
        tooltipText={t('RedoButton_Tooltip')}
        dataHook={'redoButton'}
        formattingButtonName={FORMATTING_BUTTONS.REDO}
        tabIndex={tabIndex}
        pluginType={UNDO_REDO_TYPE}
        icon={redoIcon}
      >
        {children}
      </InlineToolbarButton>
    );
  } else
    return (
      <button
        tabIndex={tabIndex}
        disabled={disabled}
        onClick={onClick}
        className={combinedClassName}
      >
        {isMobile && icon}
        {children}
      </button>
    );
};

export default RedoButton;
