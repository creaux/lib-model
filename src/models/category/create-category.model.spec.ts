import { Validator } from 'class-validator';
import { CreateCategoryModel } from './create-category.model';
import { Injector } from '../../framework/injector';
import { Mockeries } from '../../framework/mockeries';

const { keys } = Object;

describe('CreateCategoryModel', () => {
  let categoryModel: CreateCategoryModel;
  let validator: Validator;
  let mockeries: Mockeries;

  beforeEach(() => {
    mockeries = Injector.resolve(Mockeries);
    mockeries.prepare<CreateCategoryModel>(CreateCategoryModel);
    categoryModel = mockeries.resolve(CreateCategoryModel);
    validator = new Validator();
  });

  afterEach(() => {
    mockeries.clean(CreateCategoryModel);
  });

  it('should raise error when name is not defined', async () => {
    const { name, ...props } = categoryModel;
    const model = new CreateCategoryModel({
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
    const model = new CreateCategoryModel({
      // @ts-ignore
      name: 123,
      ...props,
    });

    const validated = (await validator.validate(model))[0];

    expect(validated.property).toEqual('name');
    expect(keys(validated.constraints)).toEqual(['isString']);
  });
});
