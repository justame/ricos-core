import { createLink, parseLink } from 'ricos-content/libs/nodeUtils';
import type { Link, Link_Rel } from 'ricos-schema';
import linkDefaults from 'ricos-schema/dist/statics/link.defaults.json';
import { convertRelObjectToString, convertRelStringToObject } from 'wix-rich-content-common';

const defaultLinkRel = {
  nofollow: false,
  sponsored: false,
  ugc: false,
};

export class RicosLink {
  private readonly link: Link;

  private constructor(link: Link) {
    this.link = link;
  }

  toLink() {
    return this.link;
  }

  toHtmlAttributes() {
    const { url = '', rel = '', target = '_self' } = parseLink(this.link);
    return { url, rel, target };
  }

  static getLinkDefaults() {
    return linkDefaults;
  }

  static of(url: string, target = '_self', rel?: string, linkRel: Link_Rel = defaultLinkRel) {
    const relValue = convertRelObjectToString(rel ? convertRelStringToObject(rel) : linkRel);
    const link = createLink({ url, rel: relValue, target });
    return new RicosLink(link);
  }

  static fromLink(link: Link): RicosLink {
    return new RicosLink(link);
  }

  setUrl(url: string): RicosLink {
    const link = createLink({ ...this.toHtmlAttributes(), url });
    return new RicosLink(link);
  }
}
