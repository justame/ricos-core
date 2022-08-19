/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable fp/no-loops */
import React from 'react';
import { merge, cloneDeep } from 'lodash';
import type { RICOS_LINK_TYPE, EditorCommands, TranslationFunction } from 'wix-rich-content-common';
import { CUSTOM_LINK, SPOILER_TYPE } from 'wix-rich-content-common';
import {
  buttonsFullData,
  inlineStyleButtons,
  textBlockButtons,
  decorationButtons,
  setTextAlignment,
  colorTypes,
  documentStyleCssProperties,
  inlineOverrideStyles,
} from './buttonsListCreatorConsts';
import { HEADER_TYPE_MAP } from 'wix-rich-content-plugin-commons';
import type { RicosTheme } from 'ricos-types';
import {
  getBlockStyle,
  findOsName,
  getSpacing,
  handleLinkSettings,
  goToLink,
  updateDynamicStyles,
  getHeadingIcon,
  getCurrentHeading,
  handleAlignmentIcon,
  getHeadingsLabel,
  getFontSize,
} from './utils';
import type { linkPanelDataType, defaultLineSpacingType } from './RicosToolbar';

type editorCommands = EditorCommands;

export const createButtonsList = ({
  buttons,
  editorCommands,
  t,
  linkPanelData,
  colorPickerData,
  headingsData,
  defaultLineSpacing,
  theme,
  configButtonsOverrides,
}: {
  buttons: any;
  editorCommands: editorCommands;
  t: TranslationFunction;
  linkPanelData?: linkPanelDataType;
  colorPickerData: any;
  headingsData: any;
  defaultLineSpacing?: defaultLineSpacingType;
  theme?: RicosTheme;
  configButtonsOverrides: any;
}) => {
  const buttonsOverrides = cloneDeep(buttonsFullData);
  merge(buttonsOverrides, configButtonsOverrides);
  const buttonsList: any[] = [];
  const osName: string | null = findOsName();
  buttons.forEach((buttonKey, index) => {
    if (buttonKey?.type === 'component') {
      buttonsList.push(buttonKey);
    } else {
      handleButtonName(buttonsList, buttonKey, index);
      handleButtonType(buttonsList, index, buttonsOverrides);
      handleButtonIcon(buttonsList, index, editorCommands, buttonsOverrides);
      handleButtonDataHook(buttonsList, index, buttonsOverrides);
      handleButtIsMobileModalFullscreen(buttonsList, index, buttonsOverrides);
      handleButtonTooltip(buttonsList, index, t, osName, buttonsOverrides);
      handleButtonPlugin(buttonsList, index, buttonsOverrides);
      handleButtonLabel(buttonsList, index, editorCommands, t, headingsData, buttonsOverrides);
      handleButtonArrow(buttonsList, index, buttonsOverrides);
      handleUseIconOnMobile(buttonsList, index, buttonsOverrides);
      handleButtonOnClick(buttonsList, index, editorCommands, linkPanelData);
      handleButtonIsActive(buttonsList, index, editorCommands, buttonsOverrides);
      handleButtonIsDisabled(buttonsList, index, editorCommands);
      handleButtonModal(
        buttonsList,
        index,
        editorCommands,
        linkPanelData,
        headingsData,
        t,
        defaultLineSpacing,
        theme,
        buttonsOverrides
      );
      handleButtonOnSave(buttonsList, index, editorCommands, buttonsOverrides);
      handleButtonOnCancel(buttonsList, index, editorCommands, buttonsOverrides);
      handleButtonOnChange(buttonsList, index, editorCommands, headingsData, buttonsOverrides);
      handleButtonOnDone(buttonsList, index, editorCommands, buttonsOverrides, linkPanelData);
      handleButtonOnDelete(buttonsList, index, editorCommands, buttonsOverrides);
      // handleGroupButtons(buttonsList, buttonKey, index, editorCommands);
      buttonKey === 'Title' &&
        handleTitleButton(buttonsList, index, editorCommands, buttonsOverrides);
      handleButtonSaveState(buttonsList, index, editorCommands, buttonsOverrides);
      handleButtonSaveSelection(buttonsList, index, editorCommands, buttonsOverrides);
      handleButtonLoadSelection(buttonsList, index, editorCommands, buttonsOverrides);
      handleButtonColorPicker(
        buttonsList,
        index,
        editorCommands,
        colorPickerData,
        buttonsOverrides
      );
      handleButtonText(buttonsList, index, editorCommands, t);
      handleButtonIsInput(buttonsList, index, buttonsOverrides);
      handleButtonCloseOnChange(buttonsList, index, buttonsOverrides);
    }
  });
  return buttonsList;
};

const handleButtonIsInput = (buttonsList, index, buttonsOverrides) => {
  if (buttonsOverrides[buttonsList[index].name].isInput) {
    buttonsList[index].isInput = buttonsOverrides[buttonsList[index].name].isInput;
  }
};

const handleButtonCloseOnChange = (buttonsList, index, buttonsOverrides) => {
  if (buttonsOverrides[buttonsList[index].name].closeOnChange) {
    buttonsList[index].closeOnChange = buttonsOverrides[buttonsList[index].name].closeOnChange;
  }
};

const handleButtonText = (buttonsList, index, editorCommands: editorCommands, t) => {
  if (buttonsList[index].name === 'goToLink') {
    const linkData = editorCommands.getLinkDataInSelection();
    buttonsList[index].text = linkData?.url || t('LinkTo_Toolbar_GoTo');
    buttonsList[index].asLink = true;
  }
};

const handleButtonColorPicker = (
  buttonsList,
  index,
  editorCommands: editorCommands,
  colorPickerData,
  buttonsOverrides
) => {
  if (buttonsOverrides[buttonsList[index].name].type === 'color-picker') {
    const buttonName = buttonsList[index].name;
    const blockStyle = getBlockStyle(editorCommands);
    buttonsList[index].getCurrentColor = () =>
      editorCommands.getColor(colorTypes[buttonName]) ||
      blockStyle?.[documentStyleCssProperties[buttonName]];
    buttonsList[index].onColorAdded = color => colorPickerData[buttonName]?.onColorAdded?.(color);
    buttonsList[index].onChange = color => {
      editorCommands.insertDecoration(colorTypes[buttonName], { color });
    };
    buttonsList[index].settings = colorPickerData[buttonName] || {};
    buttonsList[index].defaultPalette = Object.freeze([
      '#ff0000',
      '#ffffff',
      '#303030',
      '#3a54b4',
      '#bfad80',
      '#dddddd',
    ]);
    buttonsList[index].getUserColors = () => colorPickerData[buttonName]?.getUserColors?.();
    buttonsList[index].getDefaultColors = () =>
      colorPickerData[buttonName]?.getDefaultColors?.() ||
      Object.freeze(['#ff0000', '#ffffff', '#303030', '#3a54b4', '#bfad80', '#dddddd']);
    buttonsList[index].onResetColor = () => {
      editorCommands.insertDecoration(colorTypes[buttonName]);
    };
    buttonsList[index].colorPickerHeaderKey = buttonsOverrides[buttonName].colorPickerHeaderKey;
    buttonsList[index].withColoredIcon = true;
  }
};

const handleButtonOnDelete = (
  buttonsList,
  index,
  editorCommands: editorCommands,
  buttonsOverrides
) => {
  if (buttonsOverrides[buttonsList[index].name].onDelete) {
    const buttonName = buttonsList[index].name;
    if (buttonName === 'LINK' || buttonName === 'editLink') {
      buttonsList[index].onDelete = () => {
        editorCommands.deleteDecoration(decorationButtons[buttonName] as typeof RICOS_LINK_TYPE);
      };
    }
  }
};

const handleButtonOnDone = (
  buttonsList,
  index,
  editorCommands: editorCommands,
  buttonsOverrides,
  linkPanelData
) => {
  if (buttonsOverrides[buttonsList[index].name].onDone) {
    const buttonName = buttonsList[index].name;
    if (buttonName === 'LINK' || buttonName === 'editLink') {
      buttonsList[index].onDone = data => {
        linkPanelData.onAddPluginLink?.(data);
        editorCommands.insertDecoration(decorationButtons[buttonName], data);
      };
    }
  }
};

const handleButtonOnChange = (
  buttonsList,
  index,
  editorCommands: editorCommands,
  headingsData,
  buttonsOverrides
) => {
  if (buttonsOverrides[buttonsList[index].name].onChange) {
    const buttonName = buttonsList[index].name;
    if (['LINE_SPACING', 'FONT_SIZE'].includes(buttonName)) {
      buttonsList[index].onChange = value => {
        updateDynamicStyles(value, editorCommands, buttonName);
      };
    } else if (buttonName === 'HEADINGS' && headingsData.allowHeadingCustomization) {
      buttonsList[index].onChange = documentStyle => {
        editorCommands.clearSelectedBlocksInlineStyles(['UNDERLINE', SPOILER_TYPE]);
        setTimeout(() => editorCommands.updateDocumentStyle(documentStyle));
      };
    }
  }
};

const handleButtonOnCancel = (
  buttonsList,
  index,
  editorCommands: editorCommands,
  buttonsOverrides
) => {
  if (buttonsOverrides[buttonsList[index].name].onCancel) {
    const buttonName = buttonsList[index].name;
    if (buttonName === 'LINE_SPACING') {
      buttonsList[index].onCancel = () => editorCommands.loadEditorState();
    }
  }
};

const handleButtonSaveState = (
  buttonsList,
  index,
  editorCommands: editorCommands,
  buttonsOverrides
) => {
  if (buttonsOverrides[buttonsList[index].name].saveState) {
    buttonsList[index].saveState = () => {
      editorCommands.saveSelectionState();
      editorCommands.saveEditorState();
    };
  }
};

const handleButtonLoadSelection = (
  buttonsList,
  index,
  editorCommands: editorCommands,
  buttonsOverrides
) => {
  if (buttonsOverrides[buttonsList[index].name].loadSelection) {
    buttonsList[index].loadSelection = () => {
      setTimeout(() => editorCommands.loadSelectionState());
    };
  }
};

const handleButtonSaveSelection = (
  buttonsList,
  index,
  editorCommands: editorCommands,
  buttonsOverrides
) => {
  if (buttonsOverrides[buttonsList[index].name].saveSelection) {
    buttonsList[index].saveSelection = () => {
      editorCommands.saveSelectionState();
    };
  }
};

const handleTitleButton = (
  buttonsList,
  index,
  editorCommands: editorCommands,
  buttonsOverrides
) => {
  const currentHeading = getCurrentHeading(editorCommands);
  let headingKey;
  switch (currentHeading) {
    case 'H2':
      headingKey = 'header-two';
      break;
    case 'H3':
      headingKey = 'header-three';
      break;
    default:
      headingKey = 'unstyled';
      break;
  }
  buttonsList[index].getIcon = () => buttonsOverrides[buttonsList[index].name][headingKey].icon;
  buttonsList[index].onClick = () =>
    editorCommands.setBlockType(buttonsOverrides[buttonsList[index].name][headingKey].action);
  buttonsList[index].isActive = () => headingKey === 'header-three' || headingKey === 'header-two';
};

const handleButtonOnSave = (
  buttonsList,
  index,
  editorCommands: editorCommands,
  buttonsOverrides
) => {
  if (buttonsOverrides[buttonsList[index].name].onSave) {
    const buttonName = buttonsList[index].name;
    if (Object.keys(textBlockButtons).includes(buttonName)) {
      buttonsList[index].onSave = type => {
        setTimeout(() => {
          editorCommands.setBlockType(type);
        });
      };
    } else if (buttonName === 'HEADINGS') {
      buttonsList[index].onSave = type => {
        editorCommands.clearSelectedBlocksInlineStyles();
        const currentHeading = HEADER_TYPE_MAP[getCurrentHeading(editorCommands)];
        const shouldSetBlockType = currentHeading !== type;
        shouldSetBlockType &&
          setTimeout(() => {
            editorCommands.setBlockType(type);
          });
      };
    } else if (buttonName === 'Alignment') {
      buttonsList[index].onSave = type => editorCommands.setTextAlignment(type);
    } else if (Object.keys(decorationButtons).includes(buttonName)) {
      buttonsList[index].onSave = value => {
        if (['LINE_SPACING', 'FONT_SIZE'].includes(buttonName)) {
          if (value) {
            updateDynamicStyles(value, editorCommands, buttonName);
          }
        }
      };
    }
  }
};

const handleButtonModal = (
  buttonsList,
  index,
  editorCommands: editorCommands,
  linkPanelData,
  headingsData,
  t,
  defaultLineSpacing,
  theme,
  buttonsOverrides
) => {
  const buttonName = buttonsList[index].name;
  if (buttonsOverrides[buttonName].modal) {
    buttonsList[index].modal = buttonsOverrides[buttonName].modal;
    if (buttonName === 'HEADINGS') {
      const Modal = buttonsOverrides[buttonName].modal;
      const currentHeading = HEADER_TYPE_MAP[getCurrentHeading(editorCommands)];
      const documentStyle = editorCommands.getDocumentStyle();
      buttonsList[index].modal = props =>
        Modal && (
          <Modal
            {...props}
            currentSelect={currentHeading}
            documentStyle={documentStyle}
            customHeadings={headingsData?.customHeadings}
            allowHeadingCustomization={headingsData?.allowHeadingCustomization}
            currentInlineStyles={editorCommands.getAnchorBlockInlineStyles()}
            wiredFontStyles={editorCommands.getWiredFontStyles(theme?.customStyles, props.isMobile)}
            t={t}
          />
        );
    } else if (buttonName === 'Alignment') {
      const alignment = editorCommands.getTextAlignment();
      const Modal = buttonsOverrides[buttonName].modal;
      buttonsList[index].modal = props => Modal && <Modal {...props} currentSelect={alignment} />;
    } else if (buttonName === 'LINE_SPACING') {
      const Modal = buttonsOverrides[buttonName].modal;
      const currentSpacing = editorCommands.getBlockSpacing();
      const spacing = getSpacing(currentSpacing, defaultLineSpacing);
      buttonsList[index].modal = props => Modal && <Modal {...props} currentSelect={spacing} />;
    } else if (buttonName === 'LINK' || buttonName === 'editLink') {
      const { onLinkAdd, linkSettings = {}, ...rest } = linkPanelData;
      const linkData = editorCommands.getLinkDataInSelection();
      const isCustomLinkHandling = !!onLinkAdd;
      if (isCustomLinkHandling) {
        const customLinkData = linkData?.customData;
        const callback = data => editorCommands.insertDecoration(CUSTOM_LINK, data);
        buttonsList[index].type = 'button';
        buttonsList[index].onClick = () => onLinkAdd(customLinkData, callback);
      } else {
        const Modal = buttonsOverrides[buttonName].modal;
        const anchorableBlocks = editorCommands.getAnchorableBlocks();
        const linkSettingsData = handleLinkSettings(linkSettings);
        buttonsList[index].modal = props =>
          Modal && (
            <Modal
              {...props}
              {...rest}
              {...linkSettingsData}
              {...linkData}
              t={t}
              anchorableBlocksData={anchorableBlocks}
              isMobileModalFullscreen
            />
          );
      }
    } else if (buttonName === 'FONT_SIZE') {
      const Modal = buttonsOverrides[buttonName].modal;
      buttonsList[index].modal = props =>
        Modal && <Modal {...props} currentSelect={getFontSize(editorCommands)} t={t} />;
    }
  }
};

const handleButtonIsDisabled = (buttonsList, index, editorCommands: editorCommands) => {
  const buttonName = buttonsList[index].name;
  if (buttonName === 'UNDO') {
    buttonsList[index].isDisabled = () => editorCommands.isUndoStackEmpty();
  } else if (buttonName === 'REDO') {
    buttonsList[index].isDisabled = () => editorCommands.isRedoStackEmpty();
  } else if (buttonName === 'LINK') {
    buttonsList[index].isDisabled = () => editorCommands.isAtomicBlockInSelection();
  } else {
    buttonsList[index].isDisabled = () => false;
  }
};

const handleButtonIsActive = (
  buttonsList,
  index,
  editorCommands: editorCommands,
  buttonsOverrides
) => {
  const buttonName = buttonsList[index].name;
  if (buttonsOverrides[buttonName].isActive) {
    buttonsList[index].isActive = buttonsOverrides[buttonName].isActive;
  } else if (Object.keys(inlineStyleButtons).includes(buttonName)) {
    buttonsList[index].isActive = () => {
      const blockStyle = getBlockStyle(editorCommands);
      const property = documentStyleCssProperties[buttonName];
      return (
        editorCommands.hasInlineStyle(inlineStyleButtons[buttonName]) ||
        (blockStyle?.[property] &&
          blockStyle[property] === inlineStyleButtons[buttonName] &&
          !editorCommands.hasInlineStyle(inlineOverrideStyles[buttonName]))
      );
    };
  } else if (Object.keys(textBlockButtons).includes(buttonName)) {
    buttonsList[index].isActive = () =>
      editorCommands.isBlockTypeSelected(textBlockButtons[buttonName]);
  } else if (Object.keys(setTextAlignment).includes(buttonName)) {
    buttonsList[index].isActive = () =>
      editorCommands.getTextAlignment() === setTextAlignment[buttonName];
  } else if (buttonName === 'LINK') {
    buttonsList[index].isActive = () => editorCommands.hasLinkInSelection();
  } else if (Object.keys(colorTypes).includes(buttonName)) {
    buttonsList[index].isActive = () =>
      editorCommands.getColor(colorTypes[buttonName]) !== undefined;
  } else if (buttonName === 'AddPlugin') {
    buttonsList[index].isActive = () => false;
    buttonsList[index].iconInActionColor = true;
  } else {
    buttonsList[index].isActive = () => false;
  }
};

const handleButtonOnClick = (buttonsList, index, editorCommands: editorCommands, linkPanelData) => {
  const buttonName = buttonsList[index].name;
  if (Object.keys(inlineStyleButtons).includes(buttonName)) {
    buttonsList[index].onClick = () =>
      editorCommands.toggleInlineStyle(inlineStyleButtons[buttonName]);
  } else if (Object.keys(textBlockButtons).includes(buttonName)) {
    buttonsList[index].onClick = () => editorCommands.setBlockType(textBlockButtons[buttonName]);
  } else if (Object.keys(setTextAlignment).includes(buttonName)) {
    buttonsList[index].onClick = () =>
      editorCommands.setTextAlignment(setTextAlignment[buttonName]);
  } else if (Object.keys(decorationButtons).includes(buttonName)) {
    if (buttonName === 'DECREASE_INDENT') {
      buttonsList[index].onClick = () =>
        editorCommands.insertDecoration(decorationButtons[buttonName], -1);
    } else if (buttonName === 'INCREASE_INDENT') {
      buttonsList[index].onClick = () =>
        editorCommands.insertDecoration(decorationButtons[buttonName], 1);
    } else if (buttonName === 'removeLink') {
      buttonsList[index].onClick = () =>
        editorCommands.deleteDecoration(decorationButtons[buttonName] as typeof RICOS_LINK_TYPE);
    }
  } else if (buttonName === 'UNDO') {
    buttonsList[index].onClick = () => editorCommands.undo();
  } else if (buttonName === 'REDO') {
    buttonsList[index].onClick = () => editorCommands.redo();
  } else if (buttonName === 'goToLink') {
    buttonsList[index].onClick = event =>
      goToLink(event, editorCommands.getLinkDataInSelection(), linkPanelData);
  } else if (buttonName === 'AddPlugin') {
    buttonsList[index].onClick = () => {
      const addPluginButton = document.querySelector(
        '[data-hook=addPluginFloatingToolbar]'
      ) as HTMLElement;
      addPluginButton?.click();
    };
  } else {
    // eslint-disable-next-line no-console
    buttonsList[index].onClick = () => console.log('click');
  }
};

const handleButtonArrow = (buttonsList, index, buttonsOverrides) => {
  if (buttonsOverrides[buttonsList[index].name].arrow) {
    buttonsList[index].arrow = buttonsOverrides[buttonsList[index].name].arrow;
  }
};

const handleUseIconOnMobile = (buttonsList, index, buttonsOverrides) => {
  if (buttonsOverrides[buttonsList[index].name].useIconOnMobile) {
    buttonsList[index].useIconOnMobile = buttonsOverrides[buttonsList[index].name].useIconOnMobile;
  }
};

const handleButtonLabel = (
  buttonsList,
  index,
  editorCommands: editorCommands,
  t,
  headingsData,
  buttonsOverrides
) => {
  const buttonName = buttonsList[index].name;
  if (buttonsOverrides[buttonName].label) {
    buttonsList[index].getLabel = () => buttonsOverrides[buttonName].label;
    if (buttonName === 'HEADINGS') {
      buttonsList[index].getLabel = () => getHeadingsLabel(editorCommands, t, headingsData);
    } else if (buttonName === 'FONT_SIZE') {
      buttonsList[index].getLabel = () => getFontSize(editorCommands);
    }
  }
};

const handleButtonTooltip = (buttonsList, index, t, osName, buttonsOverrides) => {
  if (buttonsOverrides[buttonsList[index].name].tooltip) {
    const tooltipShortcut = buttonsOverrides[buttonsList[index].name].tooltipShortcut;
    buttonsList[index].tooltip = t(
      buttonsOverrides[buttonsList[index].name].tooltip,
      tooltipShortcut &&
        osName && {
          shortcut: tooltipShortcut[osName],
        }
    );
  }
};

const handleButtonPlugin = (buttonsList, index, buttonsOverrides) => {
  if (buttonsOverrides[buttonsList[index].name].plugin) {
    buttonsList[index].plugin = buttonsOverrides[buttonsList[index].name].plugin;
  }
};

const handleButtonDataHook = (buttonsList, index, buttonsOverrides) => {
  if (buttonsOverrides[buttonsList[index].name].dataHook) {
    buttonsList[index].dataHook = buttonsOverrides[buttonsList[index].name].dataHook;
  }
};

const handleButtIsMobileModalFullscreen = (buttonsList, index, buttonsOverrides) => {
  if (buttonsOverrides[buttonsList[index].name].isMobileModalFullscreen) {
    buttonsList[index].isMobileModalFullscreen =
      buttonsOverrides[buttonsList[index].name].isMobileModalFullscreen;
  }
};

const handleButtonIcon = (buttonsList, index, editorCommands: editorCommands, buttonsOverrides) => {
  const buttonName = buttonsList[index].name;
  if (buttonsOverrides[buttonName].icon) {
    buttonsList[index].getIcon = () => buttonsOverrides[buttonsList[index].name].icon;
  } else if (buttonName === 'Alignment') {
    buttonsList[index].getIcon = () => handleAlignmentIcon(editorCommands);
  } else if (buttonName === 'HEADINGS') {
    buttonsList[index].getIcon = () => getHeadingIcon(editorCommands);
  }
};

const handleButtonType = (buttonsList, index, buttonsOverrides) => {
  if (buttonsOverrides[buttonsList[index].name]?.type) {
    buttonsList[index].type = buttonsOverrides[buttonsList[index].name].type;
  } else {
    console.error(
      `${buttonsList[index].name} button not found (need to be declared in buttonsListCreatorConsts.tsx)`
    );
  }
};

const handleButtonName = (buttonsList, buttonKey, index) => {
  if (buttonKey === '|') {
    buttonsList[index] = { name: 'Separator' };
    // } else if (typeof buttonKey !== 'string') {
    //   //grouped buttons
    //   buttonsList[index] = { name: buttonKey.name };
  } else {
    buttonsList[index] = { name: buttonKey };
  }
};

// const handleGroupButtons = (buttonsList, buttonKey, index, editorCommands: editorCommands) => {
//   if (buttonKey.buttons) {
//     buttonsList[index].buttonList = {};
//     buttonKey.buttons.forEach(innerButtonKey => {
//       buttonsList[index].buttonList[innerButtonKey] = { name: innerButtonKey };
//       addGroupButtonsData(buttonsList, index, innerButtonKey, editorCommands);
//     });
//   }
// };

// const addGroupButtonsData = (
//   buttonsList,
//   index,
//   innerButtonKey,
//   editorCommands: editorCommands
// ) => {
//   const currentInnerButton = buttonsList[index].buttonList[innerButtonKey];
//   if (buttonsFullData[innerButtonKey].type) {
//     currentInnerButton.type = buttonsFullData[innerButtonKey].type;
//   }
//   if (buttonsFullData[innerButtonKey].icon) {
//     currentInnerButton.getIcon = () => buttonsFullData[innerButtonKey].icon;
//   }
//   if (buttonsFullData[innerButtonKey].dataHook) {
//     currentInnerButton.dataHook = buttonsFullData[innerButtonKey].dataHook;
//   }
//   if (buttonsFullData[innerButtonKey].tooltip) {
//     currentInnerButton.tooltip = buttonsFullData[innerButtonKey].tooltip;
//   }
//   //TODO: check type of button (Alignment)
//   currentInnerButton.onClick = () =>
//     editorCommands.setTextAlignment(setTextAlignment[innerButtonKey]);
//   currentInnerButton.isActive = () =>
//     editorCommands.getTextAlignment() === buttonsFullData[innerButtonKey].action;
//   currentInnerButton.isDisabled = () => false;
// };
