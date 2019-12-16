import { Validator } from 'class-validator';
import test from 'ava';
import { CategoryModel } from './category.model';
import { MOCK_TOKEN } from '../../common/mockerizer.decorator';

const { keys } = Object;

let categoryModel: CategoryModel;
let validator: Validator;
let Mock: any;

test.before(() => {
  Mock = Reflect.getMetadata(MOCK_TOKEN, CategoryModel);

  categoryModel = new Mock();
  validator = new Validator();
});

test('should raise error when name is not defined', async t => {
  const { name, ...props } = categoryModel;
  const model = new CategoryModel({
    // @ts-ignore
    name: undefined,
    ...props,
  });

  const validated = (await validator.validate(model))[0];

  t.is(validated.property, 'name');
  t.deepEqual(keys(validated.constraints), ['isDefined', 'isString']);
});

test('should raise error when name is not string', async t => {
  const { name, ...props } = categoryModel;
  const model = new CategoryModel({
    // @ts-ignore
    name: 123,
    ...props,
  });

  const validated = (await validator.validate(model))[0];

  t.is(validated.property, 'name');
  t.deepEqual(keys(validated.constraints), ['isString']);
});
