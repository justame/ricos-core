import { uniqueId } from 'lodash';
export function generateId(prefix = ''): string {
  const key = Math.random().toString(36).substr(2, 5);

  return `${key}${uniqueId(prefix)}`;
}
