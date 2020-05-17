import { Schema, SchemaDefinition, SchemaOptions, Types } from 'mongoose';

export class BaseScheme extends Schema {
  public constructor(definition?: SchemaDefinition, options?: SchemaOptions) {
    super(definition, { strict: true, versionKey: false, ...options });
  }
}
