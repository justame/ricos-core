//@ts-nocheck
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { mergeStyles } from 'wix-rich-content-common';
import { TextSearchInput, SettingsMobileHeader } from 'wix-rich-content-ui-components';
import styles from '../../statics/styles/giphy-api-input-modal.scss';
import GiphySelector from './giphySelector';
import classNames from 'classnames';
import { debounce } from 'lodash';
import { GIPHY_TYPE } from '../types';

class GiphyApiInputModal extends Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.state = {
      searchTag: '',
    };
  }

  triggerBi = debounce(() => {
    const { helpers, toolbarName } = this.props;
    helpers?.onPluginAction('searchInsideThePlugin', {
      searchTerm: this.state.searchTag,
      plugin_id: GIPHY_TYPE,
      entry_point: toolbarName,
    });
  }, 200);

  onChange = searchTag => {
    this.setState({ searchTag });
    this.triggerBi();
  };

  handleClearText = () => {
    this.setState({ searchTag: '' });
  };

  render() {
    const { styles } = this;
    const { onGifAdd, t, isMobile, languageDir, theme, onCloseRequested } = this.props;
    const searchTag = this.state.searchTag;

    return (
      <div dir={languageDir} className={isMobile ? styles.gif_modal_mobile_container : null}>
        {isMobile && (
          <SettingsMobileHeader
            theme={theme}
            onCancel={onCloseRequested}
            t={t}
            title={t('GIFPlugin_Mobile_Header')}
            useNewSettingsUi
            showSaveBtn={false}
          />
        )}
        <div
          className={classNames(styles.giphy_api_input_modal_container, {
            [styles.mobile]: isMobile,
          })}
          data-hook="giphyUploadModal"
        >
          <TextSearchInput
            inputRef={ref => (this.input = ref)}
            onClose={onCloseRequested}
            placeHolder={t('GiphyUploadModal_Search_Placeholder')}
            onChange={this.onChange}
            value={this.state.searchTag}
            data-hook="giphyUploadModalInput"
          />
          <GiphySelector
            searchTag={searchTag}
            onCloseRequested={onCloseRequested}
            onGifAdd={onGifAdd}
            {...this.props}
          />
        </div>
      </div>
    );
  }
}

GiphyApiInputModal.propTypes = {
  helpers: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  t: PropTypes.func,
  isMobile: PropTypes.bool,
  languageDir: PropTypes.string,
  toolbarName: PropTypes.string,
  onGifAdd: PropTypes.func,
  onCloseRequested: PropTypes.func,
};

export default GiphyApiInputModal;
