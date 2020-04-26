import { Validator } from 'class-validator';
import { CartModel } from './cart.model';
import { ProductModel } from '../product/product.model';
import { Injector } from '../../framework/injector';
import { UserModel } from '../user/user.model';
import { L10nModel } from '../l10n/l10n.model';
import { RoleModel } from '../role/role.model';
import { Mockeries } from '../../framework/mockeries';

const { keys } = Object;

describe('CartModel', () => {
  let cartModelMap: CartModel;
  let validator: Validator;
  let mockeries: Mockeries;

  beforeEach(() => {
    mockeries = Injector.resolve(Mockeries);
    mockeries.prepare<RoleModel>(RoleModel);
    mockeries.prepare<L10nModel>(L10nModel);
    mockeries.prepare<UserModel>(UserModel);
    mockeries.prepare<ProductModel>(ProductModel);
    mockeries.prepare<CartModel>(CartModel);
    cartModelMap = mockeries.resolve(CartModel);
    validator = new Validator();
  });

  afterEach(() => {
    mockeries.clean(RoleModel);
    mockeries.clean(L10nModel);
    mockeries.clean(UserModel);
    mockeries.clean(ProductModel);
    mockeries.clean(CartModel);
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
    const { title, ...productModelMock } = mockeries.resolve(ProductModel);
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
