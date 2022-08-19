import React from 'react';
import classnames from 'classnames';
import type { RichContentTheme, TranslationFunction } from 'wix-rich-content-common';
import { mergeStyles } from 'wix-rich-content-common';
import { CheckIcon } from '../Icons';
import styles from '../../statics/styles/checkbox.scss';
import Label from './Label';

interface CheckBoxProps {
  theme: RichContentTheme;
  onChange: (e) => void;
  label: string;
  checked?: boolean;
  dataHook?: string;
  tooltipTextKey?: string;
  t: TranslationFunction;
  isMobile?: boolean;
}

export default class Checkbox extends React.Component<CheckBoxProps, { focused: boolean }> {
  static defaultProps = {
    checked: false,
    isMobile: false,
  };

  styles: Record<string, string>;

  id: string;

  constructor(props: CheckBoxProps) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.state = { focused: false };
    this.id = `chk_${Math.floor(Math.random() * 9999)}`;
  }

  onFocus() {
    this.setState({ focused: true });
  }

  onBlur() {
    this.setState({ focused: false });
  }

  render() {
    const { styles } = this;
    const { onChange, label, checked, dataHook, tooltipTextKey, t, isMobile } = this.props;
    const a11yProps = {
      'aria-label': label,
      'aria-checked': checked,
      role: 'checkbox',
    };
    return (
      <label
        htmlFor={this.id}
        className={classnames(styles.checkbox_wrapper, {
          [styles.checkbox]: true,
          [styles.focused]: this.state.focused,
        })}
      >
        <div className={styles.checkbox_inputLabel}>
          <input
            id={this.id}
            onFocus={() => this.onFocus()}
            onBlur={() => this.onBlur()}
            tabIndex={0}
            {...a11yProps}
            className={styles.checkbox_input}
            type={'checkbox'}
            data-hook={dataHook}
            onChange={onChange}
            defaultChecked={checked}
          />
          <i
            className={classnames(
              styles.checkbox_icon,
              checked ? styles.checkbox_icon_checked : styles.checkbox_icon_unchecked
            )}
          >
            {checked && <CheckIcon className={styles.checkbox_check} />}
          </i>
        </div>
        <Label
          label={label}
          tooltipText={tooltipTextKey && t(tooltipTextKey)}
          iconStyles={styles.checkbox_infoIcon}
          isMobile={isMobile}
        />
      </label>
    );
  }
}
