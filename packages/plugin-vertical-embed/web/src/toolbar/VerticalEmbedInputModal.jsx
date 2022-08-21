import PropTypes from 'prop-types';
import React, { Component } from 'react';
import VerticalEmbedInsertModal from './VerticalEmbedInsertModal';

export default class VerticalEmbedInputModal extends Component {
  onConfirm = data => {
    const { onConfirm, helpers, onReplace } = this.props;
    const addFunc = onConfirm || onReplace;
    addFunc(data);
    helpers.closeModal();
  };

  onCloseRequested = () => {
    this.props.helpers?.closeModal();
  };

  render() {
    const { t, componentData, helpers, isMobile, experiments, verticalsApi, locale } = this.props;
    return (
      <VerticalEmbedInsertModal
        componentData={componentData}
        t={t}
        isMobile={isMobile}
        verticalsApi={verticalsApi}
        locale={locale}
        experiments={experiments}
        helpers={helpers}
        onCloseRequested={this.onCloseRequested}
        onConfirm={this.onConfirm}
      />
    );
  }
}

VerticalEmbedInputModal.propTypes = {
  onConfirm: PropTypes.func,
  onReplace: PropTypes.func,
  helpers: PropTypes.object.isRequired,
  componentData: PropTypes.object.isRequired,
  t: PropTypes.func,
  isMobile: PropTypes.bool,
  verticalsApi: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
  experiments: PropTypes.object,
};
