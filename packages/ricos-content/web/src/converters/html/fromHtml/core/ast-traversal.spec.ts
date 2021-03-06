import { identity } from 'fp-ts/function';
import { traverse } from './ast-traversal';
import type { AstRule } from './parse5-utils';
import { toAst } from './parse5-utils';
import { serialize } from 'parse5';

describe('AST traversal', () => {
  it('should reconstruct AST with empty rule', () => {
    const expected = toAst('<p>text</p><ol><li><p>item</p></li></ol>');
    const rule: AstRule = [() => true, identity];
    const actual = traverse(rule)(expected);
    expect(serialize(actual)).toEqual(serialize(expected));
  });
});
