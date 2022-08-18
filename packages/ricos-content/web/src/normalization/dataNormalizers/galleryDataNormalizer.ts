import { Version } from '../../version';

export default (componentData, normalizerConfig, stateVersion: string) => {
  const shouldNormalizeDisableDownload =
    componentData.disableDownload === undefined && normalizerConfig.disableDownload !== undefined;

  const shouldNormalizeExpand =
    componentData.disableExpand === undefined &&
    normalizerConfig.disableGalleryExpand !== undefined;

  if (shouldNormalizeDisableDownload) {
    componentData.disableDownload = normalizerConfig.disableDownload;
  }

  if (shouldNormalizeExpand) {
    componentData.disableExpand = normalizerConfig.disableGalleryExpand;
  }

  if (Version.lessThan(stateVersion, '6')) {
    const items = componentData.items.map(item => {
      const { metadata } = item;
      const altText = metadata.title;
      if (altText) {
        metadata.altText = altText;
      }
      // eslint-disable-next-line fp/no-delete
      delete metadata.title;
      return item;
    });
    componentData.items = items;
  }
  if (Version.lessThan(stateVersion, '8.49.0')) {
    componentData.styles.thumbnailSpacings && (componentData.styles.thumbnailSpacings *= 2);
  }
  return componentData;
};
