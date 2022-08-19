import type { FunctionComponent, InputHTMLAttributes, KeyboardEvent } from 'react';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import type { RichContentTheme } from 'wix-rich-content-common';
import { mergeStyles } from 'wix-rich-content-common';
import {
  ACTION_COLOR,
  ACTION_COLOR_LIVESITE,
  BG_COLOR_LIVESITE,
  BG_COLOR,
  SLIDER_THUMB_VISIBILITY,
  SLIDER_TRACK_SIZE,
} from '../consts';
import styles from '../../statics/styles/slider.scss';

type ThumbVisibilityKeys = keyof typeof SLIDER_THUMB_VISIBILITY;
type TrackSizeKeys = keyof typeof SLIDER_TRACK_SIZE;

interface SliderProps {
  value: number;
  min?: number;
  max?: number;
  theme: RichContentTheme;
  onChange: (value: number) => void;
  onChangeCommitted?: (value: number) => void;
  dataHook?: string;
  step?: string;
  thumbVisibility?: typeof SLIDER_THUMB_VISIBILITY[ThumbVisibilityKeys];
  trackSize?: typeof SLIDER_TRACK_SIZE[TrackSizeKeys];
  tabIndex?: number;
  ariaProps?: InputHTMLAttributes<HTMLInputElement>;
  languageDir: string;
  liveSiteWiring?: boolean;
  ariaLabel?: string;
}

const Slider: FunctionComponent<SliderProps> = props => {
  const mergedStyles = mergeStyles({ styles, theme: props.theme });
  const {
    min = 0,
    max = 10,
    tabIndex = 0,
    onChange,
    dataHook,
    ariaProps,
    value,
    onChangeCommitted,
    languageDir,
    thumbVisibility = SLIDER_THUMB_VISIBILITY.fixed,
    trackSize = SLIDER_TRACK_SIZE.medium,
    step,
    liveSiteWiring = false,
    ariaLabel,
  } = props;
  const [fillPercentage, setFillPercentage] = useState(0);
  const track = {
    fill: liveSiteWiring ? ACTION_COLOR_LIVESITE : ACTION_COLOR,
    unFilled: liveSiteWiring ? BG_COLOR_LIVESITE : BG_COLOR,
    gradientDeg: languageDir === 'rtl' ? '270deg' : '90deg',
  };
  const bgStyle = {
    background: `linear-gradient(${track.gradientDeg} ,${track.fill} ${fillPercentage}%, ${
      track.unFilled
    } ${fillPercentage + 0.1}%)`,
  };

  const isFixedThumb = thumbVisibility === SLIDER_THUMB_VISIBILITY.fixed;

  const onKeyUp = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowDown':
      case 'ArrowRight':
      case 'ArrowLeft':
      case 'Home':
      case 'End':
      case 'PageUp':
      case 'PageDown':
        onChangeCommitted?.((event.target as HTMLInputElement).valueAsNumber);
        break;
      default:
        return;
    }
  };

  const onKeyDown = e => {
    switch (e.key) {
      case 'ArrowUp':
      case 'ArrowDown':
      case 'ArrowRight':
      case 'ArrowLeft':
      case 'Home':
      case 'End':
      case 'PageUp':
      case 'PageDown':
        onChange?.(e.target.valueAsNumber);
        break;
      default:
        return;
    }
  };

  useEffect(() => {
    setFillPercentage((100 * (value - min)) / (max - min));
  }, [value]);

  return (
    <input
      {...ariaProps}
      aria-label={ariaLabel}
      tabIndex={tabIndex}
      type={'range'}
      className={classNames(
        mergedStyles.slider,
        mergedStyles.wrapperSlider,
        mergedStyles[trackSize],
        {
          [mergedStyles.slider_fixed_thumb]: isFixedThumb,
          [mergedStyles.slider_livesite]: liveSiteWiring,
        }
      )}
      data-hook={dataHook}
      onChange={e => onChange(e.target.valueAsNumber)}
      value={value}
      min={min}
      max={max}
      step={step}
      onMouseUp={e => onChangeCommitted?.((e.target as HTMLInputElement).valueAsNumber)}
      onTouchEnd={e => onChangeCommitted?.((e.target as HTMLInputElement).valueAsNumber)}
      onKeyUp={onKeyUp}
      onKeyDown={onKeyDown}
      style={bgStyle}
    />
  );
};

export default Slider;
