import { parseDocStyle } from './parse-doc-style';

describe('parseDocStyle', () => {
  it('should parse document style', () => {
    const documentStyle = {
      headerOne: {
        color: '#bf695c',
        'font-weight': 'bold',
      },
    };
    const expected = {
      headerOne: {
        decorations: [
          {
            colorData: {
              foreground: '#bf695c',
            },
            type: 'COLOR',
          },
          {
            fontWeightValue: 700,
            type: 'BOLD',
          },
        ],
      },
    };

    expect(parseDocStyle(documentStyle)).toEqual(expected);
  });
});
