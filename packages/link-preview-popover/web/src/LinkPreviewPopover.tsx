/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import styles from '../statics/styles/link-preview-popover.rtlignore.scss';
import addLinkPreviewPopoverListener from './LinkPreviewPopoverListener';
import LinkPreviewPopoverViewer from './LinkPreviewPopoverViewer';
import type { LinkPreviewData } from 'wix-rich-content-common';

export type LinkNodePreviewData = {
  position: { top: number; left: number };
  data: LinkPreviewData;
};

export class LinkPreviewPopover extends React.Component<
  {
    container: HTMLElement;
    fetchUrlPreviewData: (url: string) => Promise<LinkPreviewData>;
  },
  { linkPreviewData?: LinkNodePreviewData }
> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  removeLinkPreviewPopoverListener!: () => void | null;

  componentDidMount() {
    this.addLinkPreviewPopoverListener(this.props.container);
  }

  componentWillUnmount() {
    this.removeLinkPreviewPopoverListener();
  }

  onPreview = (url: string, position?: { top: number; left: number }) => {
    if (!position) {
      return this.setState({ linkPreviewData: undefined });
    }
    this.props
      .fetchUrlPreviewData(url)
      .then(data => this.setState({ linkPreviewData: { position, data } }));
  };

  addLinkPreviewPopoverListener = container => {
    if (container && !this.removeLinkPreviewPopoverListener) {
      this.removeLinkPreviewPopoverListener = addLinkPreviewPopoverListener(
        container,
        this.onPreview
      );
    }
  };

  render() {
    const { linkPreviewData } = this.state;

    return linkPreviewData ? (
      <div className={styles.container} style={linkPreviewData.position}>
        <LinkPreviewPopoverViewer {...linkPreviewData.data} />
      </div>
    ) : null;
  }
}
