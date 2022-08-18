/* eslint-disable */
export interface MentionData {
  name: string;
  slug: string;
  id?: string;
}

const baseMentionData: object = { name: '', slug: '' };

export const MentionData = {
  fromJSON(object: any): MentionData {
    const message = { ...baseMentionData } as MentionData;
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = '';
    }
    if (object.slug !== undefined && object.slug !== null) {
      message.slug = String(object.slug);
    } else {
      message.slug = '';
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = undefined;
    }
    return message;
  },

  toJSON(message: MentionData): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.slug !== undefined && (obj.slug = message.slug);
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },
};
