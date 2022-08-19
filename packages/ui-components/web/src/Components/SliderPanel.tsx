import type { FunctionComponent } from 'react';
import React from 'react';
import type { SliderWithInputProps } from './SliderWithInput';
import SliderWithInput from './SliderWithInput';
import styles from '../../statics/styles/slider-panel.scss';
import type { GetEditorBounds, RichContentTheme } from 'wix-rich-content-common';

interface SliderPanelProps {
  getValue: (props: SliderPanelProps) => number;
  onChange: (props: SliderPanelProps) => (value: number) => void;
  theme: RichContentTheme;
  languageDir: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mapStoreDataToPanelProps?: (props: any) => SliderWithInputProps;
  getEditorBounds?: GetEditorBounds;
}

const SliderPanel: FunctionComponent<SliderPanelProps> = props => {
  const {
    theme,
    getValue,
    onChange,
    mapStoreDataToPanelProps,
    getEditorBounds,
    languageDir,
    ...otherProps
  } = props;

  const mappedProps = { ...otherProps, ...mapStoreDataToPanelProps?.(otherProps) };

  return (
    <div className={styles.sliderPanel} data-hook="sliderPanel">
      <SliderWithInput
        {...mappedProps}
        theme={theme}
        languageDir={languageDir}
        defaultValue={getValue(props)}
        onChange={onChange({ ...props, getEditorBounds })}
        sliderDataHook="sliderPanel_Slider"
        inputDataHook="sliderPanel_Input"
      />
    </div>
  );
};

export default SliderPanel;
