import React from 'react';
import styles from '../statics/styles/link-preview-popover.rtlignore.scss';
import type { LinkPreviewData } from 'wix-rich-content-common';

export type LinkPreviewPopoverViewerProps = LinkPreviewData;

export default class LinkPreviewPopoverViewer extends React.Component<LinkPreviewPopoverViewerProps> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { title, description, provider_url, thumbnail_url } = this.props;

    return (
      <div className={styles.viewerContainer}>
        {thumbnail_url ? (
          <div className={styles.ImageWrapper}>
            <img className={styles.Image} src={thumbnail_url} alt="" />
          </div>
        ) : null}
        <div className={styles.texts}>
          <div className={styles.url}>{provider_url}</div>
          <div className={styles.title}>{title}</div>
          <div className={styles.description}>{description}</div>
        </div>
      </div>
    );
  }
}
