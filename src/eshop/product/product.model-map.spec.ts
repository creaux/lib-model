import { Validator } from 'class-validator';
import test from 'ava';
import { ProductInterface, ProductModelMap } from './product.model-map';

const { keys } = Object;

let productModel: ProductInterface;
let validator: Validator;

test.before(() => {
  productModel = ProductModelMap.MOCK_PROPERTIES;
  validator = new Validator();
});

test('should raise error when title is defined', async t => {
  const { title, ...props } = productModel;
  const model = new ProductModelMap({
    // @ts-ignore
    title: undefined,
    ...props,
  });

  const validated = (await validator.validate(model))[0];

  t.is(validated.property, 'title');
  t.deepEqual(keys(validated.constraints), ['isDefined', 'length', 'isString']);
});

test('should raise error when title is not string', async t => {
  const { title, ...props } = productModel;
  const model = new ProductModelMap({
    // @ts-ignore
    title: 123,
    ...props,
  });

  const validated = (await validator.validate(model))[0];

  t.is(validated.property, 'title');
  t.deepEqual(keys(validated.constraints), ['length', 'isString']);
});

test('should raise error when title is not of required length', async t => {
  const { title, ...props } = productModel;
  const model = new ProductModelMap({
    // @ts-ignore
    title: '',
    ...props,
  });

  const validated = (await validator.validate(model))[0];

  t.is(validated.property, 'title');
  t.deepEqual(keys(validated.constraints), ['length']);
});

test('should raise error when description is not defined', async t => {
  const { description, ...props } = productModel;
  const model = new ProductModelMap({
    // @ts-ignore
    description: undefined,
    ...props,
  });

  const validated = (await validator.validate(model))[0];

  t.is(validated.property, 'description');
  t.deepEqual(keys(validated.constraints), ['isDefined', 'isString']);
});

test('should raise error when description is not string', async t => {
  const { description, ...props } = productModel;
  const model = new ProductModelMap({
    // @ts-ignore
    description: 123,
    ...props,
  });

  const validated = (await validator.validate(model))[0];

  t.is(validated.property, 'description');
  t.deepEqual(keys(validated.constraints), ['isString']);
});

test('should raise error when images are not defined', async t => {
  const { images, ...props } = productModel;
  const model = new ProductModelMap({
    // @ts-ignore
    images: new Set([undefined]),
    ...props,
  });
  const validated = (await validator.validate(model))[0];
  t.deepEqual(keys(validated.constraints), ['isDefined', 'length', 'isUrl']);
});

test("should raise error when images don't have at least one member", async t => {
  const { images, ...props } = productModel;
  const model = new ProductModelMap({
    images: new Set([]),
    ...props,
  });
  const validated = (await validator.validate(model))[0];
  t.deepEqual(keys(validated.constraints), ['length']);
});

test('should raise error when images are not valid urls', async t => {
  const { images, ...props } = productModel;
  const model = new ProductModelMap({
    images: new Set(['abc']),
    ...props,
  });
  const validated = (await validator.validate(model))[0];
  t.deepEqual(keys(validated.constraints), ['length', 'isUrl']);
});

test('should raise error when price is not defined', async t => {
  const { price, ...props } = productModel;
  const model = new ProductModelMap({
    // @ts-ignore
    price: undefined,
    ...props,
  });
  const validated = (await validator.validate(model))[0];
  t.deepEqual(keys(validated.constraints), ['length']);
});

test('should raise error when price is not valid', async t => {
  const { price, ...props } = productModel;
  const model = new ProductModelMap({
    // @ts-ignore
    price: 'abc',
    ...props,
  });
  const validated = (await validator.validate(model))[0];
  t.deepEqual(keys(validated.constraints), ['length']);
});
