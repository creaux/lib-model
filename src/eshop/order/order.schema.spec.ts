import test from 'ava';
import { ORDER_MODEL, OrderSchema } from './order.schema';
import * as mongoose from 'mongoose';

let ProductModel: mongoose.Model<mongoose.Document, {}>;
let instance: any;

test.before(() => {
  try {
    ProductModel = mongoose.model(ORDER_MODEL);
  } catch (error) {
    ProductModel = mongoose.model(ORDER_MODEL, OrderSchema);
  }
});

test.skip('products are required', t => {
  instance = new ProductModel({ products: [] });
  const validated = instance.validateSync();
  t.truthy(validated.errors['products']);
});

test('user is required', t => {
  instance = new ProductModel({ user: undefined });
  const validated = instance.validateSync();
  t.is(validated.errors['user'].message, 'Path `user` is required.');
});
