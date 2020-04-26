import { Validator } from 'class-validator';
import { CategoryModel } from './category.model';
import { Injector } from '../../framework/injector';
import { Mockeries } from '../../framework/mockeries';

const { keys } = Object;

describe('CategoryModel', () => {
  let categoryModel: CategoryModel;
  let validator: Validator;
  let mockeries: Mockeries;

  beforeEach(() => {
    mockeries = Injector.resolve(Mockeries);
    mockeries.prepare<CategoryModel>(CategoryModel);
    categoryModel = mockeries.resolve<CategoryModel>(CategoryModel);
    validator = new Validator();
  });

  afterEach(() => {
    mockeries.clean(CategoryModel);
  });

  it('should raise error when name is not defined', async () => {
    const { name, ...props } = categoryModel;
    const model = new CategoryModel({
      // @ts-ignore
      name: undefined,
      ...props,
    });

    const validated = (await validator.validate(model))[0];

    expect(validated.property).toEqual('name');
    expect(keys(validated.constraints)).toEqual(['isDefined', 'isString']);
  });

  it('should raise error when name is not string', async () => {
    const { name, ...props } = categoryModel;
    const model = new CategoryModel({
      // @ts-ignore
      name: 123,
      ...props,
    });

    const validated = (await validator.validate(model))[0];

    expect(validated.property).toEqual('name');
    expect(keys(validated.constraints)).toEqual(['isString']);
  });
});
