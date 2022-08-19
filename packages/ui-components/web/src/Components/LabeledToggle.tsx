import type { CSSProperties, MouseEvent } from 'react';
import React, { Component } from 'react';
import styles from '../../statics/styles/labeled-toggle.scss';
import classNames from 'classnames';
import type { RichContentTheme } from 'wix-rich-content-common';
import { mergeStyles } from 'wix-rich-content-common';
import InfoIcon from './InfoIcon';

interface LabeledToggleProps {
  label: string;
  onChange: (e?: MouseEvent) => void;
  checked: boolean;
  theme: RichContentTheme;
  style?: CSSProperties;
  dataHook?: string;
  tooltipText?: string;
  isMobile?: boolean;
}

export default class LabeledToggle extends Component<LabeledToggleProps> {
  styles: Record<string, string>;

  constructor(props: LabeledToggleProps) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  render() {
    const { label, onChange, checked, style, dataHook, tooltipText, isMobile = false } = this.props;
    return (
      <div className={this.styles.labeled_toggle_root} style={style}>
        <div className={this.styles.labeled_toggle_label_wrapper}>
          <div
            role="button"
            tabIndex={0}
            onClick={onChange}
            onKeyPress={e => e.key === 'Enter' && onChange()}
          >
            <p className={this.styles.labeled_toggle_label}>{label}</p>
          </div>
          {tooltipText && !isMobile && (
            <InfoIcon iconStyles={styles.infoIcon} tooltipText={tooltipText} />
          )}
        </div>
        <div
          className={this.styles.labeled_toggle_input_root}
          onClick={onChange}
          tabIndex={-1}
          onKeyPress={undefined}
          role="button"
          data-hook={dataHook}
        >
          <div
            className={classNames(this.styles.labeled_toggle_input_container, {
              [this.styles.labeled_toggle_input_container_checked]: checked,
            })}
          >
            <div className={this.styles.labeled_toggle_switch}>
              <span
                className={classNames(this.styles.labeled_toggle_track, {
                  [this.styles.labeled_toggle_track_checked]: checked,
                })}
              />
              <span
                className={classNames(
                  this.styles.labeled_toggle_slider,
                  checked
                    ? this.styles.labeled_toggle_slider_checked
                    : this.styles.labeled_toggle_slider_unchecked
                )}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
