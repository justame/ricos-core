//@ts-nocheck
/* eslint-disable no-console */

export class PDFViewSDKClient {
  constructor(scope) {
    this.window = scope;
    this.readyPromise = new Promise(resolve => {
      if (this.window.AdobeDC) {
        resolve();
      } else {
        /* Wait for Adobe Document Services PDF Embed API to be ready */
        this.window.document.addEventListener('adobe_dc_view_sdk.ready', () => {
          resolve();
        });
      }
    });
  }

  ready() {
    return this.readyPromise;
  }

  previewFileWithURL(config, fileData, viewerConfig) {
    /* Invoke the file preview API on Adobe DC View object */
    const { url, fileName } = fileData;
    this.adobeDCView = new this.window.AdobeDC.View(config);
    return new Promise(resolve => {
      this.adobeDCView.previewFile(
        {
          content: {
            location: {
              url,
            },
          },
          metaData: {
            fileName,
          },
        },
        {
          ...viewerConfig,
          showLeftHandPanel: false,
          showAnnotationTools: false,
          enableLinearization: true,
        }
      );
      resolve();
    });
  }

  previewFileWithBlob(config, fileData, viewerConfig) {
    /* Invoke the file preview API on Adobe DC View object */
    const { url, fileName } = fileData;
    return new Promise((resolve, reject) => {
      fetch(new Request(url))
        .then(response => response.blob())
        .then(blob => {
          this.adobeDCView = new this.window.AdobeDC.View(config);
          this.adobeDCView.previewFile(
            {
              content: {
                promise: Promise.resolve(blob.arrayBuffer()),
              },
              metaData: {
                fileName,
              },
            },
            {
              ...viewerConfig,
              showLeftHandPanel: false,
              showAnnotationTools: false,
              // enableLinearization: true,
            }
          );
          resolve();
        })
        .catch(reject);
    });
  }

  registerEventsHandler(eventsHandler) {
    this.adobeDCView.registerCallback(
      this.window.AdobeDC.View.Enum.CallbackType.EVENT_LISTENER,
      event => {
        eventsHandler(event.type);
      },
      {}
    );
  }
}
