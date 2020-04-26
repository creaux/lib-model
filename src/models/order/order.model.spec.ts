import 'reflect-metadata';
import { Validator } from 'class-validator';
import { OrderModel } from './order.model';
import { Injector } from '../../framework/injector';
import { UserModel } from '../user/user.model';
import { L10nModel } from '../l10n/l10n.model';
import { RoleModel } from '../role/role.model';
import { Mockeries } from '../../framework/mockeries';

const { keys } = Object;

describe('OrderModel', () => {
  let orderModel: OrderModel;
  let validator: Validator;
  let mockeries: Mockeries;

  beforeEach(() => {
    mockeries = Injector.resolve(Mockeries);
    mockeries.prepare<RoleModel>(RoleModel);
    mockeries.prepare<L10nModel>(L10nModel);
    mockeries.prepare<OrderModel>(OrderModel);
    orderModel = mockeries.resolve<OrderModel>(OrderModel);
    validator = new Validator();
  });

  afterEach(() => {
    mockeries.clean(RoleModel);
    mockeries.clean(L10nModel);
    mockeries.clean(OrderModel);
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
    mockeries.prepare(UserModel);
    const { forname, ...userProps } = mockeries.resolve(UserModel);
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
