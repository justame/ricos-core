import { checkValidity, getContentStateSchema } from '../Utils/data-schema-validator';
import buttonSchema from '../../statics/schemas/plugin-button.schema.json';
import dividerSchema from '../../statics/schemas/plugin-divider.schema.json';
import gallerySchema from '../../statics/schemas/plugin-gallery.schema.json';
import fileUploadSchema from '../../statics/schemas/plugin-file-upload.schema.json';
import giphySchema from '../../statics/schemas/plugin-giphy.schema.json';
import htmlSchema from '../../statics/schemas/plugin-html.schema.json';
import imageSchema from '../../statics/schemas/plugin-image.schema.json';
import linkSchema from '../../statics/schemas/plugin-link.schema.json';
import linkPreviewSchema from '../../statics/schemas/plugin-link-preview.schema.json';
import pollsSchema from '../../statics/schemas/plugin-polls.schema.json';
import mapSchema from '../../statics/schemas/plugin-map.schema.json';
import mentionsSchema from '../../statics/schemas/plugin-mentions.schema.json';
import videoSchema from '../../statics/schemas/plugin-video.schema.json';
import anchorSchema from '../../statics/schemas/anchor.schema.json';
import tableSchema from '../../statics/schemas/plugin-table.schema.json';
import collapsibleListSchema from '../../statics/schemas/plugin-collapsible-list.schema.json';
import varticalEmbedSchema from '../../statics/schemas/vertical-embed.schema.json';
import emojiSchema from '../../statics/schemas/plugin-emoji.schema.json';
import audioSchema from '../../statics/schemas/plugin-audio.schema.json';
import {
  LINK_BUTTON_TYPE,
  ACTION_BUTTON_TYPE,
  DIVIDER_TYPE,
  GALLERY_TYPE,
  FILE_UPLOAD_TYPE,
  GIPHY_TYPE,
  HTML_TYPE,
  IMAGE_TYPE,
  LINK_TYPE,
  LINK_PREVIEW_TYPE,
  POLL_TYPE,
  MAP_TYPE,
  MENTION_TYPE,
  VIDEO_TYPE,
  TABLE_TYPE,
  COLLAPSIBLE_LIST_TYPE,
  VERTICAL_EMBED_TYPE,
  EMOJI_TYPE,
  AUDIO_TYPE,
} from 'ricos-content';

export const isValidEditorData = payload => {
  const schema = getContentStateSchema({
    [DIVIDER_TYPE]: dividerSchema,
    [IMAGE_TYPE]: imageSchema,
    [VIDEO_TYPE]: videoSchema,
    [AUDIO_TYPE]: audioSchema,
    [GIPHY_TYPE]: giphySchema,
    [FILE_UPLOAD_TYPE]: fileUploadSchema,
    [MAP_TYPE]: mapSchema,
    [LINK_BUTTON_TYPE]: buttonSchema,
    [ACTION_BUTTON_TYPE]: buttonSchema,
    [HTML_TYPE]: htmlSchema,
    [LINK_TYPE]: linkSchema,
    [LINK_PREVIEW_TYPE]: linkPreviewSchema,
    [POLL_TYPE]: pollsSchema,
    [GALLERY_TYPE]: gallerySchema,
    [MENTION_TYPE]: mentionsSchema,
    ANCHOR: anchorSchema,
    [TABLE_TYPE]: tableSchema,
    [COLLAPSIBLE_LIST_TYPE]: collapsibleListSchema,
    [VERTICAL_EMBED_TYPE]: varticalEmbedSchema,
    [EMOJI_TYPE]: emojiSchema,
    EMOJI_TYPE: emojiSchema,
  });
  return checkValidity(payload, schema);
};
