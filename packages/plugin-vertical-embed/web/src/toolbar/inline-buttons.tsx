import { BUTTONS } from 'wix-rich-content-plugin-commons';
import { getModalStyles, decorateComponentWithProps } from 'wix-rich-content-editor-common';
import { ReplaceIcon } from '../icons';
import getModalCustomStyles from './ModalCustomStyles';
import VerticalEmbedInputModal from './VerticalEmbedInputModal';
import type {
  AvailableExperiments,
  CreateInlineButtons,
  TranslationFunction,
} from 'wix-rich-content-common';
import type { VerticalEmbedPluginEditorConfig } from '../types';
import {
  DesktopFlyOutModalStyles,
  MOBILE_FULL_SCREEN_CUSTOM_STYLE,
} from 'wix-rich-content-ui-components';
import { modalContentStyles } from '../constants';

const createInlineButtons: CreateInlineButtons = ({
  t,
  isMobile,
  settings,
  locale,
  experiments = {},
}: {
  t: TranslationFunction;
  settings: VerticalEmbedPluginEditorConfig;
  isMobile: boolean;
  locale: string;
  experiments: AvailableExperiments;
}) => {
  const { newVideoVerticalAndSocialModals } = experiments;
  const useNewModal = newVideoVerticalAndSocialModals?.enabled;

  const newModalCustomStyles = isMobile
    ? MOBILE_FULL_SCREEN_CUSTOM_STYLE
    : { ...DesktopFlyOutModalStyles, content: modalContentStyles };

  const customStyles = useNewModal ? newModalCustomStyles : getModalCustomStyles(isMobile);

  const defaultModalStyles = getModalStyles({
    customStyles,
    fullScreen: !!useNewModal,
    isMobile,
  });

  const newModalStyles = isMobile ? defaultModalStyles : undefined;
  const modalStyles = useNewModal ? newModalStyles : defaultModalStyles;

  return [
    {
      keyName: 'replace',
      type: BUTTONS.EXTERNAL_MODAL,
      icon: ReplaceIcon,
      modalElement: decorateComponentWithProps(VerticalEmbedInputModal, { ...settings, locale }),
      modalStyles,
      mobile: true,
      tooltipTextKey: 'Replace product',
      t,
      modalStylesFn: useNewModal
        ? ({ buttonRef }) => {
            const modalStyles = getModalStyles({
              customStyles: newModalCustomStyles,
              fullScreen: true,
              isMobile,
            });
            const modalHeight = modalContentStyles.height as number;
            const { top, left } = buttonRef.getBoundingClientRect();
            const modalLeft = left - 15;
            const heightLeftBelow = window?.innerHeight - (top + 40);
            const dynamicModalTop =
              heightLeftBelow < modalHeight ? modalHeight - heightLeftBelow : top + 40;
            const modalTop = top > modalHeight ? top - 540 : dynamicModalTop;
            return {
              ...modalStyles,
              content: {
                ...modalStyles.content,
                top: modalTop,
                left: modalLeft,
                margin: 0,
                position: 'absolute',
              },
            };
          }
        : undefined,
    },
    { keyName: 'delete', type: BUTTONS.DELETE, mobile: true },
  ];
};

export default createInlineButtons;
