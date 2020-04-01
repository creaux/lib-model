import { Validator } from 'class-validator';
import { CartModel } from './cart.model';
import { ProductModel } from '../product/product.model';
import { Injector } from '../../framework/injector';
import { MockeriesFiber } from '../../framework/preparator';
import { UserModel } from '../user/user.model';
import { L10nModel } from '../l10n/l10n.model';
import { RoleModel } from '../role/role.model';

const { keys } = Object;

describe('CartModel', () => {
  let cartModelMap: CartModel;
  let validator: Validator;
  let fiber: MockeriesFiber;

  beforeEach(() => {
    fiber = Injector.resolve(MockeriesFiber);
    fiber.prepareMockeries(RoleModel);
    fiber.prepareMockeries(L10nModel);
    fiber.prepareMockeries(UserModel);
    fiber.prepareMockeries(ProductModel);
    fiber.prepareMockeries(CartModel);
    cartModelMap = fiber.retrieveMockeries(CartModel);
    validator = new Validator();
  });

  afterEach(() => {
    fiber.cleanMockeries(RoleModel);
    fiber.cleanMockeries(L10nModel);
    fiber.cleanMockeries(UserModel);
    fiber.cleanMockeries(ProductModel);
    fiber.cleanMockeries(CartModel);
  });

  it('should raise error when id is not defined', async () => {
    const { id, ...props } = cartModelMap;
    const model = new CartModel({
      // @ts-ignore
      id: undefined,
      ...props,
    });

    const validated = (await validator.validate(model))[0];

    expect(validated.property).toEqual('id');
    expect(keys(validated.constraints)).toEqual(['isDefined', 'isMongoId']);
  });

  it('should raise error when id is not mongo id', async () => {
    const { id, ...props } = cartModelMap;
    // @ts-ignore
    const model = new CartModel({
      // @ts-ignore
      id: 'abc',
      ...props,
    });

    const validated = (await validator.validate(model))[0];

    expect(validated.property).toEqual('id');
    expect(keys(validated.constraints)).toEqual(['isMongoId']);
  });

  it('should raise error when products are not defined', async () => {
    const { products, ...props } = cartModelMap;
    // @ts-ignore
    const model = new CartModel({
      // @ts-ignore
      products: undefined,
      ...props,
    });

    const validated = (await validator.validate(model))[0];

    expect(validated.property).toEqual('products');
    expect(keys(validated.constraints)).toEqual(['isDefined', 'isArray']);
  });

  it("should raise error when products don't contain product models", async () => {
    const { products, ...props } = cartModelMap;
    // @ts-ignore
    const model = new CartModel({
      // @ts-ignore
      products: ['abc'],
      ...props,
    });

    const validated = (await validator.validate(model))[0];

    expect(validated.property).toEqual('products');
    expect(keys(validated.constraints)).toEqual(['isInstance']);
  });

  it('should raise error when products are object', async () => {
    const { products, ...props } = cartModelMap;
    // @ts-ignore
    const model = new CartModel({
      // @ts-ignore
      products: {},
      ...props,
    });

    const validated = (await validator.validate(model))[0];

    expect(validated.property).toEqual('products');
    expect(keys(validated.constraints)).toEqual(['isArray']);
  });

  it('should raise error when products are not valid', async () => {
    const { products, ...props } = cartModelMap;
    const { title, ...productModelMock } = fiber.retrieveMockeries(ProductModel);
    const productModel = { ...productModelMock, title: 123 };
    // @ts-ignore
    const model = new CartModel({
      // @ts-ignore
      products: [new ProductModel(productModel)],
      ...props,
    });

    const validated = (await validator.validate(model))[0];

    expect(validated.property).toEqual('products');
    expect(validated.children[0].property).toEqual('0');
    expect(validated.children[0].children[0].property).toEqual('title');
    expect(keys(validated.children[0].children[0].constraints)).toEqual(['length', 'isString']);
  });
});
