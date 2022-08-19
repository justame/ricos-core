import React, { Component } from 'react';
import generalStyles from '../../statics/styles/info-icon.scss';
import Tooltip from 'wix-rich-content-common/libs/Tooltip';
import Icon from '../Icons/InfoIcon';

class InfoIcon extends Component<{
  tooltipText?: string;
  iconStyles?: string;
  size?: { height: number; width: number };
}> {
  render() {
    const {
      tooltipText,
      iconStyles,
      size: { height, width } = { height: 24, width: 24 },
    } = this.props;
    const style = iconStyles || generalStyles.infoIcon;
    return (
      <Tooltip content={tooltipText}>
        <Icon className={style} height={height} width={width} />
      </Tooltip>
    );
  }
}

export default InfoIcon;
