import * as E from 'fp-ts/Either';
import { flow, identity, pipe } from 'fp-ts/function';
import { not } from 'fp-ts/Predicate';
import * as S from 'fp-ts/string';
import type { Element } from 'parse5';
import type { Link } from '@justame-ricos/ricos-schema';
import { Decoration_Type } from '@justame-ricos/ricos-schema';
import { and, getMatches } from '../../../../fp-utils';
import { createLink } from '../../../nodeUtils';
import type { Rule } from '../core/models';
import { getAttributes, hasParent, isRoot } from '../core/parse5-utils';
import { aToLink } from '../core/rules';

const parseNavigationData = flow(
  S.replace(/~#~/g, '"'),
  d =>
    E.tryCatch(
      () => JSON.parse(d),
      () => ({ type: 'pageLink', id: d })
    ),
  E.fold(identity, identity)
);

const toCustomData = flow(
  getMatches(/Wix\.(.+)\('(.+)'\)/),
  E.fromOption(() => 'failed to parse custom link onclick'),
  E.map(([, , data]: string[]) => parseNavigationData(data)),
  E.map(JSON.stringify),
  E.fold(identity, identity)
);

const getData = (onclick?: string): Record<string, string> =>
  onclick?.startsWith('Wix.') ? { customData: toCustomData(onclick) } : {};

const mergeData =
  (onclick?: string) =>
  (link: Link): Link => ({ ...link, ...getData(onclick) });

const createCustomLink = ({ url, onclick, ...rest }: Record<string, string>): Link =>
  pipe({ url, ...rest }, createLink, mergeData(onclick));

export const aToCustomLink: Rule = [
  and([aToLink[0], not(hasParent(isRoot))]),
  context => (node: Element) => {
    const attrs = getAttributes(node);
    return context.addDecoration(
      Decoration_Type.LINK,
      { linkData: { link: createCustomLink({ ...attrs, url: attrs.href }) } },
      node
    );
  },
];
