import { Validator } from 'class-validator';
import test from 'ava';
import { OrderModel } from './order.model';
import { MOCK_TOKEN } from '../../common/mockerizer.decorator';
import { UserModel } from '../../user';

const { keys } = Object;

let orderModel: OrderModel;
let validator: Validator;
let Mock: any;

test.before(() => {
  Mock = Reflect.getMetadata(MOCK_TOKEN, OrderModel);
  orderModel = new Mock();
  validator = new Validator();
});

test('should raise error when id is undefined', async t => {
  const { id, ...props } = orderModel;
  const model = new OrderModel({
    // @ts-ignore
    id: undefined,
    ...props,
  });

  const validated = (await validator.validate(model))[0];

  t.is(validated.property, 'id');
  t.deepEqual(keys(validated.constraints), ['isDefined', 'isMongoId']);
});

test('should raise error when id is not mongo object id', async t => {
  const { id, ...props } = orderModel;
  const model = new OrderModel({
    // @ts-ignore
    id: 'abc',
    ...props,
  });

  const validated = (await validator.validate(model))[0];

  t.is(validated.property, 'id');
  t.deepEqual(keys(validated.constraints), ['isMongoId']);
});

test('should raise error when user is undefined', async t => {
  const { user, ...props } = orderModel;
  const model = new OrderModel({
    // @ts-ignore
    user: undefined,
    ...props,
  });

  const validated = (await validator.validate(model))[0];

  t.is(validated.property, 'user');
  t.deepEqual(keys(validated.constraints), ['isDefined', 'isInstance']);
});

test('should raise error when user is not user model', async t => {
  const { user, ...props } = orderModel;
  const model = new OrderModel({
    // @ts-ignore
    user: 'abc',
    ...props,
  });

  const validated = (await validator.validate(model))[0];

  t.is(validated.property, 'user');
  t.deepEqual(keys(validated.constraints), ['isInstance']);
});

test('should raise error when user is user model with incorrect fields', async t => {
  const { user, ...props } = orderModel;
  const { forname, ...userProps } = UserModel.MOCK_PROPERTIES;
  const model = new OrderModel({
    // @ts-ignore
    user: new UserModel({ ...userProps, forname: 123 }),
    ...props,
  });

  const validated = (await validator.validate(model))[0];

  t.is(validated.property, 'user');
  t.is(validated.children[0].property, 'forname');
  t.deepEqual(keys(validated.children[0].constraints), ['isString']);
});
