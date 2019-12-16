import { Validator } from 'class-validator';
import test from 'ava';
import { CreateOrderModel } from './create-order.model';
import { MOCK_TOKEN } from '../../common/mockerizer.decorator';

const { keys } = Object;

let createOrderModel: CreateOrderModel;
let validator: Validator;
let Mock: any;

test.before(() => {
  Mock = Reflect.getMetadata(MOCK_TOKEN, CreateOrderModel);

  createOrderModel = new Mock();
  validator = new Validator();
});

test('should raise error when user is undefined', async t => {
  const { user, ...props } = createOrderModel;
  const model = new CreateOrderModel({
    // @ts-ignore
    user: undefined,
    ...props,
  });

  const validated = (await validator.validate(model))[0];

  t.is(validated.property, 'user');
  t.deepEqual(keys(validated.constraints), ['isDefined', 'isMongoId']);
});

test('should raise error when user is not mongo id', async t => {
  const { user, ...props } = createOrderModel;
  const model = new CreateOrderModel({
    // @ts-ignore
    user: 'abc',
    ...props,
  });

  const validated = (await validator.validate(model))[0];

  t.is(validated.property, 'user');
  t.deepEqual(keys(validated.constraints), ['isMongoId']);
});

test('should raise error when products are not array', async t => {
  const { products, ...props } = createOrderModel;
  const model = new CreateOrderModel({
    // @ts-ignore
    products: undefined,
    ...props,
  });

  const validated = (await validator.validate(model))[0];

  t.is(validated.property, 'products');
  t.deepEqual(keys(validated.constraints), ['arrayNotEmpty', 'isArray']);
});

test('should raise error when products are empty', async t => {
  const { products, ...props } = createOrderModel;
  const model = new CreateOrderModel({
    // @ts-ignore
    products: [],
    ...props,
  });

  const validated = (await validator.validate(model))[0];

  t.is(validated.property, 'products');
  t.deepEqual(keys(validated.constraints), ['arrayNotEmpty']);
});

test('should raise error when products are not array of mongo ids', async t => {
  const { products, ...props } = createOrderModel;
  const model = new CreateOrderModel({
    // @ts-ignore
    products: [123],
    ...props,
  });

  const validated = (await validator.validate(model))[0];

  t.is(validated.property, 'products');
  t.deepEqual(keys(validated.constraints), ['isMongoId']);
});
