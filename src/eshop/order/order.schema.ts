import { OrderModel } from './order.model';
import { Document, Types } from 'mongoose';
import { BaseScheme } from '../../schemas/base.schema';
import { PRODUCT_MODEL } from '../product';
import { USER_MODEL } from '../../user';

export const ORDER_MODEL = 'Orders';

export type OrderSchema = OrderModel & Document;

export const OrderSchema = new BaseScheme(
  {
    _id: { type: Types.ObjectId },
    products: {
      type: [
        {
          type: Types.ObjectId,
          ref: PRODUCT_MODEL,
        },
      ],
      required: true,
    },
    user: { type: Types.ObjectId, ref: USER_MODEL, required: true },
  },
  {
    versionKey: false,
    toJSON: {
      // To work with mongoose-intl
      virtuals: true,
    },
  },
);
