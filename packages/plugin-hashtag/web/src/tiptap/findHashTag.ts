import { Decoration, DecorationSet } from 'prosemirror-view';
import type { Node } from 'prosemirror-model';
import styles from '../../statics/hashtag.scss';

const hasLink = node => {
  return node.marks.map(mark => mark.type.name).includes('link');
};

export default function (doc: Node): DecorationSet {
  const decorations: Decoration[] = [];
  const hashtagRegex = /(\s|^)#\w(\S)+/gm;
  doc.descendants((node, position) => {
    if (!node.text) {
      return;
    }

    Array.from(node.text.matchAll(hashtagRegex)).forEach(match => {
      const hash = match[0];

      //TODO: find a solution for extension knowing another extension logic
      // if node has link hashtag should not be applied
      let hashLength = hash.length;
      let index = match.index || 0;
      if (hash.startsWith(' ')) {
        index++;
        hashLength--;
      }

      const from = position + index;
      const to = from + hashLength;

      if (hasLink(node)) {
        return false;
      }

      const decoration = Decoration.inline(
        from,
        to,
        {
          class: styles.hashtag,
        },
        { name: 'hashtag' }
      );

      decorations.push(decoration);
    });
  });
  return DecorationSet.create(doc, decorations);
}
