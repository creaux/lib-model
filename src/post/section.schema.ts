import { Types } from 'mongoose';
import { BaseScheme } from '../schemas/base.schema';

export const SectionSchema = new BaseScheme(
  {
    _id: { type: Types.ObjectId },
    name: { type: String, intl: true },
  },
  {
    toJSON: {
      // To work with mongoose-intl
      virtuals: true,
    },
  },
);
