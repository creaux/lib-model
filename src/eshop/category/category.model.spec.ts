import { Validator } from 'class-validator';
import { CategoryModel } from './category.model';
import { MOCK_TOKEN } from '../../common/mockerizer.decorator';

const { keys } = Object;

describe('CategoryModel', () => {
  let categoryModel: CategoryModel;
  let validator: Validator;
  let Mock: any;

  beforeEach(() => {
    Mock = Reflect.getMetadata(MOCK_TOKEN, CategoryModel);

    categoryModel = new Mock();
    validator = new Validator();
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
