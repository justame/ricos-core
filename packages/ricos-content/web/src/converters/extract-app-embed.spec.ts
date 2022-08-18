import { extractAppEmbedData } from './extract-app-embed';
import content from '../../statics/json/migratedFixtures/migration-content.json';
import { RichContent } from 'ricos-schema';

/* eslint-disable max-len */
describe('extractAppEmbedData', () => {
  it('should extract AppEmbed data from content', () => {
    const expected = [
      {
        bookingData: undefined,
        eventData: undefined,
        id: '265beaf5-3008-c5c2-fa5e-1447e0bebf71',
        type: 'PRODUCT',
        url: 'https://www.wix.app/stores/54e7b326-49ec-434f-a7cc-c2ad1eaec049/catalog/265beaf5-3008-c5c2-fa5e-1447e0bebf71?d=https://sapirs0.wixsite.com/mysite/product-page/flowers',
      },
      {
        bookingData: undefined,
        eventData: {
          location: ' Suzanna Baby Shop',
          scheduling: '13 de octubre de 2020 19:00–27 de octubre de 2020 23:00 ',
        },
        id: '65129504-3bfc-44c8-90cc-f9eedfea9321',
        type: 'EVENT',
        url: 'https://www.wix.app/events/54e7b326-49ec-434f-a7cc-c2ad1eaec049/65129504-3bfc-44c8-90cc-f9eedfea9321/details?d=https://sapirs0.wixsite.com/mysite/event-details/2-week-course-of-intensive-physical-research-with-a-sense-of-plenty-of-time-for-process-and-discovery-rooted-in-ohad-n',
      },
      {
        bookingData: {
          durations: '90',
        },
        eventData: undefined,
        id: '03ef6546-985d-4739-951e-ca897375b967',
        type: 'BOOKING',
        url: 'https://www.wix.app/bookings/54e7b326-49ec-434f-a7cc-c2ad1eaec049/service/03ef6546-985d-4739-951e-ca897375b967/details?d=https://sapirs0.wixsite.com/mysite/bookings-checkout/cupcake-master',
      },
    ];
    const actual = extractAppEmbedData(RichContent.fromJSON(content));
    expect(actual).toStrictEqual(expected);
  });
});
