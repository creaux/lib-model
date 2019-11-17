import { Types } from 'mongoose';
import { BaseScheme } from '../schemas/base.schema';

export const AccessSchema = new BaseScheme(
  {
    _id: { type: Types.ObjectId },
    role: [{ type: String }],
    resource: [{ type: String }],
    attributes: [{ type: String }],
    action: { type: String },
    possession: { type: String },
    denied: { type: Boolean },
  },
  {
    versionKey: false,
    toJSON: {
      // To work with mongoose-intl
      virtuals: true,
    },
  },
);

export const ACCESS_MODEL = 'access';
