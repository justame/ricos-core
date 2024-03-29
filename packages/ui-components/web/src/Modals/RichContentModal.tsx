import type { ComponentType } from 'react';
import React, { Component } from 'react';
import FocusManager from '../Components/FocusManager';
import { DECORATION_MODE } from '../consts';
import type { ModalDecorations, Helpers } from 'wix-rich-content-common';
import { getLangDir, generateKey } from 'wix-rich-content-common';

const renderWrappedModalElement = (wrapping, ModalElement, modalProps) => {
  if (wrapping.length === 0) {
    return <ModalElement {...modalProps} />;
  } else {
    const Wrapper = wrapping.shift();
    return (
      <Wrapper {...modalProps}>
        {renderWrappedModalElement(wrapping, ModalElement, modalProps)}
      </Wrapper>
    );
  }
};

interface Props {
  modalElement?: ComponentType;
  modalDecorations?: ModalDecorations;
  locale?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [propName: string]: any;
  helpers?: Helpers;
  pluginId?: string;
}

class RichContentModal extends Component<Props> {
  settingSessionId?: string;

  componentDidMount() {
    this.settingSessionId = generateKey();
    this.triggerBi('settingsModalOpenedForPlugin');
  }

  componentWillUnmount() {
    this.triggerBi('settingsModalClosedForPlugin');
  }

  triggerBi = action => {
    const { triggerSettingsBi, helpers, pluginId = '' } = this.props;
    if (triggerSettingsBi) {
      helpers?.onPluginAction?.(action, {
        plugin_id: pluginId,
        settingSessionId: this.settingSessionId,
      });
    }
  };

  render() {
    const { modalElement, modalDecorations = [], locale, ...modalProps } = this.props;
    const ModalElement = modalElement;
    const prepended = modalDecorations
      .filter(({ decorationMode }) => decorationMode === DECORATION_MODE.PREPEND)
      .map(({ decorator }) => decorator);
    const wrapping = modalDecorations
      .filter(({ decorationMode }) => decorationMode === DECORATION_MODE.WRAP)
      .map(({ decorator }) => decorator);
    const appended = modalDecorations
      .filter(({ decorationMode }) => decorationMode === DECORATION_MODE.APPEND)
      .map(({ decorator }) => decorator);

    return (
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore: dir has no effect here since it's not a prop in FocusManager
      <FocusManager dir={getLangDir(locale)}>
        {prepended?.map((Prepended, index) => (
          <Prepended key={`prepended_decorator_${index}`} {...modalProps} />
        ))}
        {renderWrappedModalElement(wrapping, ModalElement, modalProps)}
        {appended?.map((Appended, index) => (
          <Appended key={`appended_decorator_${index}`} {...modalProps} />
        ))}
      </FocusManager>
    );
  }
}

export default RichContentModal;
