import contentStateSchema from '../../statics/schemas/content-state.schema.json';

import type { Schema, ValidatorResult } from 'jsonschema';

export const checkValidity = (data: Record<string, unknown>, schema: Schema): ValidatorResult => {
  const Validator = require('jsonschema').Validator;
  return new Validator().validate(data, schema);
};

export const validate = (data: Record<string, unknown>, schema: Schema) => {
  if (process.env.NODE_ENV !== 'production') {
    const result = checkValidity(data, schema);
    if (!result.valid && result.errors) {
      result.errors.forEach(error => console.warn('schema validation error:', error)); // eslint-disable-line no-console
    }
    return result.valid;
  } else {
    return true;
  }
};

export const getContentStateSchema = (
  pluginDataSchemas: { [pluginType: string]: Schema } = {}
): Schema => {
  const schema = contentStateSchema;
  schema.definitions.entityDef.anyOf = Object.keys(pluginDataSchemas).map(pluginType => {
    return {
      properties: {
        type: { const: pluginType },
        data: pluginDataSchemas[pluginType],
      },
    };
  });

  Object.keys(pluginDataSchemas).forEach(pluginType => {
    const { definitions } = pluginDataSchemas[pluginType];
    if (definitions) {
      Object.keys(definitions).forEach(definition => {
        schema.definitions[definition] = definitions[definition];
      });
    }
  });

  return schema;
};
