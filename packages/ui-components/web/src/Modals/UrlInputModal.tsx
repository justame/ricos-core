import React, { Component } from 'react';
import classNames from 'classnames';
import type { RichContentTheme, TranslationFunction } from 'wix-rich-content-common';
import { mergeStyles } from 'wix-rich-content-common';
import { SettingsPanelFooter, SettingsMobileHeader, TextInput, CloseIcon } from '..';
import { FOOTER_BUTTON_ALIGNMENT, MODAL_CONTROLS_POSITION, KEYS_CHARCODE } from '../consts';
import styles from '../../statics/styles/url-input-modal.scss';

interface UrlInputModalProps {
  onConfirm: () => void;
  input?: string;
  t: TranslationFunction;
  languageDir?: string;
  submittedInvalidUrl?: boolean;
  dataHook: string;
  title: string;
  errorMessage: string;
  placeholder: string;
  onInputChange: (url: string) => void;
  onCloseRequested: () => void;
  theme?: RichContentTheme;
  buttonAlignment?: string;
  controlsPosition?: string;
  selected?: boolean;
  textInput?: { searchIcon: boolean };
  buttonSize?: string;
}

export default class UrlInputModal extends Component<
  UrlInputModalProps,
  { isDropdownOpen: boolean }
> {
  styles: Record<string, string>;

  classes: Record<string, string>;

  input: HTMLInputElement | null = null;

  constructor(props: UrlInputModalProps) {
    super(props);
    this.state = {
      isDropdownOpen: false,
    };
    const { theme = {}, buttonAlignment } = props;
    this.styles = mergeStyles({ styles, theme });
    const endAlignmentStyles =
      buttonAlignment === FOOTER_BUTTON_ALIGNMENT.END && this.styles.endAlignment;
    const getClassNames = (st: string) => classNames(st, endAlignmentStyles);
    this.classes = {
      container: getClassNames(styles.urlInput_container),
      headerText: getClassNames(styles.urlInput_header_text),
      closeBtn: getClassNames(styles.urlInput_closeIcon),
      header: getClassNames(styles.urlInput_header),
      input: getClassNames(styles.urlInputModal_textInput),
      topControls: getClassNames(styles.urlInputModal_topControls),
    };
  }

  onUrlChange = (url: string) => {
    this.props.onInputChange(url);
  };

  handleKeyPress = event => {
    if (event.charCode === KEYS_CHARCODE.ENTER) {
      this.props.onConfirm();
    }
    if (event.charCode === KEYS_CHARCODE.ESCAPE) {
      this.props.onCloseRequested();
    }
  };

  componentDidMount() {
    if (this.input) {
      this.input.focus();
      this.input.setSelectionRange(0, this.input.value.length);
    }
  }

  render() {
    const {
      t,
      languageDir,
      onConfirm,
      input = '',
      submittedInvalidUrl = false,
      dataHook,
      title,
      errorMessage,
      placeholder,
      onCloseRequested,
      children,
      theme = {},
      buttonAlignment = FOOTER_BUTTON_ALIGNMENT.CENTER,
      controlsPosition = MODAL_CONTROLS_POSITION.BOTTOM,
      selected = true,
      textInput = true,
      buttonSize,
    } = this.props;
    const topControls = controlsPosition === MODAL_CONTROLS_POSITION.TOP;
    const { styles, classes } = this;
    return (
      <>
        {topControls && (
          <SettingsMobileHeader
            theme={theme}
            saveLabel={t('EmbedURL_Common_CTA_Primary')}
            cancelLabel={t('EmbedURL_Common_CTA_Secondary')}
            onSave={() => onConfirm()}
            onCancel={() => onCloseRequested()}
            t={t}
          />
        )}
        <div
          className={classNames(classes.container, { [classes.topControls]: topControls })}
          data-hook={dataHook}
          dir={languageDir}
        >
          {!topControls && <CloseIcon className={classes.closeBtn} onClick={onCloseRequested} />}
          <div className={classes.header}>
            <div className={classes.headerText}>{title}</div>
          </div>
          <div className={classes.input}>
            {textInput && (
              <TextInput
                //@ts-ignore
                onClick={() => this.setState({ isDropdownOpen: true })}
                inputRef={ref => {
                  this.input = ref;
                }}
                type="url"
                id="dropdown-text-input"
                onKeyPress={this.handleKeyPress}
                onChange={this.onUrlChange}
                value={input}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore: should not pass boolean value to string error
                error={submittedInvalidUrl && errorMessage}
                placeholder={placeholder}
                theme={styles}
                data-hook={`${dataHook}Input`}
                autoComplete="off"
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore: textInput's default value is true, but should probably be { searchIcon: true }
                searchIcon={textInput?.searchIcon}
              />
            )}
            {children}
          </div>
          {!topControls && (
            <SettingsPanelFooter
              save={() => onConfirm()}
              cancel={onCloseRequested}
              saveLabel={t('EmbedURL_Common_CTA_Primary')}
              cancelLabel={t('EmbedURL_Common_CTA_Secondary')}
              theme={theme}
              layoutOptions={{ isModal: true, buttonAlignment }}
              t={t}
              selected={selected}
              buttonSize={buttonSize}
            />
          )}
        </div>
      </>
    );
  }
}
