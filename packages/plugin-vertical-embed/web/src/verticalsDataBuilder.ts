import { verticalEmbedProviders } from './constants';
import { convertDuration } from './convertDuration';

const getBookingContent = ({ name, durations }, t) => ({
  title: name,
  info: { leftSubtitle: durations && convertDuration(durations, t) },
  buttonText: t('VerticalEmbed_Bookings_Button'),
});

const getEventContent = ({ name, scheduling, location }, t) => ({
  title: name,
  info: { leftSubtitle: scheduling, rightSubtitle: location },
  buttonText: t('VerticalEmbed_Events_Button'),
});

const getProductContent = ({ name }, t) => ({
  title: name,
  buttonText: t('VerticalEmbed_Products_Button'),
});

const contentTypeMapGetter = {
  [verticalEmbedProviders.booking]: getBookingContent,
  [verticalEmbedProviders.event]: getEventContent,
  [verticalEmbedProviders.product]: getProductContent,
};

export const verticalsDataBuilder = (type, data, t, changeBaseUrl = x => x) => {
  const { imageSrc, pageUrl, imageWidth, imageHeight } = data;
  return {
    url: changeBaseUrl(pageUrl),
    imageSrc,
    imageWidth,
    imageHeight,
    content: contentTypeMapGetter[type](data, t),
  };
};
