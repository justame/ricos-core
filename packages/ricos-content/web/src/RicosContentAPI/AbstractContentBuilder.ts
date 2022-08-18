import { identity } from 'lodash';
import type {
  AppEmbedData,
  CodeBlockData,
  FileData,
  GalleryData,
  HeadingData,
  ImageData,
  LinkPreviewData,
  ParagraphData,
  VideoData,
  GIFData,
  EmbedData,
} from '@justame-ricos/ricos-schema';
import { Node_Type } from '@justame-ricos/ricos-schema';
import type { ContentBuilder } from '../types';
import type { ListNode, RichTextNode } from '../types/node-refined-types';
import {
  DEFAULT_DIVIDER_DATA,
  DEFAULT_PARAGRAPH_DATA,
  DEFAULT_HTML_DATA,
  DEFAULT_BUTTON_DATA,
  DEFAULT_CODE_DATA,
  DEFAULT_HEADING_DATA,
  DEFAULT_MAP_DATA,
  DEFAULT_POLL_DATA,
} from './node-builder-methods';

export interface RicosBuilder extends ContentBuilder {
  new (): ContentBuilder;
}

type Creator<RT> = (generateId: () => string) => (data: unknown) => RT;

export const setupAbstractContentBuilder = <RT>(
  generateId: () => string,
  textNodeCreator: Creator<RT>,
  listNodeCreator: Creator<RT>,
  nodeCreator: Creator<RT>,
  tableNodeCreator: Creator<RT>,
  collapsibleListNodeCreator: Creator<RT>,
  methodPrefix: (name: string) => string = identity
): { [key: string]: (data: unknown) => RT } => {
  class RicosContentBuilder {}

  const builderApis: { [key: string]: (data: unknown) => RT } = {};

  const addMethod = (name, method) => {
    builderApis[methodPrefix(name)] = RicosContentBuilder.prototype[methodPrefix(name)] = method;
  };

  const TextNodes = [
    {
      name: 'paragraph',
      type: Node_Type.PARAGRAPH,
      dataT: DEFAULT_PARAGRAPH_DATA,
    },
    { name: 'heading', type: Node_Type.HEADING, dataT: DEFAULT_HEADING_DATA },
    { name: 'code', type: Node_Type.CODE_BLOCK, dataT: DEFAULT_CODE_DATA },
  ];

  const ListNodes = [
    { name: 'bulletList', type: Node_Type.BULLETED_LIST },
    { name: 'orderedList', type: Node_Type.ORDERED_LIST },
  ];

  const PluginNodes = [
    { name: 'divider', type: Node_Type.DIVIDER, dataT: DEFAULT_DIVIDER_DATA },
    { name: 'file', type: Node_Type.FILE, dataT: {} as FileData },
    { name: 'gallery', type: Node_Type.GALLERY, dataT: {} as GalleryData },
    { name: 'html', type: Node_Type.HTML, dataT: DEFAULT_HTML_DATA },
    { name: 'image', type: Node_Type.IMAGE, dataT: {} as ImageData },
    { name: 'video', type: Node_Type.VIDEO, dataT: {} as VideoData },
    { name: 'appEmbed', type: Node_Type.APP_EMBED, dataT: {} as AppEmbedData },
    { name: 'embed', type: Node_Type.EMBED, dataT: {} as EmbedData },
    {
      name: 'linkPreview',
      type: Node_Type.LINK_PREVIEW,
      dataT: {} as LinkPreviewData,
    },
    { name: 'button', type: Node_Type.BUTTON, dataT: DEFAULT_BUTTON_DATA },
    { name: 'gif', type: Node_Type.GIF, dataT: {} as GIFData },
    { name: 'map', type: Node_Type.MAP, dataT: DEFAULT_MAP_DATA },
    { name: 'poll', type: Node_Type.POLL, dataT: DEFAULT_POLL_DATA },
  ];

  TextNodes.forEach(
    ({
      name,
      type,
      dataT,
    }: {
      name: string;
      type: RichTextNode['type'];
      dataT: ParagraphData | CodeBlockData | HeadingData;
    }) => {
      addMethod(name, ({ data = dataT, text, ...rest }): RT => {
        return textNodeCreator(generateId)({
          text,
          type,
          data,
          ...rest,
        });
      });
    }
  );

  ListNodes.forEach(({ name, type }: { name: string; type: ListNode['type'] }) => {
    addMethod(name, ({ items, data, ...rest }): RT => {
      return listNodeCreator(generateId)({ items, data, type, ...rest });
    });
  });

  PluginNodes.forEach(({ name, type, dataT }) => {
    addMethod(name, ({ data = dataT, ...rest }): RT => {
      return nodeCreator(generateId)({
        type,
        data,
        ...rest,
      });
    });
  });

  Object.entries({
    table: tableNodeCreator,
    collapsibleList: collapsibleListNodeCreator,
  }).forEach(([name, method]) => addMethod(name, method(generateId)));

  return builderApis;
};
