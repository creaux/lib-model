import { IsMongoId } from 'class-validator';
import { ModelMap } from '../../common/model-map.abstract';
import { ModelMapParams } from '../../generics/model-map-params';
import { UserModel } from '../../user';
import { ProductModelMap } from '../product/product.model-map';
import { MOCK_TOKEN, ModelMock } from '../../common/model-mock.decorator';
import { Types } from 'mongoose';

@ModelMock({
  id: () => Types.ObjectId().toHexString(),
  user: () => UserModel.MOCK,
  products: () => [Reflect.getMetadata(MOCK_TOKEN, ProductModelMap)],
})
export class OrderModel extends ModelMap<OrderModel, typeof OrderModel.KEYS> {
  public static KEYS = {
    ID: Symbol('id'),
    USER: Symbol('user'),
    PRODUCTS: Symbol('products'),
  };

  @IsMongoId()
  public set id(value: string) {
    this.map.set(OrderModel.KEYS.ID, value);
  }

  public get id(): string {
    return this.map.get(OrderModel.KEYS.ID) as string;
  }

  constructor({ id }: ModelMapParams<OrderModel, typeof OrderModel.KEYS>) {
    super();

    this.id = id;
  }
}
