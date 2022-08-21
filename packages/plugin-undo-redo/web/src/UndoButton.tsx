/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FunctionComponent } from 'react';
import React from 'react';
import classNames from 'classnames';
import undoIcon from './icons/UndoIcon';
import { InlineToolbarButton, FORMATTING_BUTTONS } from 'wix-rich-content-editor-common';
import { UNDO_REDO_TYPE } from './types';
import type { RichContentTheme, Helpers } from 'wix-rich-content-common/src';
import type { TranslationFunction } from 'i18next';

interface UndoButtonProps {
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

const UndoButton: FunctionComponent<UndoButtonProps> = props => {
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
  const combinedClassName = classNames(theme.undo, className);
  const icon = config?.toolbar?.icons?.Undo || undoIcon;
  const disabled = isDisabled();

  if (isMobile)
    return (
      <InlineToolbarButton
        disabled={disabled}
        onClick={onClick}
        isActive={false}
        helpers={helpers}
        theme={theme}
        isMobile={isMobile}
        tooltipText={t('UndoButton_Tooltip')}
        dataHook={'undoButton'}
        formattingButtonName={FORMATTING_BUTTONS.UNDO}
        tabIndex={tabIndex}
        pluginType={UNDO_REDO_TYPE}
        icon={icon}
      >
        {children}
      </InlineToolbarButton>
    );
  else
    return (
      <button
        tabIndex={tabIndex}
        disabled={disabled}
        onClick={onClick}
        className={combinedClassName}
      >
        {children}
      </button>
    );
};

export default UndoButton;
