import { Schema, Types } from 'mongoose';
import { BaseScheme } from '../schemas/base.schema';
import { USER_MODEL } from '../user';

export const AuthSchema: Schema = new BaseScheme(
  {
    _id: Types.ObjectId,
    user: { type: Types.ObjectId, ref: USER_MODEL },
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
