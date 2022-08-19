import type { ComponentType, FunctionComponent, ReactElement } from 'react';
import React, { Fragment, Children } from 'react';
import EditorModalProvider from './EditorModalProvider';
import type { RicosEditorProps } from 'ricos-common';
import { GlobalContext, getLangDir } from 'wix-rich-content-common';

const RicosModal: FunctionComponent<
  RicosEditorProps & {
    container?: HTMLElement;
    children: ReactElement;
    parentClass?: string;
  }
> = props => {
  let ModalProvider: ComponentType = Fragment;
  const {
    children: {
      props: { helpers = {} },
    },
    experiments = {},
    isMobile = false,
    locale,
  } = props;
  const { openModal, closeModal } = helpers;

  if (!openModal && !closeModal) {
    ModalProvider = EditorModalProvider;
  }
  const context = { experiments, isMobile, languageDir: getLangDir(locale) };

  const child = Children.only(React.cloneElement(props.children, { ...props }));
  return (
    <GlobalContext.Provider value={context}>
      <ModalProvider {...props}>{child}</ModalProvider>
    </GlobalContext.Provider>
  );
};

export default RicosModal;
