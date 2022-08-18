/* eslint-disable */
export interface BlockquoteData {
  indentation: number;
}

const baseBlockquoteData: object = { indentation: 0 };

export const BlockquoteData = {
  fromJSON(object: any): BlockquoteData {
    const message = { ...baseBlockquoteData } as BlockquoteData;
    if (object.indentation !== undefined && object.indentation !== null) {
      message.indentation = Number(object.indentation);
    } else {
      message.indentation = 0;
    }
    return message;
  },

  toJSON(message: BlockquoteData): unknown {
    const obj: any = {};
    message.indentation !== undefined && (obj.indentation = message.indentation);
    return obj;
  },
};
