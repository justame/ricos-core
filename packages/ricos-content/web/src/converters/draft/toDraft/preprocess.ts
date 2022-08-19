import { flow, pipe } from 'fp-ts/function';
import * as E from 'fp-ts/Either';
import * as J from 'fp-ts/Json';
import { stringifyWithReplace } from '../../../fp-utils';
import type { RichContent } from 'ricos-schema';
import { Node_Type } from 'ricos-schema';

/* eslint-disable @typescript-eslint/no-explicit-any */
const keyToId = (v: any) => (v?.key !== undefined ? { id: v.key, ...v } : v);

const bulletToBulleted = (v: any) => (v === 'BULLET_LIST' ? Node_Type.BULLETED_LIST : v);

const appEmbedIdToItemId = (v: any) => (v?.id && v?.imageSrc ? { ...v, itemId: v.id } : v);

const replacer = (_: string, v: any) => pipe(v, keyToId, bulletToBulleted, appEmbedIdToItemId);

export default flow(
  stringifyWithReplace(replacer),
  E.chain(J.parse),
  E.fold(
    () => ({} as RichContent),
    res => res as unknown as RichContent
  )
);
