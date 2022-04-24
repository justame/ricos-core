
import {
  convertRelObjectToString,
  convertRelStringToObject,
  convertTargetStringToBoolean,
  convertTargetBooleanToString,
  getRelValue,
} from './../Utils/linkConverters';

const relString = 'nofollow sponsored ugc';
const relObject = { nofollow: true, sponsored: true, ugc: true };
const BLANK = '_blank';
const TOP = '_top';
const defaultRelValue = 'noopener noreferrer';
const dynamicRelValue = `${defaultRelValue} ${relString}`;

describe('Test link converters', () => {
  it('should convert rel object to string', () => {
    const converted = convertRelObjectToString(relObject);
    expect(converted).toBe(relString);
  });

  it('should convert rel string to object', () => {
    const converted = convertRelStringToObject(relString);
    expect(converted).toEqual(relObject);
  });

  it('should convert target string to boolean', () => {
    const converted = convertTargetStringToBoolean(BLANK);
    expect(converted).toBe(true);
  });

  it('should convert target string to boolean', () => {
    const converted = convertTargetStringToBoolean(TOP);
    expect(converted).toBe(false);
  });

  it('should convert target boolean to string', () => {
    const converted = convertTargetBooleanToString(true);
    expect(converted).toBe(BLANK);
  });

  it('should convert target boolean to string', () => {
    const converted = convertTargetBooleanToString(false);
    expect(converted).toBe(TOP);
  });

  it('should get default rel value', () => {
    const converted = getRelValue(undefined);
    expect(converted).toBe(defaultRelValue);
  });

  it('should get dynamic rel value', () => {
    const converted = getRelValue(relString);
    expect(converted).toBe(dynamicRelValue);
  });
});
