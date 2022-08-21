/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { PDFViewSDKClient } from './pdfViewSDKClient';
import {
  PDF_STATUS,
  PDF_OPTIONS_TO_EMBED_PROPERTIES,
  RICOS_LOCALE_TO_ADOBE,
  PDF_OPTIONS,
  ADOBE_EVENT_TO_PDF_STATUS,
} from './pdfConsts';
import styles from '../../statics/styles/pdf-viewer.scss';
import classnames from 'classnames';
import type { PDFViewerProps } from '../types';

function setAdobeSDKScript(scope) {
  const element = scope.document.createElement('script');
  element.setAttribute('id', 'ricos-adobe-pdf-view-sdk');
  element.setAttribute('src', 'https://documentcloud.adobe.com/view-sdk/main.js');
  scope.document.getElementsByTagName('body')[0].appendChild(element);
}

export function PDFViewer(props: PDFViewerProps) {
  const {
    status,
    setStatus,
    fileData,
    config: { clientId, locale = 'en' },
    pdfSettings,
  } = props;

  const [divId, setDivId] = useState<string | undefined>(undefined);

  if (!divId) {
    setDivId(`ricos-pdf-viewer-${Math.floor(Math.random() * 10000)}`);
  }

  const {
    viewMode = PDF_OPTIONS.NONE,
    disableDownload = false,
    disablePrint = false,
  } = pdfSettings || {};

  const handleError = error => {
    // eslint-disable-next-line no-console
    console.log(error);
    setStatus(PDF_STATUS.ERROR);
  };

  const eventsHandler = event => {
    const newStatus = ADOBE_EVENT_TO_PDF_STATUS[event];
    if (newStatus && newStatus !== status) {
      setStatus(newStatus);
    }
  };

  useEffect(() => {
    const pdfStatus = viewMode !== PDF_OPTIONS.NONE ? PDF_STATUS.PENDING : PDF_STATUS.NONE;
    status !== pdfStatus && setStatus(pdfStatus);
  }, [
    props.pdfSettings.viewMode,
    props.pdfSettings.disableDownload,
    props.pdfSettings.disablePrint,
  ]);

  useEffect(() => {
    if (!window.document.getElementById('ricos-adobe-pdf-view-sdk')) {
      setAdobeSDKScript(window);
    } else if (status === PDF_STATUS.PENDING) {
      const SDKClient = new PDFViewSDKClient(window);
      SDKClient.ready()
        .then(() => {
          const viewerConfig = {
            embedMode: PDF_OPTIONS_TO_EMBED_PROPERTIES[viewMode],
            showDownloadPDF: !disableDownload,
            showPrintPDF: !disablePrint,
          };
          const properties = { clientId, divId, locale: RICOS_LOCALE_TO_ADOBE[locale] };
          SDKClient.previewFileWithURL(properties, fileData, viewerConfig)
            .then(() => {
              SDKClient.registerEventsHandler(eventsHandler);
            })
            .catch(handleError);
        })
        .catch(handleError);
    }
  });

  const style = classnames(styles.pdf_viewer, { [styles.not_ready]: status !== PDF_STATUS.READY });

  return <div id={divId} className={style} />;
}
