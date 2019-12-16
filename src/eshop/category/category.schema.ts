import { BaseScheme } from '../../schemas/base.schema';
import { CategoryModel } from './category.model';
import { Document } from 'mongoose';

export const CATEGORY_MODEL = 'Categories';

export type CategorySchema = CategoryModel & Document;

export const CategorySchema = new BaseScheme(
  {
    name: { type: String, unique: true, required: true },
  },
  {
    versionKey: false,
    toJSON: {
      // To work with mongoose-intl
      virtuals: true,
    },
  },
);
