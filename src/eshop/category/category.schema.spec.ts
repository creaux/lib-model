import { CATEGORY_MODEL, CategorySchema } from './category.schema';
import * as mongoose from 'mongoose';

describe('CategorySchema', () => {
  let CategoryModel: mongoose.Model<mongoose.Document, {}>;
  let instance: any;

  beforeEach(() => {
    try {
      CategoryModel = mongoose.model(CATEGORY_MODEL);
    } catch (error) {
      CategoryModel = mongoose.model(CATEGORY_MODEL, CategorySchema);
    }
  });

  it('user is required', () => {
    instance = new CategoryModel({ name: undefined });
    const validated = instance.validateSync();
    expect(validated.errors['name'].message).toEqual('Path `name` is required.');
  });
});
