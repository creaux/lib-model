import { Validator } from 'class-validator';
import { CategoryModel } from './category.model';
import { MockeriesFiber } from '../../framework/preparator';
import { Injector } from '../../framework/injector';

const { keys } = Object;

describe('CategoryModel', () => {
  let categoryModel: CategoryModel;
  let validator: Validator;
  let Mock: any;
  let fiber: MockeriesFiber;

  beforeEach(() => {
    fiber = Injector.resolve(MockeriesFiber);
    fiber.prepareMockeries(CategoryModel);
    categoryModel = fiber.retrieveMockeries(CategoryModel);
    validator = new Validator();
  });

  afterEach(() => {
    fiber.cleanMockeries(CategoryModel);
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
