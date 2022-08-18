import { pipe, flow, constFalse } from 'fp-ts/function';
import * as A from 'fp-ts/Array';
import * as R from 'fp-ts/Record';
import * as O from 'fp-ts/Option';
import * as S from 'fp-ts/string';
import type * as P from 'fp-ts/Predicate';

import { MonoidAny } from 'fp-ts/boolean';
import { concatAll } from 'fp-ts/Monoid';
import * as RONEA from 'fp-ts/ReadonlyNonEmptyArray';

import type {
  ChildNode,
  DocumentFragment,
  Document,
  Node,
  Element,
  TextNode,
  CommentNode,
  Attribute,
} from 'parse5';
import { parseFragment } from 'parse5';
import { equals } from '../../../../fp-utils';
import type { ContentNode } from './models';

export type AstContext = {
  visit: (node: Element | DocumentFragment) => ContentNode;
};
export type AstRule = [(node: ContentNode) => boolean, (node: ContentNode) => ContentNode];
export const isText = (node: Node): node is TextNode => node.nodeName === '#text';
export const isComment = (node: Node): node is CommentNode => node.nodeName === '#comment';

export const isLeaf = (node: Node): boolean =>
  isText(node) || isComment(node) || (node as Element).childNodes.length === 0;

export const isWhitespace = flow(
  (n: TextNode) => O.fromNullable(n.value),
  O.map(S.trim),
  O.fold(() => false, equals(S.Eq)(''))
);

export const hasDescendant =
  (predicate: (child: Node) => boolean) =>
  (node: Node): boolean =>
    predicate(node) ||
    (!isLeaf(node) &&
      pipe((node as Element).childNodes, A.map(hasDescendant(predicate)), concatAll(MonoidAny)));

type AttrRecord = Record<Attribute['name'], Attribute['value']>;

const toRecord = A.reduce({} as AttrRecord, (rec, { name, value }) => ({
  ...rec,
  [name]: value,
}));

export const getAttributes = (el: Element) =>
  pipe(
    el,
    el => (el.attrs ? O.some(el.attrs) : O.none),
    O.fold(() => ({} as AttrRecord), toRecord)
  );

export const hasAttribute = (key: string, valuePredicate: P.Predicate<string>) =>
  flow(getAttributes, R.lookup(key), O.fold(constFalse, valuePredicate));

export const getChildNodes = (element: Element | DocumentFragment): ContentNode[] =>
  isLeaf(element) ? [] : (element.childNodes as ContentNode[]);

export const appendChild = (element: Element, node: ContentNode) => {
  node.parentNode = element;
  element.childNodes.push(node);
};

export const setParent = (parent: ContentNode) => (child: ContentNode) => ({
  ...child,
  parentNode: parent,
});

export const isRoot = (node: Node): node is DocumentFragment =>
  node.nodeName === '#document-fragment';

export const toDocumentFragment = (nodes: ChildNode[]): DocumentFragment => {
  const fragment: DocumentFragment = {
    nodeName: '#document-fragment' as DocumentFragment['nodeName'],
    childNodes: [] as ChildNode[],
  };
  fragment.childNodes = nodes.map(n => ({ ...n, parentNode: fragment }));
  return fragment;
};

export const toName = (node: ContentNode) => node.nodeName;

export const hasParent =
  (predicate: (node: ContentNode | Document | DocumentFragment) => boolean) =>
  (node: ContentNode) =>
    predicate(node.parentNode);

export const hasTag = (tag: string) => flow(toName, equals(S.Eq)(tag));

const toStyle = flow(
  S.split(';'),
  RONEA.map(flow(S.split(':'), RONEA.map(S.trim))),
  RONEA.reduce(
    {} as Record<string, string>,
    (style: Record<string, string>, rule: RONEA.ReadonlyNonEmptyArray<string>) => ({
      ...style,
      [rule[0]]: rule[1],
    })
  )
);

export const getStyle = flow(getAttributes, R.lookup('style'), O.map(toStyle));

export const hasStyleFor = (styleRule: string) =>
  flow(
    getStyle,
    O.fold(
      () => false,
      (s: Record<string, string>) => R.has(styleRule, s)
    )
  );

export const hasStyleRule = (style: Record<string, string>) =>
  flow(
    getStyle,
    O.fold(
      () => false,
      (s: Record<string, string>) => R.isSubrecord(S.Eq)(style, s)
    )
  );

export const getClassNames = flow(
  getAttributes,
  R.lookup('class'),
  O.fold(() => RONEA.of(''), S.split(' '))
);

export const hasClass = (predicate: (className: string) => boolean) =>
  flow(getClassNames, RONEA.map(predicate), concatAll(MonoidAny));

export const hasChild = (predicate: (node: ContentNode) => boolean) =>
  flow(getChildNodes, A.map(predicate), concatAll(MonoidAny));

export const oneOf = (tags: string[]) => (node: ContentNode) =>
  pipe(tags, A.map(equals(S.Eq)(node.nodeName)), concatAll(MonoidAny));

export const toAst = (html: string) => parseFragment(html);
