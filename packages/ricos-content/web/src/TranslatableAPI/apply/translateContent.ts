import * as O from 'fp-ts/Option';
import * as M from 'fp-ts/Monoid';
import * as A from 'fp-ts/Array';
import * as R from 'fp-ts/Record';
import { pipe, flow, constFalse, constTrue, identity } from 'fp-ts/function';
import { set, cloneDeep, get } from 'lodash';
import type { RichContent, Node } from '@justame-ricos/ricos-schema';

import type { TextualNode, NonTextualNode, NonTextualTranslatable, Translatable } from '../types';
import { isTextualNode, isNonTextualNode } from '../types';
import { modify } from '../../RicosContentAPI/modify';
import { fromRichTextHtml } from '../../converters/html';
import { firstRight } from '../../fp-utils';

type TranslatableMap = Record<string, Translatable[]>;

const toTranslatableById = (node: Translatable): TranslatableMap => ({
  [node.id]: [node],
});

// Monoid admits concatenation operation. R.Monoid represents concatenation of typed records.
// The concatenation of record values is according to A.Semigroup which is equivalent to Array.prototype.concat
const TranslatableMapM = R.getMonoid<string, Translatable[]>(A.getSemigroup());

const fromHtml = (node: TextualNode) => (translatable: Translatable[]) => ({
  ...node,
  nodes: fromRichTextHtml(translatable[0].text).nodes[0].nodes,
});

const translateTextualNode =
  (translations: TranslatableMap) =>
  (node: TextualNode): Node =>
    pipe(
      translations,
      R.lookup(node.id),
      O.map(fromHtml(node)),
      O.fold(() => node, identity)
    );

const setWithTranslations = (node: NonTextualNode) => (translatables: NonTextualTranslatable[]) => {
  const newNode = cloneDeep(node);
  translatables.forEach(
    ({ path, text }) => !!get(newNode, path, false) && set(newNode, path, text)
  );
  return newNode;
};

const translateNonTextualNode =
  (translations: TranslatableMap) =>
  (node: NonTextualNode): Node =>
    pipe(
      translations,
      R.lookup(node.id),
      O.map(setWithTranslations(node)),
      O.fold(() => node, identity)
    );

const toTranslatableMap: (translatables: Translatable[]) => TranslatableMap = flow(
  A.map(toTranslatableById),
  M.concatAll(TranslatableMapM)
);

const translatableNode =
  (translations: TranslatableMap) =>
  (node: Node): boolean =>
    pipe(translations, R.lookup(node.id), O.fold(constFalse, constTrue));

const translatedNode = (translations: TranslatableMap) => (node: Node) =>
  firstRight(node, node, [
    [isTextualNode, translateTextualNode(translations)],
    [isNonTextualNode, translateNonTextualNode(translations)],
  ]);

export const translateContent = (content: RichContent, translatables: Translatable[]) => {
  const translationMap = toTranslatableMap(translatables);
  return modify(content)
    .filter(translatableNode(translationMap))
    .set(translatedNode(translationMap));
};
