import PropTypes from 'prop-types';
import React, { Component } from 'react';
import SocialEmbedInsertModal from './SocialEmbedInsertModal';
export default class EmbedURLInputModal extends Component {
  onConfirm = data => {
    const { pubsub, onConfirm } = this.props;
    if (onConfirm) {
      onConfirm(data);
    } else {
      pubsub.update('componentData', data);
    }
  };

  render() {
    const { t, languageDir, socialType, helpers, isMobile, experiments, componentData, fetchData } =
      this.props;

    return (
      <SocialEmbedInsertModal
        onConfirm={this.onConfirm}
        helpers={helpers}
        componentData={componentData}
        t={t}
        languageDir={languageDir}
        closeModal={helpers?.closeModal}
        isMobile={isMobile}
        socialType={socialType}
        experiments={experiments}
        fetchData={fetchData}
      />
    );
  }
}

EmbedURLInputModal.propTypes = {
  onConfirm: PropTypes.func,
  pubsub: PropTypes.object,
  helpers: PropTypes.object.isRequired,
  componentData: PropTypes.object.isRequired,
  t: PropTypes.func,
  languageDir: PropTypes.string,
  fetchData: PropTypes.func,
  socialType: PropTypes.string,
  isMobile: PropTypes.bool,
  experiments: PropTypes.object,
};
