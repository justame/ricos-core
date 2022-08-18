import { toHtml } from '../../converters/html/toHtml/toHtml';
import { fieldsToTranslatables } from './fieldsToTranslatables';
import { extract } from '../../RicosContentAPI/extract';
import type { RichContent, Node } from '@justame-ricos/ricos-schema';
import { Node_Type } from '@justame-ricos/ricos-schema';
import type {
  TextualTranslatable,
  NonTextualNode,
  Translatable,
  TextualNode,
  NonTextualTranslatable,
  DataFieldNamesWithContainerData,
} from '../types';
import { getDataField, isType } from '../utils';
import {
  toAppEmbedTranslatable,
  toButtonTranslatable,
  toGalleryTranslatable,
  toHtmlTranslatable,
  toImageTranslatable,
  toLinkPreviewTranslatable,
  toPollTranslatable,
  toVideoTranslatable,
} from './pluginsToTranslatables';
import { firstRight } from '../../fp-utils';

export const toTranslatables = ({ nodes }: RichContent) => [
  ...nodeDataTranslatables(nodes),
  ...nodeContainerDataTranslatables(nodes),
];

const nodeDataTranslatables = (nodes: Node[]): Translatable[] =>
  extract(nodes)
    .map(node =>
      firstRight(node, [] as Translatable[], [
        [isType(Node_Type.HEADING), getTextualContent],
        [isType(Node_Type.PARAGRAPH), getTextualContent],
        [isType(Node_Type.APP_EMBED), toAppEmbedTranslatable],
        [isType(Node_Type.BUTTON), toButtonTranslatable],
        [isType(Node_Type.GALLERY), toGalleryTranslatable],
        [isType(Node_Type.HTML), toHtmlTranslatable],
        [isType(Node_Type.IMAGE), toImageTranslatable],
        [isType(Node_Type.LINK_PREVIEW), toLinkPreviewTranslatable],
        [isType(Node_Type.POLL), toPollTranslatable],
        [isType(Node_Type.VIDEO), toVideoTranslatable],
      ])
    )
    .get()
    .flat();

const nodeContainerDataTranslatables = (nodes: Node[]): NonTextualTranslatable[] =>
  extract(nodes)
    .filter(node => !!node[getDataField(node)]?.containerData)
    .map((node: NonTextualNode) => {
      const pluginData = getDataField(node) as DataFieldNamesWithContainerData;
      return [
        ...fieldsToTranslatables(node, [pluginData, 'containerData', 'spoiler', 'buttonText']),
        ...fieldsToTranslatables(node, [pluginData, 'containerData', 'spoiler', 'description']),
      ];
    })
    .get()
    .flat();

const getTextualContent = (node: TextualNode): TextualTranslatable[] => {
  const { id, type } = node;
  const textNodes = extract(node)
    .filter(({ nodes }) => nodes.length > 0)
    .get();
  if (textNodes.length === 0) {
    return [];
  }
  return [
    {
      id,
      type,
      text: toHtml({
        nodes: textNodes,
      }),
    },
  ];
};
