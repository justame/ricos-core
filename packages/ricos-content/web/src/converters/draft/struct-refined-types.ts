import type { Struct, Value, ListValue } from '@justame-ricos/ricos-schema';
import { NullValue } from '@justame-ricos/ricos-schema';
import { isObject } from 'lodash';

export type BoolValue = {
  boolValue: boolean;
  numberValue: undefined;
  stringValue: undefined;
  nullValue: undefined;
};

export const isBoolValue = (val: Value): val is BoolValue => typeof val.boolValue === 'boolean';

export type StringValue = {
  stringValue: string;
  boolValue: undefined;
  numberValue: undefined;
  nullValue: undefined;
};

export const isStringValue = (val: Value): val is StringValue =>
  typeof val.stringValue === 'string';

export type NumberValue = {
  numberValue: number;
  boolValue: undefined;
  stringValue: undefined;
  nullValue: undefined;
};

export const isNumberValue = (val: Value): val is NumberValue =>
  typeof val.numberValue === 'number';

export type ArrayValue = {
  listValue: ListValue;
  boolValue: undefined;
  numberValue: undefined;
  stringValue: undefined;
  nullValue: undefined;
};

export const isArrayValue = (val: Value): val is ArrayValue =>
  isObject(val.listValue) && Array.isArray(val.listValue?.values);

export type StructValue = {
  structValue: Struct;
  boolValue: undefined;
  numberValue: undefined;
  stringValue: undefined;
  nullValue: undefined;
};

export const isStructValue = (val: Value): val is StructValue =>
  isObject(val.structValue) && isObject(val.structValue?.fields);

export type EmptyValue = {
  boolValue: undefined;
  numberValue: undefined;
  stringValue: undefined;
  nullValue: NullValue.NULL_VALUE;
};

export const isNullValue = (val: Value): val is EmptyValue =>
  val.nullValue === NullValue.NULL_VALUE;
