import type { AvailableExperiments } from 'ricos-types';

export function parseExperiments(
  wixExperiments: Record<string, string | boolean>
): AvailableExperiments {
  return Object.entries(wixExperiments).reduce((parsed, [key, value]) => {
    // splits specs.namespace.name to elements
    const [, namespace, name] = key.split('.');
    const _value = value.toString().toLowerCase();
    parsed[name] = {
      enabled: _value !== '' && _value !== 'false',
      value,
      namespace,
    };
    return parsed;
  }, {});
}
