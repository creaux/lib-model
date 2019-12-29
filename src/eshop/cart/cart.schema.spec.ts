import { CART_MODEL, CartSchema } from './cart.schema';
import * as mongoose from 'mongoose';

describe('CartSchema', () => {
  let CartModel: mongoose.Model<mongoose.Document, {}>;
  let instance: any;

  beforeEach(() => {
    try {
      CartModel = mongoose.model(CART_MODEL);
    } catch (error) {
      CartModel = mongoose.model(CART_MODEL, CartSchema);
    }
  });

  it('user is required', () => {
    instance = new CartModel({ user: undefined });
    const validated = instance.validateSync();
    expect(validated.errors['user'].message).toEqual('Path `user` is required.');
  });

  it('user should be ObjectId string', () => {
    instance = new CartModel({ user: 'abc' });
    const validated = instance.validateSync();
    expect(validated.errors['user'].message).toEqual('Cast to ObjectID failed for value "abc" at path "user"');
  });

  it('products should be ObjectId string', () => {
    instance = new CartModel({ user: 'abc', products: ['abc'] });
    const validated = instance.validateSync();
    expect(validated.errors['products'].message).toEqual(
      'Cast to Array failed for value "[ \'abc\' ]" at path "products"',
    );
  });

  it('_id has to be ObjectId', () => {
    instance = new CartModel({ _id: 'abc', user: '5e16031bdaf55d4b35a1c92a' });
    const validated = instance.validateSync();
    expect(validated.errors['_id'].message).toEqual('Cast to ObjectID failed for value "abc" at path "_id"');
  });
});
