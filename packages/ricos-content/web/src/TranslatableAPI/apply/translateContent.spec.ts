console.log('need to fix circular dependency');
// import type { Node } from 'ricos-schema';
// import { RichContent, Node_Type } from 'ricos-schema';
// import type { DeepPartial } from 'utility-types';
// import { translateContent } from './translateContent';
// import type { Translatable } from '../types';
// import migrationContent from '../../../statics/json/migratedFixtures/migration-content.json';
// import translatablesMock from '../../../__tests__/translatablesMock.json';
// import paragraph from '../../../__tests__/toTranslatables/paragraph.json';
// import heading from '../../../__tests__/toTranslatables/heading.json';
// import appEmbed from '../../../__tests__/toTranslatables/appEmbed.json';
// import button from '../../../__tests__/toTranslatables/button.json';
// import html from '../../../__tests__/toTranslatables/html.json';
// import image from '../../../__tests__/toTranslatables/image.json';
// import linkPreview from '../../../__tests__/toTranslatables/linkPreview.json';
// import video from '../../../__tests__/toTranslatables/video.json';
// import poll from '../../../__tests__/toTranslatables/poll.json';
// import { compare } from 'wix-rich-content-common';

// const differentiate = (translatables: Translatable[]): Translatable[] =>
//   translatables.map(t => ({ ...t, text: 'abc' }));

// describe('translateContent', () => {
//   // eslint-disable-next-line mocha/no-skipped-tests
//   it.skip('should apply translations to migration-content.json', () => {
//     const content = RichContent.fromJSON(migrationContent);
//     const mockTranslatable: Translatable[] = translatablesMock as Translatable[];
//     const result = translateContent(content, mockTranslatable);
//     expect(RichContent.toJSON(result)).toStrictEqual(migrationContent);
//   });
//   it('should apply translations to paragraph', () => {
//     const content = RichContent.fromJSON(paragraph);
//     const mockTranslatable: Translatable[] = [
//       {
//         id: '0',
//         text: '<p>Hello, this is a dummy text with <strong>bold</strong> and <u>underline</u> and <em>italic</em>.</p>',
//         type: Node_Type.PARAGRAPH,
//       },
//     ];
//     const result = translateContent(content, mockTranslatable);
//     expect(RichContent.fromJSON(result)).toStrictEqual(content);
//   });
//   it('should apply translations to heading', () => {
//     const content = RichContent.fromJSON(heading);
//     const mockTranslatable: Translatable[] = [
//       {
//         id: '0',
//         // eslint-disable-next-line max-len
//         text: '<h2>Hello, this is a dummy text with <strong>bold</strong> and <u>underline</u> and <em>italic</em>.</h2>',
//         type: Node_Type.HEADING,
//       },
//     ];
//     const result = translateContent(content, mockTranslatable);
//     expect(result).toStrictEqual(content);
//   });
//   describe('appEmbed', () => {
//     const content = RichContent.fromJSON(appEmbed);
//     const mockTranslatable: Translatable[] = [
//       {
//         id: '3bvvq',
//         path: 'appEmbedData.name',
//         text: 'Roy Birthday Party!!',
//         type: Node_Type.APP_EMBED,
//       },
//       {
//         id: '3bvvq',
//         path: 'appEmbedData.eventData.scheduling',
//         text: '28 de diciembre de 2020, 19:00 ',
//         type: Node_Type.APP_EMBED,
//       },
//       {
//         id: '3bvvq',
//         path: 'appEmbedData.eventData.location',
//         text: ` Modi'in-Maccabim-Re'ut`,
//         type: Node_Type.APP_EMBED,
//       },
//     ];
//     const diffTranslations = differentiate(mockTranslatable);

//     it('should not make change if source = translations', () => {
//       const result = translateContent(content, mockTranslatable);
//       expect(result).toStrictEqual(content);
//     });

//     it('should change text attributes', () => {
//       const result = translateContent(content, diffTranslations);
//       expect(compare(result, content)).toStrictEqual<DeepPartial<Node>>({
//         nodes: [
//           {
//             appEmbedData: {
//               name: 'abc',
//               eventData: {
//                 location: 'abc',
//                 scheduling: 'abc',
//               },
//             },
//           },
//         ],
//       });
//     });
//   });

//   describe('button', () => {
//     const content = RichContent.fromJSON(button);
//     const mockTranslatable: Translatable[] = [
//       {
//         id: 'eend5',
//         path: 'buttonData.text',
//         text: 'Click Me',
//         type: Node_Type.BUTTON,
//       },
//     ];
//     const diffTranslations = differentiate(mockTranslatable);

//     it('should not make change if source = translations', () => {
//       const result = translateContent(content, mockTranslatable);
//       expect(result).toStrictEqual(content);
//     });

//     it('should change text attributes', () => {
//       const result = translateContent(content, diffTranslations);
//       expect(compare(result, content)).toStrictEqual<DeepPartial<Node>>({
//         nodes: [{ buttonData: { text: 'abc' } }],
//       });
//     });
//   });

//   describe('html', () => {
//     const content = RichContent.fromJSON(html);
//     const mockTranslatable: Translatable[] = [
//       {
//         id: 'e1ll9',
//         path: 'htmlData.html',
//         text: `<div>Hi, I'm a <b>text</b></div>`,
//         type: Node_Type.HTML,
//       },
//     ];
//     const diffTranslations = differentiate(mockTranslatable);

//     it('should not make change if source = translations', () => {
//       const result = translateContent(content, mockTranslatable);
//       expect(result).toStrictEqual(content);
//     });

//     it('should change text attributes', () => {
//       const result = translateContent(content, diffTranslations);
//       expect(compare(result, content)).toStrictEqual<DeepPartial<Node>>({
//         nodes: [{ htmlData: { html: 'abc' } }],
//       });
//     });
//   });

//   describe('image', () => {
//     const content = RichContent.fromJSON(image);
//     const mockTranslatable: Translatable[] = [
//       {
//         id: '1m28',
//         path: 'imageData.altText',
//         text: 'Baby Picture',
//         type: Node_Type.IMAGE,
//       },
//       {
//         id: '1m28',
//         path: 'imageData.caption',
//         text: `Here's a caption`,
//         type: Node_Type.IMAGE,
//       },
//     ];
//     const diffTranslations = differentiate(mockTranslatable);

//     it('should not make change if source = translations', () => {
//       const result = translateContent(content, mockTranslatable);
//       expect(result).toStrictEqual(content);
//     });

//     it('should change text attributes', () => {
//       const result = translateContent(content, diffTranslations);
//       expect(compare(result, content)).toStrictEqual<DeepPartial<Node>>({
//         nodes: [{ imageData: { altText: 'abc', caption: 'abc' } }],
//       });
//     });
//   });

//   describe('linkPreview', () => {
//     const content = RichContent.fromJSON(linkPreview);
//     const mockTranslatable: Translatable[] = [
//       {
//         id: '76i9u',
//         path: 'linkPreviewData.title',
//         text: 'A mock title',
//         type: Node_Type.LINK_PREVIEW,
//       },
//       {
//         id: '76i9u',
//         path: 'linkPreviewData.description',
//         text: 'A mock description',
//         type: Node_Type.LINK_PREVIEW,
//       },
//     ];
//     const diffTranslations = differentiate(mockTranslatable);

//     it('should not make change if source = translations', () => {
//       const result = translateContent(content, mockTranslatable);
//       expect(result).toStrictEqual(content);
//     });

//     it('should change text attributes', () => {
//       const result = translateContent(content, diffTranslations);
//       expect(compare(result, content)).toStrictEqual<DeepPartial<Node>>({
//         nodes: [{ linkPreviewData: { description: 'abc', title: 'abc' } }],
//       });
//     });
//   });

//   describe('video', () => {
//     const content = RichContent.fromJSON(video);
//     const mockTranslatable: Translatable[] = [
//       {
//         id: 'rnu8',
//         path: 'videoData.title',
//         text: 'Hola',
//         type: Node_Type.VIDEO,
//       },
//     ];
//     const diffTranslations = differentiate(mockTranslatable);

//     it('should not make change if source = translations', () => {
//       const result = translateContent(content, mockTranslatable);
//       expect(result).toStrictEqual(content);
//     });

//     it('should change text attributes', () => {
//       const result = translateContent(content, diffTranslations);
//       expect(compare(result, content)).toStrictEqual<DeepPartial<Node>>({
//         nodes: [{ videoData: { title: 'abc' } }],
//       });
//     });
//   });

//   describe('poll', () => {
//     const content = RichContent.fromJSON(poll);
//     const mockTranslatable: Translatable[] = [
//       {
//         id: '36',
//         path: 'pollData.poll.title',
//         text: 'Where do you want to have breakfast tomorrow to use the monthly budget?',
//         type: Node_Type.POLL,
//       },
//       {
//         id: '36',
//         path: 'pollData.poll.options[0].title',
//         text: 'Cafe Nordoy',
//         type: Node_Type.POLL,
//       },
//       {
//         id: '36',
//         path: 'pollData.poll.options[1].title',
//         text: 'קפה רוטשילד 65',
//         type: Node_Type.POLL,
//       },
//     ];
//     const diffTranslations = differentiate(mockTranslatable);

//     it('should not make change if source = translations', () => {
//       const result = translateContent(content, mockTranslatable);
//       expect(result).toStrictEqual(content);
//     });

//     it('should change text attributes', () => {
//       const result = translateContent(content, diffTranslations);
//       expect(compare(result, content)).toStrictEqual<DeepPartial<Node>>({
//         nodes: [
//           {
//             pollData: {
//               poll: {
//                 title: 'abc',
//                 options: [
//                   {
//                     title: 'abc',
//                   },
//                   {
//                     title: 'abc',
//                   },
//                 ],
//               },
//             },
//           },
//         ],
//       });
//     });
//   });
// });
