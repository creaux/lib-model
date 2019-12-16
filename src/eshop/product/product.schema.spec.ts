import test from 'ava';
import { PRODUCT_MODEL, ProductSchema } from './product.schema';
import * as mongoose from 'mongoose';

let ProductModel: mongoose.Model<mongoose.Document, {}>;
let instance: any;

test.before(() => {
  try {
    ProductModel = mongoose.model(PRODUCT_MODEL);
  } catch (error) {
    ProductModel = mongoose.model(PRODUCT_MODEL, ProductSchema);
  }
});

test('title is required', t => {
  instance = new ProductModel({ title: undefined });
  const validated = instance.validateSync();
  t.truthy(validated.errors['title']);
});

test('description is required', t => {
  instance = new ProductModel({ description: undefined });
  const validated = instance.validateSync();
  t.truthy(validated.errors['description']);
});

test('images are required', t => {
  instance = new ProductModel({ images: undefined });
  const validated = instance.validateSync();
  t.truthy(validated.errors['images']);
});

test('images length has to be more than 0', t => {
  instance = new ProductModel({ images: [] });
  const validated = instance.validateSync();
  t.is(validated.errors['images'].message, 'Required one image by minimum');
});

test('images has to have required props', t => {
  instance = new ProductModel({ images: [{}], title: 'string', description: 'string' });
  const validated = instance.validateSync();
  t.is(validated.errors['images.0.alt'].message, 'Path `alt` is required.');
  t.is(validated.errors['images.0.src'].message, 'Path `src` is required.');
});

test('price has to be defined', t => {
  instance = new ProductModel({ price: undefined });
  const validated = instance.validateSync();
  t.is(validated.errors['price'].message, 'Path `price` is required.');
});

test('price has to be of type Number', t => {
  instance = new ProductModel({ price: 'abc' });
  const validated = instance.validateSync();
  t.is(validated.errors['price'].message, 'Cast to Number failed for value "abc" at path "price"');
});

test('_id has to be ObjectId', t => {
  instance = new ProductModel({ _id: 'abc' });
  const validated = instance.validateSync();
  t.is(validated.errors['_id'].message, 'Cast to ObjectID failed for value "abc" at path "_id"');
});
