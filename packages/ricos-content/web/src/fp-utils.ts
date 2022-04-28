import * as A from 'fp-ts/Array';
import * as E from 'fp-ts/Either';
import type { Eq } from 'fp-ts/Eq';
import { identity, pipe } from 'fp-ts/function';
import type { Monoid } from 'fp-ts/Monoid';
import { concatAll } from 'fp-ts/Monoid';
import { MonoidAll, MonoidAny } from 'fp-ts/boolean';
import * as O from 'fp-ts/Option';
import * as S from 'fp-ts/Semigroup';

/**
 *
 * Functional switch/case analogue:
 *
 *  switch(candidate) {
 *    case(predicate(candidate)) => resolution(candidate);
 *    ...
 *    default: defaultT
 *  }
 *
 * @template C examination candidate type
 * @template T resolution result type
 * @param {C} candidate
 * @param {T} defaultT fallback value
 * @param {[(candidate: C) => boolean, (candidate: C) => T][]} resolvers [predicate, resolution] tuples
 * @returns  {T}
 */
export const firstRight = <C, T>(
  candidate: C,
  defaultT: T,
  resolvers: [(candidate: C) => boolean, (candidate: C) => T][]
): T => {
  const firstRightSemi = E.getSemigroup<T, T>(S.first<T>());
  const concatFirstRightSemi = S.concatAll(firstRightSemi)(E.left(defaultT));
  return pipe(
    concatFirstRightSemi(
      pipe(
        resolvers,
        A.map(r =>
          pipe(
            candidate,
            E.fromPredicate(r[0], () => defaultT),
            E.map(r[1])
          )
        )
      )
    ),
    E.fold(identity, identity)
  );
};

export const equals =
  <T>(E: Eq<T>) =>
  (lhs: T) =>
  (rhs: T) =>
    E.equals(lhs, rhs);

export const concatApply =
  <T, D>(m: Monoid<T>) =>
  (fns: ((data: D) => T)[]) =>
  (data: D) =>
    pipe(fns, A.ap(A.of(data)), concatAll(m));

export const and = concatApply(MonoidAll);
export const or = concatApply(MonoidAny);

export const tap =
  <F extends (data: D) => any, D>( // eslint-disable-line @typescript-eslint/no-explicit-any
    f: F
  ) =>
  (data: D): D => {
    f(data);
    return data;
  };

const logWithTag =
  <T>(tag: string, processor: (data: T) => unknown = identity) =>
  (data: T) =>
    console.log(tag, processor(data)); // eslint-disable-line no-console
const stringifyWithTag =
  <T>(tag: string) =>
  (data: T) =>
    console.log(tag, JSON.stringify(data, null, 2)); // eslint-disable-line no-console

export const log = <T>(tag: string, processor: (data: T) => unknown = identity) =>
  tap(logWithTag<T>(tag, processor));

export const deepLog = <T>(tag: string) => tap(stringifyWithTag<T>(tag));

export const getMatches =
  (regex: RegExp) =>
  (str: string): O.Option<RegExpExecArray> =>
    pipe(regex.exec(str), O.fromNullable);

export const stringifyWithReplace =
  (
    replacer: (key: string, value: any) => any, // eslint-disable-line @typescript-eslint/no-explicit-any
    space = 2
  ) =>
  <A>(a: A): E.Either<unknown, string> =>
    E.tryCatch(() => {
      const s = JSON.stringify(a, replacer, space);
      if (typeof s !== 'string') {
        throw new Error('Converting unsupported structure to JSON');
      }
      return s;
    }, identity);
