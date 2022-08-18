import * as A from 'fp-ts/Array';
import { identity, pipe } from 'fp-ts/function';
import type * as J from 'fp-ts/Json';
import { concatAll } from 'fp-ts/Monoid';
import * as R from 'fp-ts/Record';
import { first } from 'fp-ts/Semigroup';
import * as T from 'fp-ts/Tuple';
import type { ListValue, Struct, Value } from '@justame-ricos/ricos-schema';
import { firstRight } from '../../../fp-utils';
import * as SRT from '../struct-refined-types';

const mergeJsonMap = R.getMonoid(first<J.Json>());
const toRecord = ([k, v]: [string, J.Json]): J.JsonRecord => ({ [k]: v });

export const convertStructToJson = (message: Struct): J.JsonRecord =>
  pipe(
    message.fields,
    Object.entries,
    A.map(T.bimap(convertValueToJson, identity)),
    A.map(toRecord),
    concatAll(mergeJsonMap)
  );

const convertValueToJson = (message: Value): J.Json =>
  firstRight(message, null as J.Json, [
    [SRT.isBoolValue, ({ boolValue }) => boolValue as boolean],
    [SRT.isNumberValue, ({ numberValue }) => numberValue as number],
    [SRT.isStringValue, ({ stringValue }) => stringValue as string],
    [SRT.isNullValue, () => null],
    [SRT.isArrayValue, m => convertListToJson(m.listValue || { values: [] })],
    [SRT.isStructValue, m => convertStructToJson(m.structValue || { fields: {} })],
  ]);

const convertListToJson = (message: ListValue): J.JsonArray =>
  pipe(message.values, A.map(convertValueToJson));
