import type { CSSProperties, Ref } from 'react';
import React, { Component } from 'react';
import classNames from 'classnames';
import type { RichContentTheme } from 'wix-rich-content-common';
import { mergeStyles } from 'wix-rich-content-common';
import Tooltip from 'wix-rich-content-common/libs/Tooltip';
import { ErrorIcon, SearchIcon } from '../Icons';
import textInputStyles from '../../statics/styles/text-input.scss';
import { omit } from 'lodash';

interface TextInputProps {
  inputRef?: Ref<HTMLInputElement>;
  theme: RichContentTheme;
  error?: string;
  showTooltip: boolean;
  showErrorIcon: boolean;
  onChange?: (e) => void;
  getTarget?: boolean;
  searchIcon?: boolean;
  dataHook?: string;
  placeholder?: string;
  type?: string; // TODO: ensure type specifity
  id?: string; // TODO: ensure type specifity
  onKeyPress?: (e) => void;
  onDoubleClick?: (text) => void;
  value?: string;
  autoComplete?: string;
  style?: CSSProperties;
}
export default class TextInput extends Component<TextInputProps, { focusSearchIcon: boolean }> {
  static defaultProps = {
    showTooltip: true,
    showErrorIcon: true,
  };

  constructor(props: TextInputProps) {
    super(props);
    this.state = {
      focusSearchIcon: true,
    };
  }

  handleOnChange = event => {
    const { onChange, getTarget } = this.props;
    onChange?.(getTarget ? event.target : event.target.value);
  };

  focusSearchIcon = () => {
    this.setState({ focusSearchIcon: true });
  };

  unfocusSearchIcon = () => {
    this.setState({ focusSearchIcon: false });
  };

  render() {
    const {
      inputRef,
      error,
      theme,
      showTooltip,
      searchIcon = false,
      dataHook,
      showErrorIcon,
      placeholder,
      style,
      ...otherProps
    } = this.props;
    const inputProps = omit(otherProps, ['onChange']);
    const styles = mergeStyles({ styles: textInputStyles, theme });
    const { focusSearchIcon } = this.state;
    return (
      <div className={styles.textInput} data-hook={dataHook}>
        {searchIcon && (
          <SearchIcon
            className={classNames(styles.prefixIcon, {
              [styles.unfocusFill]: !focusSearchIcon,
              [styles.focusFill]: focusSearchIcon,
            })}
          />
        )}
        <input
          placeholder={placeholder}
          ref={inputRef}
          className={classNames(styles.textInput_input, {
            [styles.textInput_input_invalid]: error,
            [styles.searchIcon]: searchIcon,
          })}
          onChange={this.handleOnChange}
          onFocus={this.focusSearchIcon}
          onBlur={this.unfocusSearchIcon}
          onDoubleClick={otherProps?.onDoubleClick}
          style={style}
          {...inputProps}
        />
        {error &&
          showErrorIcon &&
          (showTooltip ? (
            <Tooltip isError content={error}>
              <ErrorIcon className={styles.textInput_errorIcon} />
            </Tooltip>
          ) : (
            <ErrorIcon className={styles.textInput_errorIcon} />
          ))}
      </div>
    );
  }
}
