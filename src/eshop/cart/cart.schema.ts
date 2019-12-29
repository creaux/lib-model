import { BaseScheme } from '../../schemas/base.schema';
import { Document, Types } from 'mongoose';
import { CartModel } from './cart.model';
import { PRODUCT_MODEL } from '../product';
import { USER_MODEL } from '../../user';

export const CART_MODEL = 'Carts';

export type CartSchema = CartModel & Document;

export const CartSchema = new BaseScheme({
  _id: { type: Types.ObjectId },
  products: [
    {
      type: Types.ObjectId,
      ref: PRODUCT_MODEL,
    },
  ],
  user: {
    type: Types.ObjectId,
    ref: USER_MODEL,
    required: true,
  },
});
