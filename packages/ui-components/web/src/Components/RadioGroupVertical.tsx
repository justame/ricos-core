import React, { Component } from 'react';
import type { RadioGroupDataSource } from './RadioGroup';
import RadioGroup from './RadioGroup';
import Label from './Label';
import type { RichContentTheme, TranslationFunction } from 'wix-rich-content-common';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/radio-group-vertical.scss';
import infoIconStyles from '../../statics/styles/info-icon.scss';

interface RadioGroupVerticalProps {
  label?: string;
  dataSource: RadioGroupDataSource[];
  disabled?: boolean;
  theme: RichContentTheme;
  onChange: (value: string) => void;
  value: string;
  tooltipTextKey?: string;
  t?: TranslationFunction;
}
class RadioGroupVertical extends Component<RadioGroupVerticalProps> {
  styles: Record<string, string>;

  id: string;

  constructor(props: RadioGroupVerticalProps) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.id = `h_group_${Math.floor(Math.random() * 9999)}`;
  }

  render() {
    const { label, tooltipTextKey, t, ...props } = this.props;
    const { styles } = this;
    const groupClassName = styles.radioGroupVertical_group;

    return (
      <div>
        <div className={infoIconStyles.infoContainer}>
          {label && <Label label={label} tooltipText={t?.(tooltipTextKey as string)} />}
        </div>
        <RadioGroup ariaLabelledBy={`${this.id}_label`} {...props} className={groupClassName} />
      </div>
    );
  }
}

export default RadioGroupVertical;
