import { pickBy } from 'lodash';
import { DEFAULTS } from '../src/defaults';
import type { LinkPreviewPluginEditorConfig } from '../src/types';
import { LINK_PREVIEW_TYPE } from '../src/types';
import type { ContentBlock } from 'wix-rich-content-editor-common';
import {
  getBlockAtStartOfSelection,
  replaceWithEmptyBlock,
  insertLinkInPosition,
  createBlock,
  deleteBlockText,
  SelectionState,
  EditorState,
  Modifier,
} from 'wix-rich-content-editor-common';
import type { CreatePluginConfig } from 'wix-rich-content-common';
import type { LinkPreviewData } from 'ricos-schema';
import type { LinkPreviewProviders } from '../src/consts';

const addLinkPreview = async (
  editorState: EditorState,
  config: CreatePluginConfig<LinkPreviewPluginEditorConfig>,
  blockKey: string,
  linkData: {
    url: string;
    target?: string;
    rel?: string;
  }
) => {
  const {
    enableEmbed = true,
    enableLinkPreview = true,
    fetchData,
  } = config[LINK_PREVIEW_TYPE] || {};
  const linkPreview = (await fetchLinkPreview(fetchData, linkData.url)) || {};
  //@ts-ignore
  const { title, html, fixedUrl } = linkPreview;
  if (
    shouldAddEmbed(html, enableEmbed, fixedUrl) ||
    shouldAddLinkPreview(title, enableLinkPreview)
  ) {
    const linkPreviewData = await createLinkPreviewData(
      linkData,
    //@ts-ignore
      linkPreview,
      config[LINK_PREVIEW_TYPE]
    );
    addLinkPreviewBlock(editorState, config, blockKey, linkPreviewData);
  }
};

export const fetchLinkPreview = async (
  fetchData: LinkPreviewPluginEditorConfig['fetchData'],
  url: string
): Promise<LinkPreviewData & { fixedUrl: string }> => {
  const fixedUrl = url.split('\u21b5').join(''); //remove {enter} char
  const { thumbnail_url, title, description, html } = (await fetchData?.(fixedUrl)) || {};
  return { thumbnailUrl: thumbnail_url, title, description, html, fixedUrl };
};

export const createLinkPreviewData = async (
  linkData: {
    url: string;
    target?: string;
    rel?: string;
  },
  { thumbnailUrl, title, description, html, fixedUrl }: LinkPreviewData & { fixedUrl: string },
  linkPreviewConfig?: LinkPreviewPluginEditorConfig
) => {
  const currentConfig = { ...DEFAULTS, ...linkPreviewConfig }.config;
  const data = {
    config: {
      ...currentConfig,
      link: { ...currentConfig.link, ...pickBy(linkData), url: fixedUrl },
      width: html && 350,
    },
    thumbnail_url: thumbnailUrl,
    title,
    description,
    html,
  };
  if (thumbnailUrl && (await isValidImgSrc(thumbnailUrl))) {
    data.thumbnail_url = thumbnailUrl;
  }
  return data;
};

const addLinkPreviewBlock = async (
  editorState: EditorState,
  config: CreatePluginConfig,
  blockKey: string,
  linkPreviewData
) => {
  const { setEditorState } = config;
  const withoutLinkBlock = deleteBlockText(editorState, blockKey);
  const { newEditorState } = createBlock(withoutLinkBlock, linkPreviewData, LINK_PREVIEW_TYPE);
  setEditorState(newEditorState);
};

const isValidImgSrc = (url: string): Promise<boolean> => {
  return new Promise<boolean>(resolve => {
    const image = document.createElement('img');
    image.src = url;
    image.onload = () => {
      resolve(true);
    };
    image.onerror = () => {
      resolve(false);
    };
  });
};

export const shouldAddLinkPreview = (title?: string, enableLinkPreview?: boolean) =>
  enableLinkPreview && title;

export const shouldAddEmbed = (
  html: string | undefined,
  enableEmbed: boolean | LinkPreviewProviders[],
  url: string
) => {
  if (Array.isArray(enableEmbed)) {
    return (
      enableEmbed.filter(whiteListType => url.toLowerCase().includes(whiteListType.toLowerCase()))
        .length > 0
    );
  }
  return html && enableEmbed;
};

export const convertLinkPreviewToLink = (editorState: EditorState) => {
  // preserve url
  let currentBlock = getBlockAtStartOfSelection(editorState);
  const blockKey = currentBlock.getKey();
  const url = getLinkPreviewUrl(editorState, currentBlock);

  // replace preview block with text block containing url
  let newState = replaceWithEmptyBlock(editorState, currentBlock.getKey());
  const contentState = Modifier.insertText(
    newState.getCurrentContent(),
    newState.getSelection(),
    url
  );
  // reread block after insertText
  currentBlock = contentState.getBlockForKey(currentBlock.getKey());
  const nextBlock = contentState.getBlockAfter(currentBlock.getKey()) as ContentBlock;
  newState = EditorState.push(newState, contentState, 'change-block-type');

  const editorStateWithLink = changePlainTextUrlToLinkUrl(newState, blockKey, url);
  const newLineSelection = new SelectionState({
    anchorKey: nextBlock.getKey(),
    anchorOffset: 0,
    focusKey: nextBlock.getKey(),
    focusOffset: 0,
  });

  return EditorState.forceSelection(editorStateWithLink, newLineSelection);
};

const getLinkPreviewUrl = (editorState, block) => {
  const entityKey = block.getEntityAt(0);
  const entityData = editorState.getCurrentContent().getEntity(entityKey)?.getData();
  return entityData?.config?.link?.url;
};

const changePlainTextUrlToLinkUrl = (editorState, blockKey, url) => {
  return insertLinkInPosition(
    EditorState.push(editorState, editorState.getCurrentContent(), 'change-block-type'),
    blockKey,
    0,
    url.length,
    {
      url,
    }
  );
};

export { LINK_PREVIEW_TYPE, addLinkPreview };
