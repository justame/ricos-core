import { Decoration_Type, FontSizeData_fontType } from 'ricos-schema';

export const decorations = [
  { type: Decoration_Type.COLOR, colorData: { foreground: '#414141', background: '#808080' } },
  { type: Decoration_Type.BOLD, fontWeightValue: 700 },
  {
    type: Decoration_Type.FONT_SIZE,
    fontSizeData: { unit: FontSizeData_fontType.PX, value: 18 },
  },
  { type: Decoration_Type.ITALIC, italicData: true },
];

export const customStyle = {
  color: '#414141',
  fontWeight: 700,
  fontSize: 18,
  fontStyle: 'italic',
};

export const nodeStyle = {
  paddingBottom: '3px',
  paddingTop: '2px',
};

export const textStyle = { lineHeight: '3' };

export const paragraphNode = {
  type: 'PARAGRAPH',
  id: '98',
  nodes: [
    {
      type: 'TEXT',
      id: '',
      nodes: [],
      textData: {
        text: 'Collapsible List',
        decorations: [
          {
            type: 'COLOR',
            colorData: {
              foreground: 'color4',
            },
          },
        ],
      },
    },
  ],
  style: {
    paddingTop: '2px',
    paddingBottom: '3px',
  },
  paragraphData: {
    textStyle: {
      textAlignment: 'AUTO',
      lineHeight: '2.5',
    },
    indentation: 0,
  },
};

export const headingNode = {
  type: 'HEADING',
  id: '24',
  nodes: [
    {
      type: 'TEXT',
      id: '',
      nodes: [],
      textData: {
        text: 'HEADING 3!!!',
        decorations: [
          {
            type: 'COLOR',
            colorData: {
              foreground: '#818181',
            },
          },
          {
            type: 'BOLD',
            fontWeightValue: 700,
          },
        ],
      },
    },
  ],
  style: {
    paddingTop: '5px',
    paddingBottom: '2px',
  },
  headingData: {
    level: 3,
    textStyle: {
      lineHeight: '3',
    },
    indentation: 0,
  },
};

export const complexHeadingNode = {
  type: 'HEADING',
  id: '1msmt336',
  nodes: [
    {
      type: 'TEXT',
      id: '',
      nodes: [],
      textData: {
        text: 'HEADING 3!!! ',
        decorations: [
          {
            type: 'BOLD',
            fontWeightValue: 700,
          },
          {
            type: 'COLOR',
            colorData: {
              foreground: '#6b1818',
            },
          },
        ],
      },
    },
    {
      type: 'TEXT',
      id: '',
      nodes: [],
      textData: {
        text: 'Different Color',
        decorations: [
          {
            type: 'COLOR',
            colorData: {
              foreground: '#1d38d0',
            },
          },
        ],
      },
    },
  ],
  style: {
    paddingTop: '2px',
    paddingBottom: '3px',
  },
  headingData: {
    level: 1,
    textStyle: {
      textAlignment: 'AUTO',
      lineHeight: '3',
    },
    indentation: 0,
  },
};
