//@ts-nocheck
import normalizeHTML from '../src/RichContentEditor/utils/pasting/normalizeHTML';
import { wordLongHTML, normalizedWordLongHTML } from './TestData/pasted-data';
describe('Normalize html tests', () => {
  it('should return undefined when html is undefined', () => {
    let html;
    expect(normalizeHTML(html)).toEqual(undefined);
  });

  it('should normalize MS Word html correctly', () => {
    expect(normalizeHTML(wordLongHTML)).toEqual(normalizedWordLongHTML);
  });
});
