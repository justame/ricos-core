import { IMAGE_TYPE, compare } from 'ricos-content';
import { draftBlockDataToTiptap } from './index';

describe('from Draft block', () => {
  it('should image block data', () => {
    const imageData = {
      config: {
        alignment: 'center',
        size: 'fullWidth',
        textWrap: 'wrap',
        link: {
          url: 'www.image-link.com',
          target: '_blank',
          rel: 'noopener',
        },
        spoiler: {
          enabled: true,
          buttonContent: 'Whats behind door number 1?',
          description: 'SPOILER ALERT!!!',
        },
      },
      src: {
        id: 'a78c2fa4a7c95115ca0c6674d07ec937',
        original_file_name: '8bb438_67a68c0652d740bab508f68662acc882.jpg',
        file_name: '8bb438_67a68c0652d740bab508f68662acc882.jpg',
        width: 3192,
        height: 2124,
      },
      metadata: {
        caption: 'Dad holding his baby',
      },
    };
    const actual = draftBlockDataToTiptap(IMAGE_TYPE, imageData);
    const expected = {
      containerData: {
        width: {
          size: 'FULL_WIDTH',
        },
        alignment: 'CENTER',
        spoiler: {
          enabled: true,
          description: 'SPOILER ALERT!!!',
          buttonText: 'Whats behind door number 1?',
        },
        textWrap: true,
      },
      image: {
        src: {
          id: '8bb438_67a68c0652d740bab508f68662acc882.jpg',
        },
        width: 3192,
        height: 2124,
      },
      link: {
        url: 'www.image-link.com',
        target: 'BLANK',
      },
      caption: 'Dad holding his baby',
      id: '2',
    };
    expect(compare(actual, expected, { ignoredKeys: ['id'] })).toEqual({});
  });
});
