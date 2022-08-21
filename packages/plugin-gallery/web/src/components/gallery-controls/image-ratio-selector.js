import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mergeStyles } from 'wix-rich-content-common';
import { SelectionList, SelectionListItem, Label } from 'wix-rich-content-ui-components';
import styles from '../../../statics/styles/image-ratio-selector.scss';
class ImageRatioSelector extends Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  dataMapper = ({ ratio }) => ({ value: ratio });

  useNewSettingsUi = !!this.props.experiments.newSettingsModals?.enabled;

  renderOption = ({ item, selected }) =>
    this.useNewSettingsUi ? (
      <SelectionListItem label={item.name}>
        <div
          className={classNames(
            this.styles.imageRatioSelector_ratioButton,
            this.styles.newSettingsUi,
            selected ? this.styles.imageRatioSelector_ratioButton_selected : ''
          )}
        >
          <div
            className={classNames(
              this.styles.imageRatioSelector_ratioIcon,
              item.ratioClass,
              this.styles.newSettingsUi,
              {
                [this.styles.imageRatioSelector_ratioIcon_selected]: selected,
              }
            )}
          />
        </div>
      </SelectionListItem>
    ) : (
      <div className={this.styles.imageRatioSelector_tile}>
        <div
          className={classNames(
            this.styles.imageRatioSelector_ratioButton,
            selected ? this.styles.imageRatioSelector_ratioButton_selected : ''
          )}
        >
          <div
            className={classNames(this.styles.imageRatioSelector_ratioIcon, item.ratioClass, {
              [this.styles.imageRatioSelector_ratioIcon_selected]: selected,
            })}
          />
        </div>
        <span className={this.styles.imageRatioSelector_ratioLabel}>{item.name}</span>
      </div>
    );

  render() {
    const dataSource = [
      {
        ratio: 16 / 9,
        name: '16:9',
        ratioClass: this.styles.imageRatioSelector_16_9,
        dataHook: 'imageRatio16:9',
      },
      {
        ratio: 4 / 3,
        name: '4:3',
        ratioClass: this.styles.imageRatioSelector_4_3,
        dataHook: 'imageRatio4/3',
      },
      {
        ratio: 1,
        name: '1:1',
        ratioClass: this.styles.imageRatioSelector_1_1,
        dataHook: 'imageRatio1:1',
      },
      {
        ratio: 3 / 4,
        name: '3:4',
        ratioClass: this.styles.imageRatioSelector_3_4,
        dataHook: 'imageRatio3:4',
      },
      {
        ratio: 9 / 16,
        name: '9:16',
        ratioClass: this.styles.imageRatioSelector_9_16,
        dataHook: 'imageRatio9:16',
      },
    ];
    const { styles } = this;
    const { value, onChange, theme, t } = this.props;
    const imageRatioLabel = t('GallerySettings_Image_Ratio');

    return (
      <div className={this.useNewSettingsUi ? styles.imageRatio_selectionList : ''}>
        <Label label={imageRatioLabel} />
        <SelectionList
          theme={theme}
          className={styles.imageRatioSelector_grid}
          dataSource={dataSource}
          dataMapper={this.dataMapper}
          renderItem={this.renderOption}
          value={value}
          onChange={onChange}
          optionClassName={styles.imageRatioSelector_option}
          useNewSettingsUi={this.useNewSettingsUi}
        />
      </div>
    );
  }
}

ImageRatioSelector.propTypes = {
  value: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
  experiments: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  t: PropTypes.func,
};

export default ImageRatioSelector;
