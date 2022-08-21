import type { FunctionComponent } from 'react';
import React from 'react';
import styles from '../../statics/styles/giphy-selecter.scss';
import type { TranslationFunction } from 'wix-rich-content-common';

const GiphyEmptyState: FunctionComponent<{ t: TranslationFunction }> = ({ t }) => (
  <div className={styles.giphy_empty_state}>
    <div>{t('GiphyPlugin_Search_EmptyState_Title')}</div>
    <div>{t('GiphyPlugin_Search_EmptyState_Text')}</div>
  </div>
);

export default GiphyEmptyState;
