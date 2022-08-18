import migrationContent from '../../../statics/json/migratedFixtures/migration-content.json';
import translatablesMock from '../../../__tests__/translatablesMock.json';
import { RichContent } from '@justame-ricos/ricos-schema';
import { toTranslatables } from './toTranslatables';
import paragraph from '../../../__tests__/toTranslatables/paragraph.json';
import heading from '../../../__tests__/toTranslatables/heading.json';
import appEmbed from '../../../__tests__/toTranslatables/appEmbed.json';
import button from '../../../__tests__/toTranslatables/button.json';
import html from '../../../__tests__/toTranslatables/html.json';
import image from '../../../__tests__/toTranslatables/image.json';
import linkPreview from '../../../__tests__/toTranslatables/linkPreview.json';
import video from '../../../__tests__/toTranslatables/video.json';
import poll from '../../../__tests__/toTranslatables/poll.json';
import gallery from '../../../__tests__/toTranslatables/gallery.json';

describe('toTranslatables', () => {
  it('should create translatables of migration-content.json', () => {
    const content = RichContent.fromJSON(migrationContent);
    expect(toTranslatables(content)).toStrictEqual(translatablesMock);
  });
  it('should create translatables for paragraph', () => {
    const content = RichContent.fromJSON(paragraph);
    expect(toTranslatables(content)).toStrictEqual([
      {
        id: '0',
        text: '<p>Hello, this is a dummy text with <strong>bold</strong> and <u>underline</u> and <em>italic</em>.</p>',
        type: 'PARAGRAPH',
      },
    ]);
  });
  it('should create translatables for heading', () => {
    const content = RichContent.fromJSON(heading);
    expect(toTranslatables(content)).toStrictEqual([
      {
        id: '0',
        // eslint-disable-next-line max-len
        text: '<h2>Hello, this is a dummy text with <strong>bold</strong> and <u>underline</u> and <em>italic</em>.</h2>',
        type: 'HEADING',
      },
    ]);
  });
  it('should create translatables for button', () => {
    const content = RichContent.fromJSON(button);
    expect(toTranslatables(content)).toStrictEqual([
      {
        id: 'eend5',
        path: 'buttonData.text',
        text: 'Click Me',
        type: 'BUTTON',
      },
    ]);
  });
  it('should create translatables for html', () => {
    const content = RichContent.fromJSON(html);
    expect(toTranslatables(content)).toStrictEqual([
      {
        id: 'e1ll9',
        path: 'htmlData.html',
        text: `<div>Hi, I'm a <b>text</b></div>`,
        type: 'HTML',
      },
    ]);
  });
  it('should create translatables for image', () => {
    const content = RichContent.fromJSON(image);
    expect(toTranslatables(content)).toStrictEqual([
      {
        id: '1m28',
        path: 'imageData.altText',
        text: 'Baby Picture',
        type: 'IMAGE',
      },
      {
        id: '1m28',
        path: 'imageData.caption',
        text: `Here's a caption`,
        type: 'IMAGE',
      },
    ]);
  });
  it('should create translatables for link preview', () => {
    const content = RichContent.fromJSON(linkPreview);
    expect(toTranslatables(content)).toStrictEqual([
      {
        id: '76i9u',
        path: 'linkPreviewData.title',
        text: 'A mock title',
        type: 'LINK_PREVIEW',
      },
      {
        id: '76i9u',
        path: 'linkPreviewData.description',
        text: 'A mock description',
        type: 'LINK_PREVIEW',
      },
    ]);
  });
  it('should create translatables for video', () => {
    const content = RichContent.fromJSON(video);
    expect(toTranslatables(content)).toStrictEqual([
      {
        id: 'rnu8',
        path: 'videoData.title',
        text: 'Hola',
        type: 'VIDEO',
      },
    ]);
  });
  it('should create translatables for app embed', () => {
    const content = RichContent.fromJSON(appEmbed);
    expect(toTranslatables(content)).toStrictEqual([
      {
        id: '3bvvq',
        path: 'appEmbedData.name',
        text: 'Roy Birthday Party!!',
        type: 'APP_EMBED',
      },
      {
        id: '3bvvq',
        path: 'appEmbedData.eventData.scheduling',
        text: '28 de diciembre de 2020, 19:00 ',
        type: 'APP_EMBED',
      },
      {
        id: '3bvvq',
        path: 'appEmbedData.eventData.location',
        text: ` Modi'in-Maccabim-Re'ut`,
        type: 'APP_EMBED',
      },
    ]);
  });
  it('should create translatables for poll', () => {
    const content = RichContent.fromJSON(poll);
    expect(toTranslatables(content)).toStrictEqual([
      {
        id: '36',
        path: 'pollData.poll.title',
        text: 'Where do you want to have breakfast tomorrow to use the monthly budget?',
        type: 'POLL',
      },
      {
        id: '36',
        path: 'pollData.poll.options[0].title',
        text: 'Cafe Nordoy',
        type: 'POLL',
      },
      {
        id: '36',
        path: 'pollData.poll.options[1].title',
        text: 'קפה רוטשילד 65',
        type: 'POLL',
      },
      {
        id: '36',
        path: 'pollData.poll.options[2].title',
        text: 'האחים',
        type: 'POLL',
      },
      {
        id: '36',
        path: 'pollData.poll.options[3].title',
        text: 'הוטל מונטיפיורי',
        type: 'POLL',
      },
    ]);
  });
  it('should create translatables for gallery', () => {
    const content = RichContent.fromJSON(gallery);
    expect(toTranslatables(content)).toStrictEqual([
      {
        id: 'dq17c',
        path: 'galleryData.items[0].title',
        text: 'Mocked Caption',
        type: 'GALLERY',
      },
      {
        id: 'dq17c',
        path: 'galleryData.items[0].altText',
        text: 'Mocked AltText',
        type: 'GALLERY',
      },
      {
        id: 'dq17c',
        path: 'galleryData.items[1].title',
        text: 'Mocked Caption 2',
        type: 'GALLERY',
      },
      {
        id: 'dq17c',
        path: 'galleryData.items[1].altText',
        text: 'Mocked AltText 2',
        type: 'GALLERY',
      },
      {
        id: 'dq17c',
        path: 'galleryData.items[2].title',
        text: 'Mocked Caption 3',
        type: 'GALLERY',
      },
      {
        id: 'dq17c',
        path: 'galleryData.items[2].altText',
        text: 'Mocked AltText 3',
        type: 'GALLERY',
      },
    ]);
  });
});
