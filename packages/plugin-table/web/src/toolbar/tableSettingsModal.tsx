//@ts-nocheck
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/table-settings-modal.scss';
import TableSettingsCountSection from './TableSettingsCountSection';
import { getDefaultsSettings, isCellsNumberInvalid } from '../tableUtil';
import { KEYS_CHARCODE } from 'wix-rich-content-editor-common';
import { Button, SettingsMobileHeader } from 'wix-rich-content-ui-components';
export default class tableSettingsModal extends Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.state = {
      rowCount: '4',
      colCount: '4',
    };
  }

  componentDidMount() {
    this.colsInput?.focus();
  }

  onCreateTableClicked = () => {
    const { colCount, rowCount, submittedInvalidCol, submittedInvalidRow, invalidCellNum } =
      this.state;
    if (!invalidCellNum && colCount && rowCount && !submittedInvalidCol && !submittedInvalidRow) {
      const { onTableAdd } = this.props;
      const { config } = getDefaultsSettings(parseInt(rowCount), parseInt(colCount));
      onTableAdd({ config });
    }
  };

  isNumber = n => /^[1-9][0-9]*$/.test(n);

  isCellsNumberInvalid = (rows, cols) =>
    this.isNumber(rows) && this.isNumber(cols) && isCellsNumberInvalid(cols, rows);

  onColCountChange = colCount =>
    this.setState({
      colCount,
      submittedInvalidCol: colCount.length > 0 && !this.isNumber(colCount),
      invalidCellNum: this.isCellsNumberInvalid(this.state.rowCount, colCount),
    });

  onRowCountChange = rowCount =>
    this.setState({
      rowCount,
      submittedInvalidRow: rowCount.length > 0 && !this.isNumber(rowCount),
      invalidCellNum: this.isCellsNumberInvalid(rowCount, this.state.colCount),
    });

  setCreateTableButtonRef = ref => (this.createTableButton = ref);

  onKeyUp = e => e.keyCode === KEYS_CHARCODE.ENTER && this.onCreateTableClicked();

  setInputRef = ref => (this.colsInput = ref);

  render() {
    const { styles } = this;
    const { colCount, rowCount, submittedInvalidCol, submittedInvalidRow, invalidCellNum } =
      this.state;
    const { isMobile, closeModal, t, theme } = this.props;
    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div onKeyUp={this.onKeyUp} className={isMobile ? styles.settings_mobile_container : null}>
        {isMobile && (
          <SettingsMobileHeader
            theme={theme}
            onCancel={closeModal}
            t={t}
            title={t('TablePlugin_MobileHeader')}
            useNewSettingsUi
            showSaveBtn={false}
          />
        )}
        {!isMobile && <div className={styles.title}>{t('TablePlugin_SettingsModal_Title')}</div>}
        <div className={styles.subtitle}>{t('TablePlugin_SettingsModal_SubTitle')}</div>
        <div className={styles.tableConfig}>
          <TableSettingsCountSection
            title={t('TablePlugin_SettingsModal_ColCount')}
            theme={theme}
            input={colCount}
            onCountChange={this.onColCountChange}
            error={
              (submittedInvalidCol || invalidCellNum) && t('TablePlugin_SettingsModal_ErrorMessage')
            }
            dataHook={'columnCount'}
            showErrorIcon={!invalidCellNum}
            setInputRef={this.setInputRef}
          />
          <TableSettingsCountSection
            title={t('TablePlugin_SettingsModal_RowCount')}
            theme={theme}
            input={rowCount}
            onCountChange={this.onRowCountChange}
            error={
              (submittedInvalidRow || invalidCellNum) && t('TablePlugin_SettingsModal_ErrorMessage')
            }
            dataHook={'rowCount'}
            showErrorIcon={!invalidCellNum}
          />
          {invalidCellNum && (
            <div className={styles.errorMsg}>{t('TablePlugin_SettingsModal_limitError')}</div>
          )}
          <div
            tabIndex="0" //eslint-disable-line
            className={styles.submit}
          >
            <Button onClick={this.onCreateTableClicked} dataHook={'createTableButton'}>
              {t('TablePlugin_SettingsModal_CreateTable_Button')}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

tableSettingsModal.propTypes = {
  componentData: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  t: PropTypes.func,
  isMobile: PropTypes.bool,
  closeModal: PropTypes.func,
  onTableAdd: PropTypes.func,
};
