import { Document } from 'mongoose';
import { BaseScheme } from '../base.schema';
import { CategoryModel } from '../../models/category/category.model';

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
