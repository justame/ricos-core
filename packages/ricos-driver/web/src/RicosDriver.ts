const getDataHookSelector = (dataHook: string) => `[data-hook="${dataHook}"]`;

const RicosDriver = {
  editor: {
    root: (tiptap = false) => (tiptap ? '.ProseMirror' : '.DraftEditor-root'),
    contentEditable: '[contenteditable="true"]',
    addPanelButton: getDataHookSelector('addPluginFloatingToolbar'),
    floatingFormattingToolbar: (tiptap = false) =>
      getDataHookSelector(tiptap ? 'floating-formatting-toolbar' : 'inlineToolbar'),
    mobileToolbar: getDataHookSelector('mobileToolbar'),
  },

  viewer: {
    image: {
      root: getDataHookSelector('imageViewer'),
    },
    fullScreen: {
      root: getDataHookSelector('fullscreen-root'),
      loadedImage: getDataHookSelector(`gallery-item-image-img`),
      proGalleryRoot: '#pro-gallery-default-dom-id',
    },
    gallery: {
      image: getDataHookSelector('gallery-item-image-img'),
    },
  },
};

export default RicosDriver;
