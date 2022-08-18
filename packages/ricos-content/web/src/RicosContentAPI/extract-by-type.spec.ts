/* eslint-disable max-len */
import { getMedia, getPluginData, getText } from './extract-by-type';
import { RichContent, Node_Type } from '@justame-ricos/ricos-schema';
import adapterExtractMock from '../../__tests__/adapterExtractMock.json';

const content = RichContent.fromJSON(adapterExtractMock);

describe('Extract by Types', () => {
  it('should run getText', () => {
    expect(getText(content)).toStrictEqual([
      'This is heading 1',
      'This is heading 3',
      'This is a paragraph.',
      'This one is also a paragraph.',
    ]);
  });
  it('should run getPluginData', () => {
    expect(getPluginData(content, Node_Type.GIF)).toStrictEqual([
      {
        containerData: {
          alignment: 'CENTER',
          height: undefined,
          spoiler: undefined,
          textWrap: true,
          width: { custom: undefined, size: 'CONTENT' },
        },
        downsized: {
          gif: 'https://media0.giphy.com/media/QybFXLVvG7PnQm6uPl/giphy-downsized.gif?cid=558f2fbe6w20o2v7ghy27q2iavxoeb2dgq0vkvgsn0hkxi3x&rid=giphy-downsized.gif&ct=g',
          mp4: 'https://media0.giphy.com/media/QybFXLVvG7PnQm6uPl/giphy-downsized-small.mp4?cid=558f2fbe6w20o2v7ghy27q2iavxoeb2dgq0vkvgsn0hkxi3x&rid=giphy-downsized-small.mp4&ct=g',
          still:
            'https://media0.giphy.com/media/QybFXLVvG7PnQm6uPl/giphy-downsized_s.gif?cid=558f2fbe6w20o2v7ghy27q2iavxoeb2dgq0vkvgsn0hkxi3x&rid=giphy-downsized_s.gif&ct=g',
        },
        height: 268,
        original: {
          gif: 'https://media0.giphy.com/media/QybFXLVvG7PnQm6uPl/giphy.gif?cid=558f2fbe6w20o2v7ghy27q2iavxoeb2dgq0vkvgsn0hkxi3x&rid=giphy.gif&ct=g',
          mp4: 'https://media0.giphy.com/media/QybFXLVvG7PnQm6uPl/giphy.mp4?cid=558f2fbe6w20o2v7ghy27q2iavxoeb2dgq0vkvgsn0hkxi3x&rid=giphy.mp4&ct=g',
          still:
            'https://media0.giphy.com/media/QybFXLVvG7PnQm6uPl/giphy_s.gif?cid=558f2fbe6w20o2v7ghy27q2iavxoeb2dgq0vkvgsn0hkxi3x&rid=giphy_s.gif&ct=g',
        },
        width: 480,
      },
    ]);
  });
  it('should run getMedia on all plugins', () => {
    expect(getMedia(content)).toStrictEqual([
      {
        duration: undefined,
        src: {
          url: undefined,
          custom: undefined,
          id: '8bb438_ff1da0eb6547419fbac324f3a7e6a16c.jpg',
          private: undefined,
        },
        width: 3718,
        height: 5577,
      },
      {
        duration: undefined,
        src: {
          url: undefined,
          custom: undefined,
          id: '8bb438_8583414cdf6544a191e2b8f678ce7b63.jpg',
          private: undefined,
        },
        width: 5600,
        height: 3727,
      },
      {
        duration: 666,
        src: {
          url: undefined,
          custom: undefined,
          id: 'video/11062b_a552731f40854d16a91627687fb8d1a6/1080p/mp4/file.mp4',
          private: undefined,
        },
        width: undefined,
        height: undefined,
      },
      {
        duration: 666,
        src: {
          url: 'https://www.youtube.com/watch?v=iecNmOXDOHM',
          custom: undefined,
          id: undefined,
          private: undefined,
        },
        width: undefined,
        height: undefined,
      },
      {
        duration: 666,
        src: {
          url: undefined,
          custom: undefined,
          id: 'video/11062b_a552731f40854d16a91627687fb8d1a6/1080p/mp4/file.mp4',
          private: undefined,
        },
        width: undefined,
        height: undefined,
      },
      {
        duration: undefined,
        src: {
          url: '8bb438_2ecb6a1a9d5b4e148bd83a1ea3920860.jpg',
          custom: undefined,
          id: undefined,
          private: undefined,
        },
        width: 5600,
        height: 3737,
      },
      {
        duration: undefined,
        src: {
          url: '8bb438_131e9bbd900c42a29ed2db01d18256e5.jpg',
          custom: undefined,
          id: undefined,
          private: undefined,
        },
        width: 1621,
        height: 1081,
      },
      {
        duration: undefined,
        src: {
          url: '8bb438_a132b18dea524d48a68a37f0075fcc1e.jpg',
          custom: undefined,
          id: undefined,
          private: undefined,
        },
        width: 5600,
        height: 3727,
      },
    ]);
  });
});
