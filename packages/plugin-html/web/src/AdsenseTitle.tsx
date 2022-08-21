import type { FunctionComponent } from 'react';
import React from 'react';
import styles from '../statics/styles/adsense.scss';
import { InfoIcon } from 'wix-rich-content-ui-components';
import type { TranslationFunction } from 'wix-rich-content-common';

const AdsenseTitle: FunctionComponent<{ t: TranslationFunction }> = ({ t }) => {
  return (
    <div className={styles.container}>
      {t('HtmlEditPanel_HtmlInput_AdSense_Title')}
      <div className={styles.tooltip}>
        <InfoIcon tooltipText={t('HtmlEditPanel_HtmlInput_AdSense_Tooltip')} />
      </div>
    </div>
  );
};

export default AdsenseTitle;
