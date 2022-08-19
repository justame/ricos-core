/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Component } from 'react';
import Toolbar from './Toolbar';
import { createButtonsList } from './buttonsListCreator';
import type {
  TranslationFunction,
  EditorCommands,
  AnchorTarget,
  RelValue,
  Link_Rel,
  CustomAnchorScroll,
  OnAddPluginLink,
} from 'wix-rich-content-common';
import type { RicosCssOverride } from 'ricos-common';
import type { RicosTheme } from 'ricos-types';

export type linkPanelDataType = {
  linkTypes?: any;
  uiSettings?: {
    linkPanel?: {
      dropDown?: any;
      externalPopups?: boolean;
      showNewTabCheckbox?: boolean;
      showNoFollowCheckbox?: boolean;
      showSponsoredCheckbox?: boolean;
    };
  };
  isMobile?: boolean;
  linkSettings?: {
    anchorTarget?: AnchorTarget;
    relValue?: RelValue;
    rel?: Link_Rel;
    customAnchorScroll?: CustomAnchorScroll;
  };
  onLinkAdd?: any;
  onAddPluginLink?: OnAddPluginLink;
};

export type defaultLineSpacingType = {
  'line-height'?: string;
  'padding-top'?: string;
  'padding-bottom'?: string;
};

interface RicosToolbarProps {
  isMobile?: boolean;
  tabIndex?: number;
  t: TranslationFunction;
  vertical?: boolean;
  buttons?: any;
  editorCommands: EditorCommands;
  setKeepOpen?: (boolean) => void;
  afterClick?: () => void;
  nestedMenu?: boolean;
  theme?: RicosTheme;
  linkPanelData?: linkPanelDataType;
  colorPickerData?: any;
  headingsData?: any;
  onToolbarButtonClick?: (name: string, value?: any) => void;
  defaultLineSpacing?: defaultLineSpacingType;
  getEditorContainer: () => Element;
  cssOverride?: RicosCssOverride;
  configButtonsOverrides?: any;
  disabled?: boolean;
  dataHook?: string;
}

class RicosToolbar extends Component<RicosToolbarProps> {
  // separateByGaps = buttons => {
  //   const separatedButtons: any = [[]];
  //   buttons.forEach(button => {
  //     if (button.type !== TOOLBAR_BUTTON_TYPES.GAP) {
  //       separatedButtons[separatedButtons.length - 1].push(button);
  //     } else {
  //       separatedButtons.push([]);
  //     }
  //   });
  //   return separatedButtons;
  // };

  cleanUnwantedSeparators = buttons => {
    const cleanedButtons: any = [];
    buttons.forEach((button, index) => {
      if (
        (cleanedButtons.length !== 0 || button.type !== 'SEPARATOR') &&
        !(button.type === 'SEPARATOR' && buttons[index - 1].type === 'SEPARATOR')
      ) {
        cleanedButtons.push(button);
      }
    });
    // eslint-disable-next-line fp/no-loops
    while (cleanedButtons[cleanedButtons.length - 1].type === 'SEPARATOR') {
      cleanedButtons.pop();
    }
    return cleanedButtons;
  };

  render() {
    const {
      buttons,
      editorCommands,
      t,
      linkPanelData,
      colorPickerData,
      headingsData,
      isMobile,
      theme,
      vertical,
      setKeepOpen,
      afterClick,
      nestedMenu,
      defaultLineSpacing,
      getEditorContainer,
      cssOverride,
      configButtonsOverrides,
      disabled,
      dataHook,
    } = this.props;
    const updatedButtons = createButtonsList({
      buttons,
      editorCommands,
      t,
      linkPanelData,
      colorPickerData,
      headingsData,
      defaultLineSpacing,
      theme,
      configButtonsOverrides,
    });
    const buttonsWithoutUnwantedSeparators =
      updatedButtons.length > 0 && this.cleanUnwantedSeparators(updatedButtons);
    // const buttonsSeparatedByGaps = this.separateByGaps(buttonsWithoutUnwantedSeparators);

    return (
      <Toolbar
        buttons={buttonsWithoutUnwantedSeparators}
        t={t}
        isMobile={isMobile}
        theme={cssOverride}
        vertical={vertical}
        setKeepOpen={setKeepOpen}
        afterClick={afterClick}
        nestedMenu={nestedMenu}
        onToolbarButtonClick={this.props.onToolbarButtonClick}
        getEditorContainer={getEditorContainer}
        disabled={disabled}
        dataHook={dataHook}
      />
    );
  }
}

export default RicosToolbar;
