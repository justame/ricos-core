/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, { Component } from 'react';
import classnames from 'classnames';
import styles from '../../statics/styles/radio-group.scss';
import type { RichContentTheme } from 'wix-rich-content-common';
import { mergeStyles } from 'wix-rich-content-common';

export interface RadioGroupDataSource {
  value: string;
  labelText: string;
  dataHook?: string;
}

interface RadioGroupProps {
  dataSource: RadioGroupDataSource[];
  onChange: (value: string) => void;
  value: string;
  className?: string;
  theme: RichContentTheme;
  ariaLabelledBy?: string;
}
class RadioGroup extends Component<
  RadioGroupProps,
  { focusIndex: number; innerNavigation?: boolean }
> {
  styles: Record<string, string>;

  id: string;

  inputs: Record<string, HTMLLabelElement | null>;

  constructor(props: RadioGroupProps) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.state = { focusIndex: -1 };
    this.id = `group_${Math.floor(Math.random() * 9999)}`;
    this.inputs = {};
  }

  onKeyDown(event) {
    if (this.props.dataSource.length < 2) {
      return;
    }
    const index = this.state.focusIndex === -1 ? 0 : this.state.focusIndex;
    let nextIndex = -1;
    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        nextIndex = index === 0 ? this.props.dataSource.length - 1 : index - 1;
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        nextIndex = (index + 1) % this.props.dataSource.length;
        break;
      case 'Tab':
        this.setState({ focusIndex: -1, innerNavigation: false });
        break;
      case ' ':
      case 'Enter':
        event.target.click();
        break;
      default:
        break;
    }

    if (nextIndex > -1) {
      this.setState({ focusIndex: nextIndex, innerNavigation: true });
    }
  }

  componentDidUpdate() {
    if (this.state.focusIndex !== -1) {
      this.inputs[`${this.id}_${this.state.focusIndex}`]?.focus();
    }
  }

  saveInputRef(el: HTMLLabelElement | null, inputId: string) {
    if (!this.inputs[inputId]) {
      this.inputs[inputId] = el;
    }
  }

  render() {
    const { dataSource, value, className, onChange, ariaLabelledBy } = this.props;
    const { styles } = this;
    return (
      <div
        aria-labelledby={ariaLabelledBy}
        role="radiogroup"
        tabIndex={-1}
        className={classnames(styles.radioGroup, className)}
        onKeyDown={e => this.onKeyDown(e)}
      >
        {dataSource.map((option, i) => {
          const checked = option.value === value;
          const a11yProps = {
            'aria-checked': checked,
            'aria-label': option.labelText,
          };
          const inputId = `${this.id}_${i}`;
          return (
            <label // eslint-disable-line
              htmlFor={inputId}
              tabIndex={0}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore: name doesn't exist in label
              name={`${this.id}`}
              key={option.value}
              ref={el => this.saveInputRef(el, inputId)}
              className={styles.radioGroup}
              data-hook={option.dataHook}
              onClick={() => onChange(option.value)}
            >
              <input
                tabIndex={-1}
                {...a11yProps}
                id={inputId}
                className={styles.radioGroup_input}
                type={'radio'}
                checked={checked}
              />
              <span className={styles.radioGroup_button} />
              <span className={styles.radioGroup_label}>{option.labelText}</span>
            </label>
          );
        })}
      </div>
    );
  }
}

export default RadioGroup;
