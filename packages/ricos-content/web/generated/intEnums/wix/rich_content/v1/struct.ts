/* eslint-disable */
/**
 * `NullValue` is a singleton enumeration to represent the null value for the
 * `Value` type union.
 *
 *  The JSON representation for `NullValue` is JSON `null`.
 */
export const enum NullValue {
  /** NULL_VALUE - Null value. */
  NULL_VALUE = 0,
  UNRECOGNIZED = -1,
}

export function nullValueFromJSON(object: any): NullValue {
  switch (object) {
    case 0:
    case 'NULL_VALUE':
      return NullValue.NULL_VALUE;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return NullValue.UNRECOGNIZED;
  }
}

export function nullValueToJSON(object: NullValue): string {
  switch (object) {
    case NullValue.NULL_VALUE:
      return 'NULL_VALUE';
    default:
      return 'UNKNOWN';
  }
}

/**
 * `Struct` represents a structured data value, consisting of fields
 * which map to dynamically typed values. In some languages, `Struct`
 * might be supported by a native representation. For example, in
 * scripting languages like JS a struct is represented as an
 * object. The details of that representation are described together
 * with the proto support for the language.
 *
 * The JSON representation for `Struct` is JSON object.
 */
export interface Struct {
  /** Unordered map of dynamically typed values. */
  fields: { [key: string]: Value };
}

export interface Struct_FieldsEntry {
  key: string;
  value?: Value;
}

/**
 * `Value` represents a dynamically typed value which can be either
 * null, a number, a string, a boolean, a recursive struct value, or a
 * list of values. A producer of value is expected to set one of these
 * variants. Absence of any variant indicates an error.
 *
 * The JSON representation for `Value` is JSON value.
 */
export interface Value {
  /** Represents a null value. */
  nullValue: NullValue | undefined;
  /** Represents a double value. */
  numberValue: number | undefined;
  /** Represents a string value. */
  stringValue: string | undefined;
  /** Represents a boolean value. */
  boolValue: boolean | undefined;
  /** Represents a structured value. */
  structValue?: Struct | undefined;
  /** Represents a repeated `Value`. */
  listValue?: ListValue | undefined;
}

/**
 * `ListValue` is a wrapper around a repeated field of values.
 *
 * The JSON representation for `ListValue` is JSON array.
 */
export interface ListValue {
  /** Repeated field of dynamically typed values. */
  values: Value[];
}

const baseStruct: object = {};

export const Struct = {
  fromJSON(object: any): Struct {
    const message = { ...baseStruct } as Struct;
    message.fields = {};
    if (object.fields !== undefined && object.fields !== null) {
      Object.entries(object.fields).forEach(([key, value]) => {
        message.fields[key] = Value.fromJSON(value);
      });
    }
    return message;
  },

  toJSON(message: Struct): unknown {
    const obj: any = {};
    obj.fields = {};
    if (message.fields) {
      Object.entries(message.fields).forEach(([k, v]) => {
        obj.fields[k] = Value.toJSON(v);
      });
    }
    return obj;
  },
};

const baseStruct_FieldsEntry: object = { key: '' };

export const Struct_FieldsEntry = {
  fromJSON(object: any): Struct_FieldsEntry {
    const message = { ...baseStruct_FieldsEntry } as Struct_FieldsEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    } else {
      message.key = '';
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = Value.fromJSON(object.value);
    } else {
      message.value = undefined;
    }
    return message;
  },

  toJSON(message: Struct_FieldsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined &&
      (obj.value = message.value ? Value.toJSON(message.value) : undefined);
    return obj;
  },
};

const baseValue: object = {};

export const Value = {
  fromJSON(object: any): Value {
    const message = { ...baseValue } as Value;
    if (object.nullValue !== undefined && object.nullValue !== null) {
      message.nullValue = nullValueFromJSON(object.nullValue);
    } else {
      message.nullValue = undefined;
    }
    if (object.numberValue !== undefined && object.numberValue !== null) {
      message.numberValue = Number(object.numberValue);
    } else {
      message.numberValue = undefined;
    }
    if (object.stringValue !== undefined && object.stringValue !== null) {
      message.stringValue = String(object.stringValue);
    } else {
      message.stringValue = undefined;
    }
    if (object.boolValue !== undefined && object.boolValue !== null) {
      message.boolValue = Boolean(object.boolValue);
    } else {
      message.boolValue = undefined;
    }
    if (object.structValue !== undefined && object.structValue !== null) {
      message.structValue = Struct.fromJSON(object.structValue);
    } else {
      message.structValue = undefined;
    }
    if (object.listValue !== undefined && object.listValue !== null) {
      message.listValue = ListValue.fromJSON(object.listValue);
    } else {
      message.listValue = undefined;
    }
    return message;
  },

  toJSON(message: Value): unknown {
    const obj: any = {};
    message.nullValue !== undefined &&
      (obj.nullValue =
        message.nullValue !== undefined ? nullValueToJSON(message.nullValue) : undefined);
    message.numberValue !== undefined && (obj.numberValue = message.numberValue);
    message.stringValue !== undefined && (obj.stringValue = message.stringValue);
    message.boolValue !== undefined && (obj.boolValue = message.boolValue);
    message.structValue !== undefined &&
      (obj.structValue = message.structValue ? Struct.toJSON(message.structValue) : undefined);
    message.listValue !== undefined &&
      (obj.listValue = message.listValue ? ListValue.toJSON(message.listValue) : undefined);
    return obj;
  },
};

const baseListValue: object = {};

export const ListValue = {
  fromJSON(object: any): ListValue {
    const message = { ...baseListValue } as ListValue;
    message.values = [];
    if (object.values !== undefined && object.values !== null) {
      for (const e of object.values) {
        message.values.push(Value.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: ListValue): unknown {
    const obj: any = {};
    if (message.values) {
      obj.values = message.values.map(e => (e ? Value.toJSON(e) : undefined));
    } else {
      obj.values = [];
    }
    return obj;
  },
};
