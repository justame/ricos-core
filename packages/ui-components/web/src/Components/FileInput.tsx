import type { ChangeEvent, CSSProperties } from 'react';
import React, { Component } from 'react';
import classnames from 'classnames';
import type { RichContentTheme } from 'wix-rich-content-common';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/file-input.scss';

interface FileInputProps {
  accept?: string;
  className?: string;
  onChange: (files: File[]) => void;
  handleFileSelection?: (multiple: boolean) => void;
  multiple: boolean;
  disabled?: boolean;
  title?: string;
  style?: CSSProperties;
  theme?: RichContentTheme;
  dataHook?: string;
  tabIndex?: number;
  inputRef?: React.RefObject<HTMLInputElement>;
  children?: React.ReactElement | React.ReactNode;
}

class FileInput extends Component<FileInputProps, { focused: boolean }> {
  styles: Record<string, string>;

  inputRef: React.RefObject<HTMLInputElement>;

  id: string;

  value = null;

  static defaultProps = {
    accept: '.jpg,.png,.gif,.jpeg,.jpe,.jfif,.bmp,.heic,.heif,.tfif,.tif,.webp',
    multiple: false,
    disabled: false,
  };

  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.state = { focused: false };
    this.id = `file_input_${Math.floor(Math.random() * 9999)}`;
    this.inputRef = props?.inputRef;
  }

  onFocus() {
    this.setState({ focused: true });
  }

  onBlur() {
    this.setState({ focused: false });
  }

  onClick = () => {
    const { handleFileSelection, multiple } = this.props;
    handleFileSelection?.(multiple);
  };

  handleChange = (e: ChangeEvent<{ files: FileList | null; value }>) => {
    this.props.onChange(Array.from(e.target.files || []));
    e.target.value = null;
  };

  onKeyPress = e => e.key === 'Enter' && this.inputRef?.current?.click();

  render() {
    const {
      accept,
      multiple,
      className,
      title,
      children,
      dataHook,
      tabIndex,
      disabled,
      handleFileSelection,
    } = this.props;
    const hasMultiple = multiple ? { multiple } : {};
    const { styles } = this;
    const a11yProps = {
      role: 'button',
      'aria-label': title,
    };

    return (
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
      <label
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore: disabled doesn't exist in label
        disabled={disabled}
        htmlFor={this.id}
        className={classnames({
          ...(className ? { [className]: true } : undefined),
          [styles.focused]: this.state.focused,
        })}
        style={this.props.style}
        title={title}
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={tabIndex}
        data-hook="file-input-label"
        onKeyPress={this.onKeyPress}
        onClick={this.onKeyPress}
      >
        {handleFileSelection ? (
          <input
            disabled={disabled}
            className={styles.visuallyHidden}
            {...a11yProps}
            id={this.id}
            tabIndex={-1}
            data-hook={dataHook}
            onClick={this.onClick}
            ref={this.inputRef}
          />
        ) : (
          <input
            {...a11yProps}
            className={styles.visuallyHidden}
            disabled={disabled}
            id={this.id}
            type={'file'}
            data-hook={dataHook}
            onChange={this.handleChange}
            onClick={() => this.value === null}
            accept={accept}
            onFocus={() => this.onFocus()}
            onBlur={() => this.onBlur()}
            ref={this.inputRef}
            tabIndex={-1}
            {...hasMultiple}
          />
        )}
        {children}
      </label>
    );
  }
}

export default React.forwardRef((props: FileInputProps, ref: React.RefObject<HTMLInputElement>) => (
  <FileInput inputRef={ref} {...props} />
));
