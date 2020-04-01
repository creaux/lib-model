import { Schema, Types } from 'mongoose';
import { BaseScheme } from '../base.schema';

import { Document } from 'mongoose';
import { SchemaName } from '../../enums/schema-name';

export interface AuthSchemaInterface extends Document {
  id?: string;
  user: string;
  token: string;
  createdAt?: string;
}

export const AuthSchema: Schema = new BaseScheme(
  {
    _id: Types.ObjectId,
    user: { type: Types.ObjectId, ref: SchemaName.USER },
    token: {
      type: String,
      unique: true,
    },
    createdAt: { type: Date, expires: 3600, default: Date.now },
  },
  {
    versionKey: false,
    toJSON: {
      virtuals: true,
    },
  },
);
