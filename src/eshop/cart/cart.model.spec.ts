import { Validator } from 'class-validator';
import test from 'ava';
import { CartModel } from './cart.model';
import { MOCK_TOKEN } from '../../common/mockerizer.decorator';
import { ProductModel } from '../product';

const { keys } = Object;

let cartModelMap: CartModel;
let validator: Validator;
let Mock: any;

test.before(() => {
  Mock = Reflect.getMetadata(MOCK_TOKEN, CartModel);

  cartModelMap = new Mock() as CartModel;
  validator = new Validator();
});

test('should raise error when id is not defined', async t => {
  const { id, ...props } = cartModelMap;
  const model = new CartModel({
    // @ts-ignore
    id: undefined,
    ...props,
  });

  const validated = (await validator.validate(model))[0];

  t.is(validated.property, 'id');
  t.deepEqual(keys(validated.constraints), ['isDefined', 'isMongoId']);
});

test('should raise error when id is not mongo id', async t => {
  const { id, ...props } = cartModelMap;
  // @ts-ignore
  const model = new CartModel({
    // @ts-ignore
    id: 'abc',
    ...props,
  });

  const validated = (await validator.validate(model))[0];

  t.is(validated.property, 'id');
  t.deepEqual(keys(validated.constraints), ['isMongoId']);
});

test('should raise error when products are not defined', async t => {
  const { products, ...props } = cartModelMap;
  // @ts-ignore
  const model = new CartModel({
    // @ts-ignore
    products: undefined,
    ...props,
  });

  const validated = (await validator.validate(model))[0];

  t.is(validated.property, 'products');
  t.deepEqual(keys(validated.constraints), ['isDefined', 'isArray']);
});

test("should raise error when products don't contain product models", async t => {
  const { products, ...props } = cartModelMap;
  // @ts-ignore
  const model = new CartModel({
    // @ts-ignore
    products: ['abc'],
    ...props,
  });

  const validated = (await validator.validate(model))[0];

  t.is(validated.property, 'products');
  t.deepEqual(keys(validated.constraints), ['isInstance']);
});

test('should raise error when products are object', async t => {
  const { products, ...props } = cartModelMap;
  // @ts-ignore
  const model = new CartModel({
    // @ts-ignore
    products: {},
    ...props,
  });

  const validated = (await validator.validate(model))[0];

  t.is(validated.property, 'products');
  t.deepEqual(keys(validated.constraints), ['isArray']);
});

test('should raise error when products are not valid', async t => {
  const { products, ...props } = cartModelMap;
  const Mock = Reflect.getMetadata(MOCK_TOKEN, ProductModel);
  const { title, ...productModelMock } = new Mock();
  const productModel = { ...productModelMock, title: 123 };
  // @ts-ignore
  const model = new CartModel({
    // @ts-ignore
    products: [new ProductModel(productModel)],
    ...props,
  });

  const validated = (await validator.validate(model))[0];

  t.is(validated.property, 'products');
  t.is(validated.children[0].property, '0');
  t.is(validated.children[0].children[0].property, 'title');
  t.deepEqual(keys(validated.children[0].children[0].constraints), ['length', 'isString']);
});
