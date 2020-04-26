import { Schema as MongoSchema } from 'mongoose';
import { Injectable } from './injector';
import { SchemaName } from '../enums/schema-name';

export const SCHEMA_TOKEN = Symbol('schema');

export class AssignSchemaOptions {
  constructor(public schema: MongoSchema, public name: SchemaName) {}
}

export function AssignSchema(schemaObject: AssignSchemaOptions) {
  return (Target: any) => {
    Reflect.defineMetadata(SCHEMA_TOKEN, schemaObject, Target);
    return Target;
  };
}

export class Schema {
  public static resolve(Target: Function) {
    if (!Reflect.hasMetadata(SCHEMA_TOKEN, Target)) {
      throw new Error(`Schema is not assigned for ${Target.name}`);
    }
    return Reflect.getMetadata(SCHEMA_TOKEN, Target);
  }
}
