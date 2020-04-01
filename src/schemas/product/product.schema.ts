import { BaseScheme } from '../base.schema';
import { Types, Document } from 'mongoose';
import { ProductModel } from '../../models/product/product.model';
import { LocationEnum } from '../../enums/location.enum';

export const PRODUCT_MODEL = 'Product';

export type ProductSchema = ProductModel & Document;

export const ProductSchema = new BaseScheme(
  {
    _id: { type: Types.ObjectId, required: true },
    title: { type: String, intl: true, required: true },
    description: { type: String, intl: true, required: true },
    images: {
      type: [
        new BaseScheme({
          src: { type: String, required: true },
          alt: { type: String, required: true },
        }),
      ],
      required: true,
      validate: [value => value.length > 0, 'Required one image by minimum'],
    },
    prices: {
      type: [
        new BaseScheme({
          value: { type: Number, required: true },
          country: { type: String, required: true, enum: [...Object.values(LocationEnum)] },
        }),
      ],
      required: true,
      validate: [value => value.length > 0, 'Required one price by minimum'],
    },
  },
  {
    versionKey: false,
    toJSON: {
      // To work with mongoose-intl
      virtuals: true,
    },
  },
);
