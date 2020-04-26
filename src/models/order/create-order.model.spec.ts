import { Validator } from 'class-validator';
import { CreateOrderModel } from './create-order.model';
import { Injector } from '../../framework/injector';
import { Mockeries } from '../../framework/mockeries';

const { keys } = Object;

describe('CreateOrderModel', () => {
  let createOrderModel: CreateOrderModel;
  let validator: Validator;
  let mockeries: Mockeries;

  beforeEach(() => {
    mockeries = Injector.resolve(Mockeries);
    mockeries.prepare<CreateOrderModel>(CreateOrderModel);
    createOrderModel = mockeries.resolve(CreateOrderModel);
    validator = new Validator();
  });

  afterEach(() => {
    mockeries.clean(CreateOrderModel);
  });

  it('should raise error when products are not array', async () => {
    const { products, ...props } = createOrderModel;
    const model = new CreateOrderModel({
      // @ts-ignore
      products: undefined,
      ...props,
    });

    const validated = (await validator.validate(model))[0];

    expect(validated.property).toEqual('products');
    expect(keys(validated.constraints)).toEqual(['isDefined', 'arrayNotEmpty', 'isArray']);
  });

  it('should raise error when products are empty', async () => {
    const { products, ...props } = createOrderModel;
    const model = new CreateOrderModel({
      // @ts-ignore
      products: [],
      ...props,
    });

    const validated = (await validator.validate(model))[0];

    expect(validated.property).toEqual('products');
    expect(keys(validated.constraints)).toEqual(['arrayNotEmpty']);
  });

  it('should raise error when products are not array of mongo ids', async () => {
    const { products, ...props } = createOrderModel;
    const model = new CreateOrderModel({
      // @ts-ignore
      products: [123],
      ...props,
    });

    const validated = (await validator.validate(model))[0];

    expect(validated.property).toEqual('products');
    expect(keys(validated.constraints)).toEqual(['isMongoId']);
  });
});
