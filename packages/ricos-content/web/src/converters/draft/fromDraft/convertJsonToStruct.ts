import * as A from 'fp-ts/Array';
import { identity, flow, pipe } from 'fp-ts/function';
import type * as J from 'fp-ts/Json';
import { concatAll } from 'fp-ts/Monoid';
import * as R from 'fp-ts/Record';
import { first } from 'fp-ts/Semigroup';
import * as T from 'fp-ts/Tuple';
import { isObject } from 'lodash';
import type { ListValue, Struct, Value } from '@justame-ricos/ricos-schema';
import { NullValue } from '@justame-ricos/ricos-schema';
import { firstRight } from '../../../fp-utils';

const valueM = R.getMonoid(first<Value>());
const toRecord = ([k, v]: [string, Value]): Record<string, Value> => ({ [k]: v });
const toStruct = (fields: Record<string, Value>): Struct => ({ fields });
const toListValue = (values: Value[]): ListValue => ({ values });

const defaultValue = {
  numberValue: undefined,
  nullValue: undefined,
  stringValue: undefined,
  boolValue: undefined,
};

const convertJsonToList = (json: J.JsonArray): ListValue =>
  pipe(json, A.map(convertJsonToValue), toListValue);

const convertJsonToValue = (json: J.Json): Value =>
  firstRight(json, { ...defaultValue, nullValue: NullValue.NULL_VALUE } as Value, [
    [json => typeof json === 'number', json => ({ ...defaultValue, numberValue: json as number })],
    [json => typeof json === 'string', json => ({ ...defaultValue, stringValue: json as string })],
    [json => typeof json === 'boolean', json => ({ ...defaultValue, boolValue: json as boolean })],
    [
      json => Array.isArray(json),
      json => ({ ...defaultValue, listValue: convertJsonToList(json as J.JsonArray) }),
    ],
    [
      json => isObject(json),
      json => ({ ...defaultValue, structValue: convertJsonToStruct(json as J.JsonRecord) }),
    ],
  ]);

export const convertJsonToStruct: (json: J.JsonRecord) => Struct = flow(
  Object.entries,
  A.map(T.bimap(convertJsonToValue, identity)),
  A.map(toRecord),
  concatAll(valueM),
  toStruct
);
