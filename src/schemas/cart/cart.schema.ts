import { BaseScheme } from '../base.schema';
import { Document, Types } from 'mongoose';
import { CartModel } from '../../models/cart/cart.model';
import { PRODUCT_MODEL } from '../product/product.schema';
import { SchemaName } from '../../enums/schema-name';

export const CART_MODEL = 'Carts';

export type CartSchema = CartModel & Document;

export const CartSchema = new BaseScheme({
  _id: { type: Types.ObjectId },
  products: [
    {
      type: Types.ObjectId,
      ref: SchemaName.PRODUCT,
    },
  ],
  user: {
    type: Types.ObjectId,
    ref: SchemaName.USER,
    required: true,
  },
});
