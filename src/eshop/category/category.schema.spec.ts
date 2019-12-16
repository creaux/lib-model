import test from 'ava';
import { CATEGORY_MODEL, CategorySchema } from './category.schema';
import * as mongoose from 'mongoose';

let CategoryModel: mongoose.Model<mongoose.Document, {}>;
let instance: any;

test.before(() => {
  try {
    CategoryModel = mongoose.model(CATEGORY_MODEL);
  } catch (error) {
    CategoryModel = mongoose.model(CATEGORY_MODEL, CategorySchema);
  }
});

test('user is required', t => {
  instance = new CategoryModel({ name: undefined });
  const validated = instance.validateSync();
  t.is(validated.errors['name'].message, 'Path `name` is required.');
});
