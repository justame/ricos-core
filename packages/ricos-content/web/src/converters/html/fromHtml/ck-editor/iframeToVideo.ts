import { identity, flow } from 'fp-ts/function';
import * as S from 'fp-ts/string';
import * as E from 'fp-ts/Either';
import type { VideoData } from '@justame-ricos/ricos-schema';
import { Node_Type } from '@justame-ricos/ricos-schema';
import type { Element } from 'parse5';
import { createNode } from '../../../nodeUtils';
import { hasTag, getAttributes, hasAttribute } from '../core/parse5-utils';
import type { Rule } from '../core/models';
import { and } from '../../../../fp-utils';

const toURL = (str: string) =>
  E.tryCatch(
    () => new URL(str),
    () => 'invalid URL string'
  );

const getVideoId = (url: URL): E.Either<string, string> =>
  url.host.includes('youtube') && url.pathname.includes('/embed/')
    ? E.right(url.pathname.replace('/embed/', ''))
    : E.left('not a youtube source');

const toYoutubeUrl = flow(
  toURL,
  E.chain(getVideoId),
  E.fold(identity, id => `https://www.youtube.com/watch?v=${id}`)
);

const toVideoData = (urlResolver: (src: string) => string) =>
  flow(getAttributes, ({ src }) => ({ video: { src: { url: urlResolver(src) } } } as VideoData));

export const iframeToYoutubeVideo: Rule = [
  and([hasTag('iframe'), hasAttribute('src', S.includes('youtube'))]),
  () => (node: Element) =>
    [createNode(Node_Type.VIDEO, { nodes: [], data: { ...toVideoData(toYoutubeUrl)(node) } })],
];

const toVimeoSource = (url: URL): string =>
  url.host.includes('vimeo') ? url.toString() : 'unsupported video source';

const toVimeoUrl = flow(toURL, E.fold(identity, toVimeoSource));

export const iframeToVimeoVideo: Rule = [
  and([hasTag('iframe'), hasAttribute('src', S.includes('vimeo'))]),
  () => (node: Element) =>
    [createNode(Node_Type.VIDEO, { nodes: [], data: { ...toVideoData(toVimeoUrl)(node) } })],
];
