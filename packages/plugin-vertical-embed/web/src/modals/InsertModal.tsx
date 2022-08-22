import React, { useContext } from 'react';
import type { FC } from 'react';
import { convertBlockDataToRicos } from 'ricos-content/libs/convertBlockDataToRicos';
import { ModalContext, RicosContext, EditorContext, PluginsEventsContext } from 'ricos-context';
import VerticalEmbedInsertModal from '../toolbar/VerticalEmbedInsertModal';
import { VERTICAL_EMBED_TYPE } from '../types';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  verticalsApi: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  componentData: Record<string, any>;
  modalId: string;
  nodeId?: string;
}

const InsertModal: FC<Props> = ({ componentData, verticalsApi, nodeId, modalId }) => {
  const { locale, t, isMobile, experiments } = useContext(RicosContext);
  const { getEditorCommands } = useContext(EditorContext);
  const modalService = useContext(ModalContext);
  const pluginsEvents = useContext(PluginsEventsContext);

  const closeModal = () => {
    modalService.closeModal(modalId);
  };
  const addBlockWithFocus = insertBlock => setTimeout(() => insertBlock(), 50);

  const onConfirm = verticalEmbed => {
    const editorCommands = getEditorCommands();
    const data = convertBlockDataToRicos(VERTICAL_EMBED_TYPE, verticalEmbed);
    let insertVertical = () => {
      editorCommands?.insertBlockWithBlankLines(VERTICAL_EMBED_TYPE, data);
    };
    if (nodeId) {
      insertVertical = () => {
        editorCommands?.setBlock(nodeId, VERTICAL_EMBED_TYPE, data);
      };
    }
    addBlockWithFocus(insertVertical);
    closeModal();
  };

  const pluginEvents = {
    onPluginsPopOverClick: data => pluginsEvents.publishPluginPopoverClick(data),
  };

  return (
    <VerticalEmbedInsertModal
      componentData={componentData}
      t={t}
      isMobile={isMobile}
      locale={locale}
      verticalsApi={verticalsApi}
      onConfirm={onConfirm}
      experiments={experiments}
      onCloseRequested={closeModal}
      helpers={pluginEvents}
    />
  );
};

export default InsertModal;
