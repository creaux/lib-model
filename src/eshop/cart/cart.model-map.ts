import { IsDefined, IsMongoId } from 'class-validator';
import { ProductModelMap } from '../product/product.model-map';
import { UserModel } from '../../user';
import { ModelMap } from '../../common/model-map.abstract';
import { ModelMapParams } from '../../generics/model-map-params';
import { MOCK_TOKEN, ModelMock } from '../../common/model-mock.decorator';
import { Types } from 'mongoose';

@ModelMock({
  id: () => Types.ObjectId().toHexString(),
  products: () => [Reflect.getMetadata(MOCK_TOKEN, ProductModelMap)],
  user: () => UserModel.MOCK,
})
export class CartModelMap extends ModelMap<CartModelMap, typeof CartModelMap.KEYS> {
  public static KEYS = {
    ID: Symbol('id'),
    PRODUCTS: Symbol('products'),
    USER: Symbol('user'),
  };

  @IsDefined()
  @IsMongoId()
  public set id(value: string) {
    this.map.set(CartModelMap.KEYS.ID, value);
  }

  public get id(): string {
    return this.map.get(CartModelMap.KEYS.ID) as string;
  }

  public set products(value: ProductModelMap[]) {
    this.map.set(CartModelMap.KEYS.PRODUCTS, value);
  }

  public get products(): ProductModelMap[] {
    return this.map.get(CartModelMap.KEYS.PRODUCTS) as ProductModelMap[];
  }

  public set user(value: UserModel) {
    this.map.set(CartModelMap.KEYS.USER, value);
  }

  public get user(): UserModel {
    return this.map.get(CartModelMap.KEYS.USER) as UserModel;
  }

  constructor({ id, user, products }: ModelMapParams<CartModelMap, typeof CartModelMap.KEYS>) {
    super();

    this.id = id;
    this.user = user;
    this.products = products;
  }
}
