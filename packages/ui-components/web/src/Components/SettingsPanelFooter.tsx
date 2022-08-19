import React, { Component } from 'react';
import classNames from 'classnames';
import ActionButtons from './ActionButtons';
import type { RichContentTheme, TranslationFunction } from 'wix-rich-content-common';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/settings-panel-footer.scss';
import { FOOTER_BUTTON_ALIGNMENT, BUTTON_SIZE } from '../consts';

interface SettingsPanelFooterProps {
  save: () => void;
  cancel: () => void;
  theme: RichContentTheme;
  saveLabel?: string;
  cancelLabel?: string;
  fixed?: boolean;
  className?: string;
  t: TranslationFunction;
  isModal?: boolean;
  flexEndModalButtons?: boolean;
  layoutOptions: { isModal: boolean; buttonAlignment: string };
  selected?: boolean;
  buttonSize?: string;
}

class SettingsPanelFooter extends Component<SettingsPanelFooterProps> {
  styles: Record<string, string>;

  static defaultProps = {
    layoutOptions: {},
  };

  constructor(props: SettingsPanelFooterProps) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  render() {
    const {
      save,
      cancel,
      theme,
      cancelLabel,
      saveLabel,
      fixed,
      className,
      t,
      layoutOptions,
      selected = true,
      buttonSize = BUTTON_SIZE.small,
    } = this.props;
    const { isModal, buttonAlignment = FOOTER_BUTTON_ALIGNMENT.CENTER } = layoutOptions;
    const endAlignment = buttonAlignment === FOOTER_BUTTON_ALIGNMENT.END;
    const saveText = saveLabel || t('SettingsPanelFooter_Save');
    const cancelText = cancelLabel || t('SettingsPanelFooter_Cancel');

    return (
      <div
        className={classNames(
          this.styles.settingsPanel_footer,
          className,
          isModal && this.styles.modal,
          endAlignment && this.styles.flexEndModalButtons,
          {
            [this.styles.settingsPanel_footer_fixed]: fixed || false,
          }
        )}
      >
        <div
          className={classNames(
            this.styles.settingsPanel_footer_buttons_wrapper,
            isModal && this.styles.modal
          )}
        >
          <ActionButtons
            size={buttonSize}
            theme={theme}
            onCancel={cancel}
            onSave={save}
            cancelText={cancelText}
            saveText={saveText}
            disableSave={!selected}
            t={t}
          />
        </div>
      </div>
    );
  }
}

export default SettingsPanelFooter;
