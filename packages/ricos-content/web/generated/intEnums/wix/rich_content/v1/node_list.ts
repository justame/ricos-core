/* eslint-disable */
export interface OrderedListData {
  indentation: number;
}

export interface BulletedListData {
  indentation: number;
}

const baseOrderedListData: object = { indentation: 0 };

export const OrderedListData = {
  fromJSON(object: any): OrderedListData {
    const message = { ...baseOrderedListData } as OrderedListData;
    if (object.indentation !== undefined && object.indentation !== null) {
      message.indentation = Number(object.indentation);
    } else {
      message.indentation = 0;
    }
    return message;
  },

  toJSON(message: OrderedListData): unknown {
    const obj: any = {};
    message.indentation !== undefined && (obj.indentation = message.indentation);
    return obj;
  },
};

const baseBulletedListData: object = { indentation: 0 };

export const BulletedListData = {
  fromJSON(object: any): BulletedListData {
    const message = { ...baseBulletedListData } as BulletedListData;
    if (object.indentation !== undefined && object.indentation !== null) {
      message.indentation = Number(object.indentation);
    } else {
      message.indentation = 0;
    }
    return message;
  },

  toJSON(message: BulletedListData): unknown {
    const obj: any = {};
    message.indentation !== undefined && (obj.indentation = message.indentation);
    return obj;
  },
};
