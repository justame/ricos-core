import Hashtag from './HashtagComponent';
import hashtagRegexes from './hashtagRegexes';

export default (
  getLinkRangesInBlock: (block, contentState) => [number, number][],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  immutableList?: any
) =>
  class HashtagDecorator {
    componentProps;

    constructor(componentProps) {
      this.componentProps = componentProps;
    }

    isOverlapping = (range, start, end) => {
      return (start <= range[0] && end >= range[0]) || (range[0] <= start && range[1] >= start);
    };

    // avoid hashtag in code-snippet selectors
    isInsideQuotes = (before, after) =>
      // eslint-disable-next-line quotes
      (before === "'" || before === '"') && before === after;

    getDecorations(block, contentState) {
      const key = block.getKey();
      const text = block.getText();
      const type = block.getType();
      const decorations = Array(text.length).fill(null);

      if (type !== 'code-block' && text && text.match(hashtagRegexes.hashSigns)) {
        text.replace(
          hashtagRegexes.validHashtag,
          (match, before, hash, hashText, offset, chunk) => {
            const after = chunk.slice(offset + match.length);
            if (
              after.match(hashtagRegexes.endHashtagMatch) ||
              this.isInsideQuotes(before, after[0])
            ) {
              return;
            }
            const start = offset + before.length;
            const end = start + hashText.length + 1;
            const linkRanges = getLinkRangesInBlock(block, contentState);
            const overlap = linkRanges.some(range => this.isOverlapping(range, start, end));
            if (!overlap) {
              const htagId = `htag-${key}-${start}${end}`;
              // eslint-disable-next-line fp/no-loops
              for (let i = start; i < end; i++) {
                decorations[i] = htagId;
              }
            }
          }
        );
      }
      // In editor returns an Immutable.js List object. In the Viewer return an array.
      return immutableList ? immutableList(decorations) : decorations;
    }

    getComponentForKey() {
      return Hashtag;
    }

    getPropsForKey() {
      return this.componentProps;
    }
  };
