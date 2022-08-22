//@ts-nocheck
import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../statics/styles/widget.scss';
import classNames from 'classnames';
import Tooltip from 'wix-rich-content-common/libs/Tooltip';

const subtitle = info => {
  return (
    info.leftSubtitle && (
      <div className={styles.subtitle}>
        {info.leftSubtitle}
        {info.rightSubtitle && (
          <span>
            <span className={styles.right}>|</span>
            {info.rightSubtitle}
          </span>
        )}
      </div>
    )
  );
};

const ellipsisTitle = title => {
  return title.length <= 80 ? title : `${title.substring(0, 80)}...`;
};

const CardContent = props => {
  const { title, info, buttonText, disabled, t } = props;
  return (
    <div className={styles.content}>
      <div>
        <div className={styles.title}>{ellipsisTitle(title)}</div>
        {info && subtitle(info)}
      </div>
      <Tooltip content={disabled ? t('VerticalEmbed_Disabled_Button_Tooltip') : null} brightMode>
        <div className={classNames(styles.button, { [styles.button_disabled]: disabled })}>
          <div className={styles.buttonText}>{buttonText}</div>
        </div>
      </Tooltip>
    </div>
  );
};

CardContent.propTypes = {
  title: PropTypes.string.isRequired,
  info: PropTypes.object,
  buttonText: PropTypes.string.isRequired,
  disabled: PropTypes.string.boolean,
  t: PropTypes.func.isRequired,
};

export default CardContent;
