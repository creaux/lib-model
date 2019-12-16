import 'reflect-metadata';
import { Validator } from 'class-validator';
import test from 'ava';
import { CreateProductModel } from './create-product.model';
import { MOCK_TOKEN } from '../../common/mockerizer.decorator';
import { ImageModel } from '../..';

const { keys } = Object;

let productModel: CreateProductModel;
let validator: Validator;
let Mock: any;

test.before(() => {
  Mock = Reflect.getMetadata(MOCK_TOKEN, CreateProductModel);

  productModel = new Mock();
  validator = new Validator();
});

test('should raise error when title is defined', async t => {
  const { title, ...props } = productModel;
  const model = new CreateProductModel({
    // @ts-ignore
    title: undefined,
    ...props,
  });

  // console.log('REFLECT:', Reflect.getMetadata('something', model, 'title'));

  const validated = (await validator.validate(model))[0];

  t.is(validated.property, 'title');
  t.deepEqual(keys(validated.constraints), ['isDefined', 'length', 'isString']);
});

test('should raise error when title is not string', async t => {
  const { title, ...props } = productModel;
  const model = new CreateProductModel({
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
  const model = new CreateProductModel({
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
  const model = new CreateProductModel({
    // @ts-ignore
    description: undefined,
    ...props,
  });

  const validated = (await validator.validate(model))[0];

  t.is(validated.property, 'description');
  t.deepEqual(keys(validated.constraints), ['isDefined', 'length', 'isString']);
});

test('should raise error when description is not string', async t => {
  const { description, ...props } = productModel;
  const model = new CreateProductModel({
    // @ts-ignore
    description: 123,
    ...props,
  });

  const validated = (await validator.validate(model))[0];

  t.is(validated.property, 'description');
  t.deepEqual(keys(validated.constraints), ['length', 'isString']);
});

test('should raise error when images are not defined', async t => {
  const { images, ...props } = productModel;
  const model = new CreateProductModel({
    // @ts-ignore
    images: undefined,
    ...props,
  });
  const validated = (await validator.validate(model))[0];
  t.is(validated.property, 'images');
  t.deepEqual(keys(validated.constraints), ['isDefined', 'arrayNotEmpty', 'isArray']);
});

test("should raise error when images don't have at least one member", async t => {
  const { images, ...props } = productModel;
  const model = new CreateProductModel({
    images: [],
    ...props,
  });
  const validated = (await validator.validate(model))[0];
  t.is(validated.property, 'images');
  t.deepEqual(keys(validated.constraints), ['arrayNotEmpty']);
});

test("should raise error when images don't have ImageModel member", async t => {
  const { images, ...props } = productModel;
  const model = new CreateProductModel({
    // @ts-ignore
    images: ['123'],
    ...props,
  });
  const validated = (await validator.validate(model))[0];
  t.is(validated.property, 'images');
  t.deepEqual(keys(validated.constraints), ['isInstance']);
});

test('should raise error when images are not valid urls', async t => {
  const { images, ...props } = productModel;
  const model = new CreateProductModel({
    images: [new ImageModel({ src: 'abc', alt: 'Some description' })],
    ...props,
  });
  const validated = (await validator.validate(model))[0];
  t.is(validated.property, 'images');
  t.is(validated.children[0].property, '0');
  t.is(validated.children[0].children[0].property, 'src');
  t.deepEqual(keys(validated.children[0].children[0].constraints), ['isUrl']);
});

test('should raise error when price is not defined', async t => {
  const { price, ...props } = productModel;
  const model = new CreateProductModel({
    // @ts-ignore
    price: undefined,
    ...props,
  });
  const validated = (await validator.validate(model))[0];
  t.is(validated.property, 'price');
  t.deepEqual(keys(validated.constraints), ['isDefined', 'isNumber']);
});

test('should raise error when price is not valid', async t => {
  const { price, ...props } = productModel;
  const model = new CreateProductModel({
    // @ts-ignore
    price: 'abc',
    ...props,
  });
  const validated = (await validator.validate(model))[0];
  t.is(validated.property, 'price');
  t.deepEqual(keys(validated.constraints), ['isNumber']);
});
