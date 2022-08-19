import type { CSSProperties } from 'react';
import React from 'react';
import styles from '../../statics/styles/label.scss';
import Tooltip from 'wix-rich-content-common/libs/Tooltip';
import InfoIcon from './InfoIcon';

export interface LabelProps {
  label: string;
  tooltipText?: string;
  children?: React.ReactElement;
  iconStyles?: string;
  isMobile?: boolean;
  style?: CSSProperties;
}

const Label: React.FC<LabelProps> = ({
  label,
  tooltipText,
  children,
  iconStyles,
  style,
  isMobile,
}) => {
  return (
    <div className={styles.label} style={style}>
      {<span>{label}</span>}
      {!isMobile && !tooltipText ? null : children ? (
        <Tooltip content={tooltipText}>{children}</Tooltip>
      ) : (
        <InfoIcon tooltipText={tooltipText} iconStyles={iconStyles || styles.label_icon} />
      )}
    </div>
  );
};

export default Label;
