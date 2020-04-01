import { Types } from 'mongoose';
import { BaseScheme } from '../base.schema';

export const RoleSchema = new BaseScheme(
  {
    _id: { type: Types.ObjectId },
    name: { type: String, required: true, unique: true },
  },
  {
    versionKey: false,
    toJSON: {
      // To work with mongoose-intl
      virtuals: true,
    },
  },
);

export const ROLE_MODEL = 'Role';
