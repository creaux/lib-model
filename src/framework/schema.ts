import { Schema as MongoSchema } from 'mongoose';
import { Injectable } from './injector';
import { SchemaName } from '../enums/schema-name';

export const SCHEMA_TOKEN = Symbol('schema');

export class SchemaObject {
  constructor(public schema: MongoSchema, public name: SchemaName) {}
}

export function AssignSchema(schemaObject: SchemaObject) {
  return (Target: any) => {
    Reflect.defineMetadata(SCHEMA_TOKEN, schemaObject, Target);
    return Target;
  };
}

@Injectable()
export class Schema {
  public resolve(Target: Function) {
    return Reflect.getMetadata(SCHEMA_TOKEN, Target);
  }
}

export const schema = new Schema();
