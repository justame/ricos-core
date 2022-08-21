import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TextInput } from 'wix-rich-content-ui-components';
import { LinkPanelWrapper } from 'wix-rich-content-editor-common';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/settings-component-styles.scss';
import classNames from 'classnames';
class SettingsComponent extends PureComponent {
  constructor(props) {
    super(props);
    const { settingsObj, showLinkPanel } = this.props;
    this.styles = mergeStyles({ styles, theme: props.theme });
    const linkButtonSettings = showLinkPanel
      ? {
          url: settingsObj.url,
          target: settingsObj.target,
          rel: settingsObj.rel,
        }
      : {};
    this.state = {
      buttonText: settingsObj.buttonText,
      ...linkButtonSettings,
    };
  }

  useNewSettingsUi = !!this.props.experiments?.newSettingsModals?.enabled;

  componentDidUpdate = () => {
    this.props.onSettingsChange(this.state);
  };

  handleKeyPress = e => {
    this.props.onKeyPress(e);
  };

  onTextChanged = buttonText => this.setState({ buttonText });

  onLinkPanelChange = ({ url, rel, target }) => {
    this.setState({ url, rel, target });
  };

  render() {
    const { t, showLinkPanel, uiSettings, theme, anchorTarget, relValue } = this.props;
    const { buttonText, url, target, rel } = this.state;
    const linkValues = { url, target, rel };
    const { linkPanel } = uiSettings || {};
    const { showNewTabCheckbox, showNoFollowCheckbox, showSponsoredCheckbox } = linkPanel || {};

    const textInputBaseProps = {
      inputRef: ref => (this.input = ref),
      type: 'text',
      onKeyPress: this.handleKeyPress,
      theme: this.styles,
      'data-hook': 'ButtonInputModal',
    };
    return (
      <div
        className={classNames(this.styles.button_settingsComponent_section_content, {
          [this.styles.button_settingsComponent_section_content_newUi]: this.useNewSettingsUi,
        })}
      >
        <div className={this.styles.button_settingsComponent_name_feild}>
          <div className={this.styles.button_settingsComponent_header_ButtonText}>
            {t('ButtonModal_Button_Text')}
          </div>
          <div>
            <TextInput
              {...textInputBaseProps}
              onChange={this.onTextChanged}
              value={buttonText}
              placeholder={t('ButtonModal_InputName_Placeholder')}
            />
          </div>
        </div>
        {showLinkPanel && (
          <>
            <div className={this.styles.button_settingsComponent_header_ButtonLink}>
              {t('ButtonModal_Button_Link')}
            </div>
            <LinkPanelWrapper
              linkValues={linkValues}
              onChange={this.onLinkPanelChange}
              showNewTabCheckbox={showNewTabCheckbox}
              showNoFollowCheckbox={showNoFollowCheckbox}
              showSponsoredCheckbox={showSponsoredCheckbox}
              theme={theme}
              t={t}
              anchorTarget={anchorTarget}
              relValue={relValue}
            />
          </>
        )}
      </div>
    );
  }
}

SettingsComponent.propTypes = {
  theme: PropTypes.object.isRequired,
  experiments: PropTypes.object,
  t: PropTypes.func,
  isValidUrl: PropTypes.func,
  onSettingsChange: PropTypes.func.isRequired,
  settingsObj: PropTypes.object.isRequired,
  validUrl: PropTypes.bool,
  isMobile: PropTypes.bool,
  onKeyPress: PropTypes.func,
  onBlur: PropTypes.func,
  showLinkPanel: PropTypes.bool,
  uiSettings: PropTypes.object,
  anchorTarget: PropTypes.string,
  relValue: PropTypes.string,
};

export default SettingsComponent;
