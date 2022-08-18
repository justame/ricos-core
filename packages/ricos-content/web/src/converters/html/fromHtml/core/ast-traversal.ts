import { flow, pipe } from 'fp-ts/function';
import * as A from 'fp-ts/Array';

import type { DocumentFragment } from 'parse5';
import type { AstRule } from './parse5-utils';
import { getChildNodes, toDocumentFragment } from './parse5-utils';
import type { ContentNode } from './models';

const appyRootRule =
  (rule: AstRule) =>
  (node: DocumentFragment): ContentNode => {
    const [_if, then] = rule;
    return _if(node as ContentNode) ? then(node as ContentNode) : (node as ContentNode);
  };

const appyRule =
  (rule: AstRule) =>
  (node: ContentNode): ContentNode => {
    const [_if, then] = rule;
    const processed = _if(node) ? then(node) : node;
    return {
      ...processed,
      childNodes: visit(rule)(processed),
    };
  };

const visit = (rule: AstRule) => (element: ContentNode | DocumentFragment) =>
  pipe(element, getChildNodes, A.map(appyRule(rule)));

export const traverse = (rule: AstRule) => flow(visit(rule), toDocumentFragment);

export const traverseRoot = (rule: AstRule) => (root: DocumentFragment) =>
  pipe(root, appyRootRule(rule));
