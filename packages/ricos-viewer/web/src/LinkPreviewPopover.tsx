import React from 'react';
import { LinkPreviewPopover } from 'wix-rich-content-link-preview-popover';
import type { LinkPreviewData } from 'wix-rich-content-common';
interface Props {
  container: HTMLElement;
  fetchUrlPreviewData: (url: string) => Promise<LinkPreviewData>;
}

const PreviewPopover: React.FC<Props> = ({ container, fetchUrlPreviewData }) => {
  return <LinkPreviewPopover container={container} fetchUrlPreviewData={fetchUrlPreviewData} />;
};

export default PreviewPopover;
