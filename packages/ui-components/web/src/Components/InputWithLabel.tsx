/* eslint-disable @typescript-eslint/no-unused-vars, no-unused-vars */
import type { ChangeEvent, Ref } from 'react';
import React, { Component } from 'react';
import { omit } from 'lodash';
import classNames from 'classnames';
import Label from './Label';
import type { RichContentTheme, TranslationFunction } from 'wix-rich-content-common';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/input-with-label.scss';
import infoIconStyles from '../../statics/styles/info-icon.scss';

interface InputWithLabelProps {
  id?: string;
  label: string;
  theme: RichContentTheme;
  isTextArea?: boolean;
  isFullHeight?: boolean;
  dataHook?: string;
  value: string;
  maxLength?: number;
  tooltipTextKey?: string;
  t?: TranslationFunction;
  isMobile?: boolean;
  onChange: (e) => void;
  onBlur?: (e) => void;
  getTarget?: boolean;
  tabIndex?: number;
  inputRef?: Ref<HTMLInputElement>;
  placeholder?: string;
}

class InputWithLabel extends Component<InputWithLabelProps> {
  static defaultProps = {
    value: '',
    isMobile: false,
  };

  styles: Record<string, string>;

  constructor(props: InputWithLabelProps) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  handleOnChange = (e: ChangeEvent<{ value: string }>) => {
    const { onChange, getTarget } = this.props;
    onChange(getTarget ? e.target : e.target.value);
  };

  renderInput = () => {
    const { styles } = this;
    const {
      id,
      isTextArea,
      isFullHeight,
      dataHook,
      isMobile,
      tooltipTextKey,
      t,
      inputRef,
      placeholder,
      onBlur,
      ...otherProps
    } = this.props;
    const inputProps = omit(otherProps, ['theme', 'onChange']);
    const inputClassName = classNames(styles.inputWithLabel_input, {
      [styles.inputWithLabel_textArea]: isTextArea,
      [styles.inputWithLabel_fullHeight]: isFullHeight,
    });
    const InputComponent = isTextArea ? 'textarea' : 'input';

    return (
      <InputComponent
        className={inputClassName}
        id={id}
        data-hook={dataHook}
        onChange={this.handleOnChange}
        onBlur={onBlur}
        placeholder={placeholder}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={inputRef as any}
        {...inputProps}
      />
    );
  };

  renderCharacterCapacity = () => {
    const { styles } = this;
    const { value, maxLength } = this.props;
    return <span className={styles.inputWithLabel_capacity}>{value.length + '/' + maxLength}</span>;
  };

  render() {
    const { styles } = this;
    const { id, label, maxLength, tooltipTextKey, t, isMobile } = this.props;

    if (label) {
      return (
        <label htmlFor={id}>
          <div className={infoIconStyles.infoContainer}>
            <span className={styles.inputWithLabel_label}>
              <Label
                label={label}
                tooltipText={tooltipTextKey && t?.(tooltipTextKey)}
                isMobile={isMobile}
              />
            </span>
          </div>
          {this.renderInput()}
          {maxLength && this.renderCharacterCapacity()}
        </label>
      );
    } else {
      return this.renderInput();
    }
  }
}

export default InputWithLabel;
