import type { FunctionComponent } from 'react';
import React from 'react';
import classNames from 'classnames';
import Styles from '../../statics/styles/toolbar-separator.scss';

const Separator: FunctionComponent<{
  name: string;
  horizontal: boolean;
  className?: string;
}> = ({ className = '', horizontal = false }) => {
  const separatorClassNames = classNames(
    horizontal ? Styles.horizontalSeparator : Styles.separator,
    className
  );
  return (
    <div
      className={separatorClassNames}
      role="separator"
      aria-orientation={horizontal ? 'horizontal' : 'vertical'}
    />
  );
};

export default Separator;
