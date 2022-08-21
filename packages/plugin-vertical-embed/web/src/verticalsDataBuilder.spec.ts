/* eslint-disable max-len */
import { verticalsDataBuilder } from './verticalsDataBuilder';

const mockData = {
  product: {
    data: {
      pageUrl:
        'https://www.wix.app/stores/54e7b326-49ec-434f-a7cc-c2ad1eaec049/catalog/265beaf5-3008-c5c2-fa5e-1447e0bebf71?d=https://sapirs0.wixsite.com/mysite/product-page/flowers',
      name: 'flowers',
      imageSrc:
        'https://static.wixstatic.com/media/11062b_3a93dbce5ab64e7c90d9b2a83a598893~mv2.jpg/v1/fit/w_6720,h_4480,q_90/file.jpg',
      imageWidth: 6720,
      imageHeight: 4480,
    },
    res: {
      url: 'https://www.wix.app/stores/54e7b326-49ec-434f-a7cc-c2ad1eaec049/catalog/265beaf5-3008-c5c2-fa5e-1447e0bebf71?d=https://sapirs0.wixsite.com/mysite/product-page/flowers',
      imageSrc:
        'https://static.wixstatic.com/media/11062b_3a93dbce5ab64e7c90d9b2a83a598893~mv2.jpg/v1/fit/w_6720,h_4480,q_90/file.jpg',
      imageWidth: 6720,
      imageHeight: 4480,
      content: {
        title: 'flowers',
        buttonText: 'VerticalEmbed_Products_Button',
      },
    },
  },
  event: {
    data: {
      name: '2-week course of intensive physical research, with a sense of plenty of time for process and discovery. Rooted in Ohad N',
      pageUrl:
        'https://www.wix.app/events/54e7b326-49ec-434f-a7cc-c2ad1eaec049/65129504-3bfc-44c8-90cc-f9eedfea9321/details?d=https://sapirs0.wixsite.com/mysite/event-details/2-week-course-of-intensive-physical-research-with-a-sense-of-plenty-of-time-for-process-and-discovery-rooted-in-ohad-n',
      imageSrc: 'https://static.wixstatic.com/media/2571849c6b0749a4bbd008a06fd65762.jpg',
      imageWidth: 865,
      imageHeight: 576,
      description: '13 de octubre de 2020 19:00-27 de octubre de 2020 23:00 | Suzanna Baby Shop',
      scheduling: '13 de octubre de 2020 19:00-27 de octubre de 2020 23:00 ',
      location: ' Suzanna Baby Shop',
    },
    res: {
      url: 'https://www.wix.app/events/54e7b326-49ec-434f-a7cc-c2ad1eaec049/65129504-3bfc-44c8-90cc-f9eedfea9321/details?d=https://sapirs0.wixsite.com/mysite/event-details/2-week-course-of-intensive-physical-research-with-a-sense-of-plenty-of-time-for-process-and-discovery-rooted-in-ohad-n',
      imageSrc: 'https://static.wixstatic.com/media/2571849c6b0749a4bbd008a06fd65762.jpg',
      imageWidth: 865,
      imageHeight: 576,
      content: {
        title:
          '2-week course of intensive physical research, with a sense of plenty of time for process and discovery. Rooted in Ohad N',
        info: {
          leftSubtitle: '13 de octubre de 2020 19:00-27 de octubre de 2020 23:00 ',
          rightSubtitle: ' Suzanna Baby Shop',
        },
        buttonText: 'VerticalEmbed_Events_Button',
      },
    },
  },
  booking: {
    data: {
      pageUrl:
        'https://www.wix.app/bookings/54e7b326-49ec-434f-a7cc-c2ad1eaec049/service/03ef6546-985d-4739-951e-ca897375b967/details?d=https://sapirs0.wixsite.com/mysite/bookings-checkout/cupcake-master',
      name: 'CUPCAKE MASTER',
      imageSrc: 'https://static.wixstatic.com/media/78ccafc88f7fce3e55bd7a33f166704b.jpg',
      imageWidth: 1036,
      imageHeight: 984,
      description: 90,
      durations: 90,
    },
    res: {
      url: 'https://www.wix.app/bookings/54e7b326-49ec-434f-a7cc-c2ad1eaec049/service/03ef6546-985d-4739-951e-ca897375b967/details?d=https://sapirs0.wixsite.com/mysite/bookings-checkout/cupcake-master',
      imageSrc: 'https://static.wixstatic.com/media/78ccafc88f7fce3e55bd7a33f166704b.jpg',
      imageWidth: 1036,
      imageHeight: 984,
      content: {
        title: 'CUPCAKE MASTER',
        info: { leftSubtitle: 'VerticalEmbed_Units_Hour VerticalEmbed_Units_Minute' },
        buttonText: 'VerticalEmbed_Bookings_Button',
      },
    },
  },
};

describe('Vertical data builder', () => {
  const t = x => x;
  Object.keys(mockData).forEach(key => {
    it(`should create ${key} data properly`, async () => {
      const { data, res } = mockData[key];
      expect(verticalsDataBuilder(key, data, t)).toEqual(res);
    });
  });

  it('should change page url', async () => {
    const newMockUrl = 'https://new-url.com';
    const productData = verticalsDataBuilder(
      'product',
      mockData.product.data,
      t,
      url => newMockUrl
    );
    expect(productData.url).toEqual(newMockUrl);
  });
});
