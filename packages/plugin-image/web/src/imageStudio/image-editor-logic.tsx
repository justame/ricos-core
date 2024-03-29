import { getImageStudioPackage } from './image-studio-opener-loader';
import type { ImageEditorWixSettings, ExtendedBlob } from '../types';

async function setupImageEditor(
  imageEditorWixSettings: ImageEditorWixSettings,
  rootElementId: string,
  fileName: string,
  onSave: (file: File) => void,
  onClose: () => void
) {
  const { MediaImageStudio, MediaImageStudioEvents, MediaImageStudioMode } =
    await getImageStudioPackage();
  const mediaImageStudio = new MediaImageStudio({
    ...(await Promise.resolve(imageEditorWixSettings)),
    appendTo: document.querySelector(`[id=${rootElementId}]`),
  });
  const imageDataSubscription = mediaImageStudio.once(
    MediaImageStudioEvents.ImageData,
    imageData => {
      const file = blobToFile(imageData, fileName);
      onSave(file);
    }
  );

  mediaImageStudio.once(MediaImageStudioEvents.Close, () => {
    imageDataSubscription.remove();
    mediaImageStudio.kill();
    onClose();
  });

  mediaImageStudio.show({
    mode: MediaImageStudioMode.Transform,
    fileId: fileName,
  });
}

function blobToFile(blob: ExtendedBlob, fileName: string) {
  //A Blob() is almost a File() - it's just missing the two properties below which we will add
  blob.lastModified = new Date().getTime();
  blob.name = fileName;
  blob.webkitRelativePath = '';
  return blob;
}

export { setupImageEditor };
