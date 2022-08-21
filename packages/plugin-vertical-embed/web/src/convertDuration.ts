import { isNumber } from 'lodash';

export const convertDuration = (durationInMinutes, t) => {
  if (!isNumber(durationInMinutes)) return '';
  if (durationInMinutes < 60) {
    return t('VerticalEmbed_Units_Minute', { minutes: durationInMinutes });
  }
  const hours = durationInMinutes / 60;
  const rhours = Math.floor(hours);
  const minutes = (hours - rhours) * 60;
  const rminutes = Math.round(minutes);
  const durationInHours =
    rminutes === 0
      ? t('VerticalEmbed_Units_Hour', { hours: rhours })
      : t('VerticalEmbed_Units_Hour', { hours: rhours }) +
        ' ' +
        t('VerticalEmbed_Units_Minute', { minutes: rminutes });
  return durationInHours;
};
