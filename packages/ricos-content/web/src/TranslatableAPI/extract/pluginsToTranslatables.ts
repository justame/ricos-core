import { fieldsToTranslatables } from './fieldsToTranslatables';
import type { NonTextualTranslatable, NonTextualNode } from '../types';

type PluginToTranslatables = (node: NonTextualNode) => NonTextualTranslatable[];

export const toButtonTranslatable: PluginToTranslatables = node =>
  fieldsToTranslatables(node, ['buttonData', 'text']);

export const toHtmlTranslatable: PluginToTranslatables = node =>
  fieldsToTranslatables(node, ['htmlData', 'html']);

export const toImageTranslatable: PluginToTranslatables = node => [
  ...fieldsToTranslatables(node, ['imageData', 'altText']),
  ...fieldsToTranslatables(node, ['imageData', 'caption']),
];

export const toLinkPreviewTranslatable: PluginToTranslatables = node => [
  ...fieldsToTranslatables(node, ['linkPreviewData', 'title']),
  ...fieldsToTranslatables(node, ['linkPreviewData', 'description']),
];

export const toVideoTranslatable: PluginToTranslatables = node =>
  fieldsToTranslatables(node, ['videoData', 'title']);

export const toAppEmbedTranslatable: PluginToTranslatables = node => [
  ...fieldsToTranslatables(node, ['appEmbedData', 'name']),
  ...fieldsToTranslatables(node, ['appEmbedData', 'eventData', 'scheduling']),
  ...fieldsToTranslatables(node, ['appEmbedData', 'eventData', 'location']),
];

export const toPollTranslatable: PluginToTranslatables = node => {
  const { pollData } = node;
  const options = pollData?.poll?.options || [];
  const titles = options.map((_, idx) =>
    fieldsToTranslatables(node, ['pollData', 'poll', 'options', idx, 'title'])
  );
  return [fieldsToTranslatables(node, ['pollData', 'poll', 'title']), ...titles].flat();
};

export const toGalleryTranslatable: PluginToTranslatables = node => {
  const { galleryData } = node;
  const items = galleryData?.items || [];
  return items
    .map((_, idx) => [
      ...fieldsToTranslatables(node, ['galleryData', 'items', idx, 'title']),
      ...fieldsToTranslatables(node, ['galleryData', 'items', idx, 'altText']),
    ])
    .flat();
};
