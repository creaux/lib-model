import { BaseScheme } from '../base.schema';
import { Types } from 'mongoose';
import { SchemaName } from '../../enums/schema-name';

export const PostSchema = new BaseScheme(
  {
    _id: { type: Types.ObjectId },
    title: { type: String, intl: true },
    subtitle: { type: String, intl: true },
    content: { type: String, intl: true },
    state: { type: String, intl: true },
    slug: { type: String, intl: true },
    labels: { type: [String] }, // FIXME: Cannot use for Array
    createdAt: { type: Date },
    updatedAt: { type: Date },
    image: { type: String },
    createdBy: { type: Types.ObjectId, ref: SchemaName.USER },
    updatedBy: { type: Types.ObjectId, ref: SchemaName.USER },
    section: { type: Types.ObjectId, ref: SchemaName.SECTION },
  },
  {
    versionKey: false,
    toJSON: {
      // To work with mongoose-intl
      virtuals: true,
    },
  },
);
