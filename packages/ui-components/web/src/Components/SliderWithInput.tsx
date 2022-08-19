import type { InputHTMLAttributes } from 'react';
import React, { Component } from 'react';
import { debounce, isNumber } from 'lodash';
import Label from './Label';
import type { RichContentTheme, TranslationFunction } from 'wix-rich-content-common';
import { mergeStyles } from 'wix-rich-content-common';
import Slider from './Slider';
import styles from '../../statics/styles/slider-with-input.scss';
import infoIconStyles from '../../statics/styles/info-icon.scss';

export interface SliderWithInputProps {
  label?: string;
  defaultValue: number;
  min: number;
  max: number;
  languageDir: string;
  inputMax?: number;
  inputMin?: number;
  theme: RichContentTheme;
  onChange: (value: number) => void;
  sliderDataHook?: string;
  inputDataHook?: string;
  tooltipTextKey?: string;
  t?: TranslationFunction;
}

class SliderWithInput extends Component<SliderWithInputProps> {
  styles = mergeStyles({ styles, theme: this.props.theme });

  id = `sld_${Math.floor(Math.random() * 9999)}`;

  state = { inputValue: this.props.defaultValue };

  static defaultProps = {
    min: 0,
    max: 100,
  };

  handleInputChange = event => {
    const inputValue = event.target.valueAsNumber || 0;
    this.setState({ inputValue });
  };

  submitInputValueDebounced = debounce(() => {
    const inputValue = this.normalizeInputValue(this.state.inputValue);
    this.props.onChange(inputValue);
    this.setState({ inputValue });
  }, 800);

  submitInputValue = () => {
    const inputValue = this.normalizeInputValue(this.state.inputValue);
    this.props.onChange(inputValue);
    this.setState({ inputValue });
  };

  handleSliderChange = inputValue => {
    this.setState({ inputValue });
  };

  getInputMin = () => (isNumber(this.props.inputMin) ? this.props.inputMin : this.props.min);

  getInputMax = () => (isNumber(this.props.inputMax) ? this.props.inputMax : this.props.max);

  normalizeInputValue = value => Math.min(Math.max(this.getInputMin(), value), this.getInputMax());

  render() {
    const {
      label,
      min,
      max,
      theme,
      sliderDataHook,
      inputDataHook,
      tooltipTextKey,
      t,
      languageDir,
    } = this.props;
    const { inputValue } = this.state;
    let ariaProps: InputHTMLAttributes<HTMLInputElement> = label
      ? { 'aria-labelledby': `${this.id}_lbl` }
      : {};
    ariaProps = {
      ...ariaProps,
      'aria-valuemin': min,
      'aria-valuemax': max,
      'aria-valuenow': inputValue,
    };
    /* eslint-disable jsx-a11y/role-has-required-aria-props */
    return (
      <div>
        <div className={infoIconStyles.infoContainer}>
          {label && <Label label={label} tooltipText={t?.(tooltipTextKey as string)} />}
        </div>
        <div className={this.styles.sliderWithInput_content}>
          <Slider
            theme={theme}
            languageDir={languageDir}
            value={inputValue}
            dataHook={sliderDataHook}
            onChange={this.handleSliderChange}
            onChangeCommitted={this.submitInputValue}
            min={min}
            max={max}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore: className is not a prop in Slider
            className={this.styles.sliderWithInput_slider}
            ariaProps={ariaProps}
          />
          <input
            tabIndex={0}
            type="number"
            value={inputValue}
            data-hook={inputDataHook}
            {...ariaProps}
            onChange={this.handleInputChange}
            onBlur={this.submitInputValue}
            onKeyUp={this.submitInputValueDebounced}
            className={this.styles.sliderWithInput_input}
            min={this.getInputMin()}
            max={this.getInputMax()}
            step="1"
            role="spinbutton"
          />
        </div>
      </div>
    );
    /* eslint-enable jsx-a11y/role-has-required-aria-props */
  }
}

export default SliderWithInput;
