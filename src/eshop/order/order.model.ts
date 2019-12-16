import { IsArray, IsDefined, IsInstance, IsMongoId, ValidateNested } from 'class-validator';
import { UserModel } from '../../user';
import { Mockerizer } from '../../common/mockerizer.decorator';
import { Types } from 'mongoose';
import { ProductModel } from '../product';
import { Type } from 'class-transformer';

@Mockerizer<OrderModel>(
  {
    id: () => Types.ObjectId().toHexString(),
    user: () => UserModel.MOCK,
    products: (productModelMocks: ProductModel[]) => productModelMocks,
  },
  [
    {
      model: ProductModel,
      count: 3,
    },
  ],
)
export class OrderModel {
  @IsDefined()
  @IsMongoId()
  public readonly id: string;

  @IsArray()
  @IsInstance(ProductModel, { each: true })
  @IsDefined()
  public readonly products: ProductModel[];

  @IsDefined()
  @IsInstance(UserModel)
  @ValidateNested()
  @Type(() => UserModel)
  public readonly user: UserModel;

  constructor({ id, user, products }: OrderModel) {
    this.id = id;
    this.user = user;
    this.products = products;
  }
}
