const strCompare = (str1: string, str2: string) => str1.localeCompare(str2);
const numCompare = (num1: number, num2: number) => num1 - num2;
export const compare = (input: string | number, current) =>
  typeof input === 'string' ? strCompare(current, input) : numCompare(current, input);
