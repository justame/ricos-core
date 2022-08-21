import React from 'react';
import VideoInsertModal from './NewVideoInsertModal';

const VideoModal = props => {
  const {
    helpers: { closeModal },
    pubsub,
  } = props;

  const onReplace = video => pubsub.update('componentData', video);

  return <VideoInsertModal {...props} onReplace={onReplace} closeModal={closeModal} />;
};

export default VideoModal;
