import type { HTMLAttributes } from 'react';
import React from 'react';
import classNames from 'classnames';
import type { RichContentTheme } from 'wix-rich-content-common';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/settings-section.scss';

interface SettingsSectionProps {
  className?: string;
  theme: RichContentTheme;
  ariaProps?: HTMLAttributes<HTMLDivElement>;
  headerText?: string;
}

class SettingsSection extends React.Component<SettingsSectionProps> {
  styles: Record<string, string>;

  constructor(props: SettingsSectionProps) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  render() {
    const { styles } = this;
    const { children, ariaProps, className, headerText } = this.props;
    return (
      <div className={classNames(styles.section, className)} {...ariaProps}>
        {headerText && <div className={styles.sectionHeader}> {headerText} </div>}
        {children}
      </div>
    );
  }
}

export default SettingsSection;
