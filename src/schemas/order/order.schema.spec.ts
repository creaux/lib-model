import { ORDER_MODEL, OrderSchema } from './order.schema';
import * as mongoose from 'mongoose';

describe('OrderSchema', () => {
  let ProductModel: mongoose.Model<mongoose.Document, {}>;
  let instance: any;

  beforeEach(() => {
    try {
      ProductModel = mongoose.model(ORDER_MODEL);
    } catch (error) {
      ProductModel = mongoose.model(ORDER_MODEL, OrderSchema);
    }
  });

  it('products should be ObjectId string', () => {
    instance = new ProductModel({ user: '5e175a8890ba3efd65bdcb4e', products: ['abc'] });
    const validated = instance.validateSync();
    expect(validated.errors['products'].message).toEqual(
      'Cast to Array failed for value "[ \'abc\' ]" at path "products"',
    );
  });

  it('user is required', () => {
    instance = new ProductModel({ user: undefined });
    const validated = instance.validateSync();
    expect(validated.errors['user'].message).toEqual('Path `user` is required.');
  });

  it('user should be ObjectID string', () => {
    instance = new ProductModel({ user: 'abc' });
    const validated = instance.validateSync();
    expect(validated.errors['user'].message).toEqual('Cast to ObjectID failed for value "abc" at path "user"');
  });
});
