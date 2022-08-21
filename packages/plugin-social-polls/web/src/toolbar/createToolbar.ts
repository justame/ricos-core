import { BUTTONS } from 'wix-rich-content-plugin-commons';
import {
  BUTTON_TYPES,
  TOOLBARS,
  INSERT_PLUGIN_BUTTONS,
  getModalStyles,
  decorateComponentWithProps,
  getBottomToolbarModalStyles,
} from 'wix-rich-content-editor-common';

import { TABS } from '../components/settings';
import { DEFAULT_COMPONENT_DATA, MEMBER_ROLES } from '../defaults';
import { InsertPluginIcon } from '../assets/icons';
import { Modals } from '../modals';
import { PollPresetSelectorModal } from '../components/settings/preset-selector';
import type { ModalStyles, CreatePluginToolbar } from 'wix-rich-content-common';
import { merge } from 'lodash';
import { POLL_TYPE } from '../types';

export const MobileFullScreenCustomStyle = Object.freeze({
  overlay: {
    backgroundColor: 'transparent',
  },
  content: {
    top: 0,
    left: 0,
    overflow: 'hidden',
  },
});

export const DesktopFlyOutModalStyles: ModalStyles = {
  overlay: {
    backgroundColor: 'transparent',
  },
  content: {
    width: '450px',
    maxWidth: '450px',
    boxSizing: 'border-box',
    height: '220px',
    overflow: 'visible',
    padding: '20px 25px 25px 25px',
    display: 'block',
    borderRadius: 'var(--ricos-settings-whitebox-border-radius, 2px)',
    position: 'absolute',
    border: 'solid 1px rgba(51, 51, 51, 0.1)',
    boxShadow: 'var(--ricos-settings-whitebox-box-shadow, 0 0 10px 0 rgba(0, 0, 0, 0.06))',
    zIndex: 6,
  },
};

const modalStyles: { customStyles: ModalStyles } = {
  customStyles: {
    overlay: {
      backgroundColor: 'transparent',
      zIndex: 10,
    },
    content: {
      border: '1px solid rgba(255, 255, 255, 0.25)',
      boxShadow: 'var(--ricos-settings-whitebox-box-shadow, 0 4px 8px 0 rgba(0, 0, 0, 0.1))',
    },
  },
};

const externalToolbarStyles: ModalStyles = {
  content: {
    width: '450px',
    boxSizing: 'border-box',
    height: '220px',
    overflow: 'visible',
    display: 'block',
    padding: 20,
  },
};

export const createToolbar: CreatePluginToolbar = ({ isMobile, settings, t }) => {
  const componentData = merge(DEFAULT_COMPONENT_DATA, {
    poll: { settings: { voteRole: settings?.voteRole || MEMBER_ROLES.ALL } },
  });
  const buttonProps = {
    type: BUTTON_TYPES.MODAL,
    name: INSERT_PLUGIN_BUTTONS.POLLS,
    tooltip: t('Poll_InsertPoll_Tooltip'),
    getIcon: () => InsertPluginIcon,
    componentData,
    modalElement: decorateComponentWithProps(PollPresetSelectorModal, {
      componentData,
      pluginId: POLL_TYPE,
    }),
  };

  const modalStylesByToolbar = {
    [TOOLBARS.FOOTER]: isMobile
      ? getModalStyles({ customStyles: MobileFullScreenCustomStyle, fullScreen: true, isMobile })
      : undefined,
    [TOOLBARS.INSERT_PLUGIN]: isMobile
      ? getModalStyles({
          customStyles: MobileFullScreenCustomStyle,
          fullScreen: true,
          isMobile,
        })
      : getModalStyles({ customStyles: externalToolbarStyles, fullScreen: false, isMobile }),
  };

  return {
    InlineButtons: [
      ...(isMobile
        ? [
            {
              keyName: 'edit',
              type: BUTTONS.EXTERNAL_MODAL,
              modalName: Modals.POLL_SETTINGS,
              children: t('Poll_Mobile_Editor_Toolbar_Edit'),
              modalStyles: getModalStyles(modalStyles),
              t,
              activeTab: TABS.EDIT,
              mobile: true,
              settings,
              pluginId: POLL_TYPE,
            },

            {
              keyName: 'customize',
              type: BUTTONS.EXTERNAL_MODAL,
              modalName: Modals.POLL_SETTINGS,
              children: t('Poll_Mobile_Editor_Toolbar_Customize'),
              modalStyles: getModalStyles(modalStyles),
              t,
              activeTab: TABS.DESIGN,
              mobile: true,
              settings,
              pluginId: POLL_TYPE,
            },
          ]
        : [
            {
              keyName: 'layout',
              type: BUTTONS.EXTERNAL_MODAL,
              fullHeight: true,
              modalName: Modals.POLL_SETTINGS,
              children: t('Poll_PollSettings_Tab_Layout_TabName'),
              modalStyles: getModalStyles(modalStyles),
              t,
              tooltipTextKey: 'Poll_PollSettings_Common_Header',
              activeTab: TABS.LAYOUT,
              mobile: false,
              settings,
            },

            { keyName: 'separator', mobile: false, type: BUTTONS.SEPARATOR },

            {
              keyName: 'design',
              type: BUTTONS.EXTERNAL_MODAL,
              fullHeight: true,
              modalName: Modals.POLL_SETTINGS,
              children: t('Poll_PollSettings_Tab_Design_TabName'),
              modalStyles: getModalStyles(modalStyles),
              t,
              tooltipTextKey: 'Poll_PollSettings_Common_Header',
              activeTab: TABS.DESIGN,
              mobile: false,
              settings,
            },

            { keyName: 'separator', mobile: false, type: BUTTONS.SEPARATOR },

            {
              keyName: 'settings',
              type: BUTTONS.EXTERNAL_MODAL,
              fullHeight: true,
              modalName: Modals.POLL_SETTINGS,
              children: t('Poll_PollSettings_Tab_Settings_TabName'),
              modalStyles: getModalStyles(modalStyles),
              t,
              tooltipTextKey: 'Poll_FormatToolbar_Settings_Tooltip',
              activeTab: TABS.SETTINGS,
              mobile: false,
              settings,
            },
          ]),

      { keyName: 'separator', mobile: true, type: BUTTONS.SEPARATOR },

      { keyName: 'delete', mobile: true, type: BUTTONS.DELETE },
    ],
    InsertButtons: [
      {
        ...buttonProps,
        toolbars: [TOOLBARS.FOOTER, TOOLBARS.SIDE],
        modalStyles: modalStylesByToolbar[TOOLBARS.FOOTER],
        modalStylesFn: ({ buttonRef, toolbarName }) => {
          return getBottomToolbarModalStyles(
            buttonRef,
            {
              customStyles: DesktopFlyOutModalStyles,
              centered: true,
              isMobile,
            },
            toolbarName
          );
        },
      },
      {
        ...buttonProps,
        toolbars: [TOOLBARS.INSERT_PLUGIN, TOOLBARS.MOBILE],
        modalStyles: modalStylesByToolbar[TOOLBARS.INSERT_PLUGIN],
        section: 'BlockToolbar_Section_Advanced',
      },
    ],
    name: 'poll',
  };
};
