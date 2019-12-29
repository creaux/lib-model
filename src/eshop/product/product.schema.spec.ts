import { PRODUCT_MODEL, ProductSchema } from './product.schema';
import * as mongoose from 'mongoose';

describe('ProductSchema', () => {
  let ProductModel: mongoose.Model<mongoose.Document, {}>;
  let instance: any;

  beforeEach(() => {
    try {
      ProductModel = mongoose.model(PRODUCT_MODEL);
    } catch (error) {
      ProductModel = mongoose.model(PRODUCT_MODEL, ProductSchema);
    }
  });

  it('title is required', () => {
    instance = new ProductModel({ title: undefined });
    const validated = instance.validateSync();
    expect(validated.errors['title']).toBeTruthy();
  });

  it('description is required', () => {
    instance = new ProductModel({ description: undefined });
    const validated = instance.validateSync();
    expect(validated.errors['description']).toBeTruthy();
  });

  it('images are required', () => {
    instance = new ProductModel({ images: undefined });
    const validated = instance.validateSync();
    expect(validated.errors['images']).toBeTruthy();
  });

  it('images length has to be more than 0', () => {
    instance = new ProductModel({ images: [] });
    const validated = instance.validateSync();
    expect(validated.errors['images'].message).toEqual('Required one image by minimum');
  });

  it('images has to have required props', () => {
    instance = new ProductModel({ images: [{}], title: 'string', description: 'string' });
    const validated = instance.validateSync();
    expect(validated.errors['images.0.alt'].message).toEqual('Path `alt` is required.');
    expect(validated.errors['images.0.src'].message).toEqual('Path `src` is required.');
  });

  it('price has to be defined', () => {
    instance = new ProductModel({ price: undefined });
    const validated = instance.validateSync();
    expect(validated.errors['price'].message).toEqual('Path `price` is required.');
  });

  it('price has to be of type Number', () => {
    instance = new ProductModel({ price: 'abc' });
    const validated = instance.validateSync();
    expect(validated.errors['price'].message).toEqual('Cast to Number failed for value "abc" at path "price"');
  });

  it('_id has to be ObjectId', () => {
    instance = new ProductModel({ _id: 'abc' });
    const validated = instance.validateSync();
    expect(validated.errors['_id'].message).toEqual('Cast to ObjectID failed for value "abc" at path "_id"');
  });
});
