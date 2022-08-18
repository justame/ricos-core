import migrationContent from '../../statics/json/migratedFixtures/migration-content.json';
import rawContent from '../../tests/modifyFixtures/images-dividers.json';
import { select } from './select';
import type { Node } from '@justame-ricos/ricos-schema';
import {
  Node_Type,
  PluginContainerData_Alignment,
  PluginContainerData_Width_Type,
  Decoration_Type,
  FontSizeData_fontType,
  RichContent,
} from '@justame-ricos/ricos-schema';
import type { TextNode, VideoNode } from '../types/node-refined-types';
import { extract } from '../RicosContentAPI/extract';

const videoUrl = 'https://www.youtube.com/watch?v=CoJ23XNHgG0';

const videoMock: VideoNode = {
  id: '4',
  nodes: [],
  type: Node_Type.VIDEO,
  videoData: {
    containerData: {
      alignment: PluginContainerData_Alignment.CENTER,
      textWrap: true,
      width: { size: PluginContainerData_Width_Type.CONTENT },
    },
    thumbnail: {
      height: 270,
      src: { url: 'https://i.ytimg.com/vi/BBu5codsO6Y/hqdefault.jpg' },
      width: 480,
    },
    title: 'iJustine | Create a Website with Wix Artificial Design Intelligence',
    video: { src: { url: videoUrl }, duration: 14 },
  },
};

const videoMock_BiggerWidth: VideoNode = {
  id: '6',
  nodes: [],
  type: Node_Type.VIDEO,
  videoData: {
    containerData: {
      alignment: PluginContainerData_Alignment.CENTER,
      textWrap: true,
      width: { size: PluginContainerData_Width_Type.SMALL },
    },
    disableDownload: false,
    thumbnail: {
      height: 1080,
      src: { id: 'media/d3dd72_9397c7bfa03f4fa8920b16bdd667f73bf000.jpg' },
      width: 1920,
    },
    video: {
      src: { id: 'video/d3dd72_9397c7bfa03f4fa8920b16bdd667f73b/1080p/mp4/file.mp4' },
      duration: 666,
    },
  },
};

const textNodeMock: TextNode = {
  id: '',
  nodes: [],
  textData: {
    decorations: [
      {
        fontWeightValue: 700,
        type: Decoration_Type.BOLD,
      },
      {
        fontSizeData: {
          unit: FontSizeData_fontType.PX,
          value: 20,
        },
        type: Decoration_Type.FONT_SIZE,
      },
    ],
    text: 'Lorem ipsum dolor sit amet',
  },
  type: Node_Type.TEXT,
};

describe('query', () => {
  const content = migrationContent as unknown as RichContent;

  it('should return all results if no filtering was done', () => {
    const result = select({ nodes: [videoMock] }).find();
    expect(result[0].nodes).toStrictEqual<Node[]>([videoMock]);
  });

  it('should do eq', () => {
    const result = select(content).eq('videoData.video.src.url', videoUrl).find();
    expect(result).toStrictEqual<VideoNode[]>([videoMock]);
  });

  it('should do gt', () => {
    const result = select(content).gt('videoData.thumbnail.width', 490).find();
    expect(result).toStrictEqual<VideoNode[]>([videoMock_BiggerWidth]);
  });

  it('should do lt', () => {
    const result = select(content).lt('videoData.thumbnail.width', 490).find();
    expect(result).toStrictEqual<VideoNode[]>([videoMock]);
  });

  it('should do isEmpty - should keep relevant fields', () => {
    const result = select(content)
      .eq('videoData.video.src.url', videoUrl)
      .isEmpty('some.dummy.field.that.should.not.exist')
      .find();
    expect(result).toStrictEqual<Node[]>([videoMock]);
  });

  it('should do isEmpty - should filter for existing fields', () => {
    const result = select(content)
      .eq('videoData.video.src.url', videoUrl)
      .isEmpty('videoData.video.src.url')
      .find();
    expect(result).toStrictEqual<Node[]>([]);
  });

  it('should do isNotEmpty - should remove inexistent fields', () => {
    const result = select(content)
      .eq('videoData.video.src.url', videoUrl)
      .isNotEmpty('some.dummy.field.that.should.not.exist')
      .find();
    expect(result).toStrictEqual<Node[]>([]);
  });

  it('should do isNotEmpty - should keep existing fields', () => {
    const result = select(content)
      .eq('videoData.video.src.url', videoUrl)
      .isNotEmpty('videoData.video.src.url')
      .find();
    expect(result).toStrictEqual<Node[]>([videoMock]);
  });

  it('should do startsWith', () => {
    const result = select(content).startsWith('textData.text', 'Lorem ipsum dolor').find();
    expect(result).toStrictEqual<TextNode[]>([textNodeMock]);
  });

  it('should do endsWith', () => {
    const result = select(content).endsWith('textData.text', 'sit amet').find();
    expect(result).toStrictEqual<TextNode[]>([textNodeMock]);
  });

  it('should do limit', () => {
    const result = select(content).limit(2).find();
    expect(result.length).toStrictEqual<number>(2);
  });

  it('should do count', () => {
    const result = select(content).count();
    expect(result).toStrictEqual<number>(188);
  });

  it('should do count + limit', () => {
    const result = select(content).limit(2).count();
    expect(result).toStrictEqual<number>(2);
  });
});

describe('modify', () => {
  it('should trigger callback', () => {
    const content = RichContent.fromJSON(rawContent);
    const callback = jest.fn();
    const _ = select(content, callback)
      .eq('type', Node_Type.DIVIDER)
      .modify(n => [n, n]);

    expect(callback).toBeCalledTimes(1);
  });
  it('velo modifier should work (basic test)', () => {
    const content = RichContent.fromJSON(rawContent);
    const callback = jest.fn();

    // multiply dividers
    const result = select(content, callback)
      .eq('type', Node_Type.DIVIDER)
      .modify(n => [n, n]);

    const extractDividers = (content: RichContent) =>
      extract(content.nodes)
        .filter(node => node.type === Node_Type.DIVIDER)
        .get();

    // check total amount of dividers has been doubled
    const originalDividersCount = extractDividers(content).length;
    const newDividersCount = extractDividers(result).length;
    expect(originalDividersCount * 2).toBe(newDividersCount);
  });
});
