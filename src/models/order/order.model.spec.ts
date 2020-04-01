import 'reflect-metadata';
import { Validator } from 'class-validator';
import { OrderModel } from './order.model';
import { MockeriesFiber } from '../../framework/preparator';
import { Injector } from '../../framework/injector';
import { UserModel } from '../user/user.model';
import { L10nModel } from '../l10n/l10n.model';
import { RoleModel } from '../role/role.model';

const { keys } = Object;

describe('OrderModel', () => {
  let orderModel: OrderModel;
  let validator: Validator;
  let Mock: any;
  let fiber: MockeriesFiber;

  beforeEach(() => {
    fiber = Injector.resolve(MockeriesFiber);
    fiber.prepareMockeries(RoleModel);
    fiber.prepareMockeries(L10nModel);
    fiber.prepareMockeries(OrderModel);
    orderModel = fiber.retrieveMockeries(OrderModel);
    validator = new Validator();
  });

  afterEach(() => {
    fiber.cleanMockeries(RoleModel);
    fiber.cleanMockeries(L10nModel);
    fiber.cleanMockeries(OrderModel);
  });

  it('should raise error when id is undefined', async () => {
    const { id, ...props } = orderModel;
    const model = new OrderModel({
      // @ts-ignore
      id: undefined,
      ...props,
    });

    const validated = (await validator.validate(model))[0];

    expect(validated.property).toEqual('id');
    expect(keys(validated.constraints)).toEqual(['isDefined', 'isMongoId']);
  });

  it('should raise error when id is not mongo object id', async () => {
    const { id, ...props } = orderModel;
    const model = new OrderModel({
      // @ts-ignore33
      id: 'abc',
      ...props,
    });

    const validated = (await validator.validate(model))[0];

    expect(validated.property).toEqual('id');
    expect(keys(validated.constraints)).toEqual(['isMongoId']);
  });

  it('should raise error when user is undefined', async () => {
    const { user, ...props } = orderModel;
    const model = new OrderModel({
      // @ts-ignore
      user: undefined,
      ...props,
    });

    const validated = (await validator.validate(model))[0];

    expect(validated.property).toEqual('user');
    expect(keys(validated.constraints)).toEqual(['isDefined', 'isInstance']);
  });

  it('should raise error when user is not user model', async () => {
    const { user, ...props } = orderModel;
    const model = new OrderModel({
      // @ts-ignore
      user: 'abc',
      ...props,
    });

    const validated = (await validator.validate(model))[0];

    expect(validated.property).toEqual('user');
    expect(keys(validated.constraints)).toEqual(['isInstance']);
  });

  it('should raise error when user is user model with incorrect fields', async () => {
    const { user, ...props } = orderModel;
    fiber.prepareMockeries(UserModel);
    const { forname, ...userProps } = fiber.retrieveMockeries(UserModel);
    const model = new OrderModel({
      // @ts-ignore
      user: new UserModel({ ...userProps, forname: 123 }),
      ...props,
    });

    const validated = (await validator.validate(model))[0];

    expect(validated.property).toEqual('user');
    expect(validated.children[0].property).toEqual('forname');
    expect(keys(validated.children[0].constraints)).toEqual(['isString']);
  });
});
