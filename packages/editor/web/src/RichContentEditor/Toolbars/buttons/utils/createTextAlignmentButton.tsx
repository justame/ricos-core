import React, { Component } from 'react';
import type {
  GetEditorState,
  Helpers,
  RichContentTheme,
  SetEditorState,
  TranslationFunction,
} from 'wix-rich-content-common';
import { setTextAlignment } from 'wix-rich-content-editor-common';
import TextButton from '../TextButton';

export default ({
  alignment,
  Icon,
  tooltipTextKey,
}: {
  alignment: string;
  Icon;
  tooltipTextKey: string;
}) =>
  class TextAlignmentButton extends Component<{
    getEditorState: GetEditorState;
    setEditorState: SetEditorState;
    alignment?: string;
    onClick?: (alignment: string) => void;
    theme: RichContentTheme;
    helpers?: Helpers;
    isMobile?: boolean;
    t: TranslationFunction;
    tabIndex?: number;
  }> {
    isActive = () => this.props.alignment === alignment;

    handleClick = () => {
      const { onClick, getEditorState, setEditorState } = this.props;
      if (onClick) {
        onClick(alignment);
      } else {
        const newEditorState = setTextAlignment(getEditorState(), alignment);
        setEditorState(newEditorState);
      }
    };

    render() {
      const { theme, isMobile, t, tabIndex } = this.props;
      const tooltipText = t(tooltipTextKey);
      const dataHookText = `textAlignmentButton_${alignment}`;

      return (
        <TextButton
          icon={Icon}
          theme={theme}
          isMobile={isMobile}
          isActive={this.isActive}
          onClick={this.handleClick}
          tooltipText={tooltipText}
          dataHook={dataHookText}
          tabIndex={tabIndex}
        />
      );
    }
  };
