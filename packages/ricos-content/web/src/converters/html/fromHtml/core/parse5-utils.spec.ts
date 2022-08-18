import { toAst, hasStyleRule, hasStyleFor } from './parse5-utils';
import type { Element } from 'parse5';

describe('parse5 utils', () => {
  it('should determine whether element has a style', () => {
    const ast = toAst('<span style="line-height: 1.5em">test</test>');
    const hasLineHeight = hasStyleFor('line-height')(ast.childNodes[0] as Element);
    expect(hasLineHeight).toBeTruthy();
  });

  it('should determine whether element has certain style rule', () => {
    const ast = toAst('<span style="font-weight: bold; font-style: italic">test</test>');
    const hasItalic = hasStyleRule({ 'font-style': 'italic' })(ast.childNodes[0] as Element);
    expect(hasItalic).toBeTruthy();
  });
});
