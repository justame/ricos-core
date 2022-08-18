import { extract } from '../RicosContentAPI/extract';
import type { RichContent } from '@justame-ricos/ricos-schema';

export const extractAppEmbedData = (content: RichContent) =>
  extract(content.nodes)
    .map(
      ({ appEmbedData }) =>
        appEmbedData && {
          type: appEmbedData.type,
          id: appEmbedData.itemId,
          url: appEmbedData.url,
          eventData: appEmbedData.eventData,
          bookingData: appEmbedData.bookingData,
        }
    )
    .get();
