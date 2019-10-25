import { Schema, Types } from 'mongoose';
import { BaseScheme } from '../schemas/base.schema';

export const AuthSchema: Schema = new BaseScheme(
  {
    _id: Types.ObjectId,
    userId: { type: Types.ObjectId },
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
