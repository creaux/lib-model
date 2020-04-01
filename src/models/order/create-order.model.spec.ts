import { Validator } from 'class-validator';
import { CreateOrderModel } from './create-order.model';
import { Injector } from '../../framework/injector';
import { MockeriesFiber } from '../../framework/preparator';

const { keys } = Object;

describe('CreateOrderModel', () => {
  let createOrderModel: CreateOrderModel;
  let validator: Validator;
  let fiber: MockeriesFiber;

  beforeEach(() => {
    fiber = Injector.resolve(MockeriesFiber);
    fiber.prepareMockeries(CreateOrderModel);
    createOrderModel = fiber.retrieveMockeries(CreateOrderModel);
    validator = new Validator();
  });

  afterEach(() => {
    fiber.cleanMockeries(CreateOrderModel);
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
