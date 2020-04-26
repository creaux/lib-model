import { OrderModel } from '../../models/order/order.model';
import { Document, Types } from 'mongoose';
import { BaseScheme } from '../base.schema';
import { OrderProcess } from '../../enums/order-process.enum';
import { PRODUCT_MODEL } from '../product/product.schema';
import { SchemaName } from '../../enums/schema-name';

export const ORDER_MODEL = 'Order';

export type OrderSchema = OrderModel & Document;

export const OrderSchema = new BaseScheme(
  {
    _id: { type: Types.ObjectId },
    products: [{ type: Types.ObjectId, ref: SchemaName.PRODUCT }],
    user: { type: Types.ObjectId, ref: SchemaName.USER, required: true },
    createdAt: { type: Date, required: true },
    process: {
      type: String,
      enum: [...Object.values(OrderProcess)],
      default: OrderProcess.UNPAID,
      required: true,
    },
    payment: {
      type: [
        new BaseScheme({
          paymentId: { type: String, required: true },
          secret: { type: String, required: true },
          createdAt: { type: Date, required: true, default: Date.now },
        }),
      ],
      required: true,
      expires: 60 * 60 * 24,
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
