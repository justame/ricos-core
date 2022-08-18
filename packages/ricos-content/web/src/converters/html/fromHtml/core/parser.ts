import { flow, pipe } from 'fp-ts/function';
import * as A from 'fp-ts/Array';

import type { Element, DocumentFragment } from 'parse5';
import { toAst, getChildNodes } from './parse5-utils';
import type { Node, Decoration, Decoration_Type } from '@justame-ricos/ricos-schema';
import { RichContent } from '@justame-ricos/ricos-schema';
import type { ContentNode, Context, Rule } from './models';
import { initializeMetadata, createDecoration, reduceDecorations } from '../../../nodeUtils';

const contextOf = (rules: Rule[], decorations: Decoration[]): Context => ({
  visit: visit(rules, decorations),
  decorations: reduceDecorations(decorations),
  addDecoration: addDecoration(rules, decorations),
});

const htmlToNodes =
  (rules: Rule[], decorations: Decoration[]) =>
  (node: ContentNode): Node[] =>
    pipe(
      rules,
      A.filter(([_if]) => {
        try {
          return !!node && _if(node);
        } catch (e) {
          console.error(e, node);
          return false;
        }
      }),
      A.chain(([, then]) => then(contextOf(rules, decorations))(node))
    );

const addDecoration =
  (rules: Rule[], decorations: Decoration[]) =>
  (type: Decoration_Type, data: Omit<Decoration, 'type'> = {}, element: Element) => {
    const decoration = createDecoration(type, data);
    return visit(rules, [decoration, ...decorations])(element);
  };

const visit = (rules: Rule[], decorations: Decoration[]) => (element: Element | DocumentFragment) =>
  pipe(element, getChildNodes, A.chain(htmlToNodes(rules, decorations)));

const traverse = (rules: Rule[]) => visit(rules, []);

const toRichContent = (nodes: Node[]): RichContent => ({ nodes, metadata: initializeMetadata() });

export default (rules: Rule[]) => flow(toAst, traverse(rules), toRichContent, RichContent.fromJSON);
