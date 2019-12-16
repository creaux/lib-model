import { IsArray, IsDefined, IsInstance, IsMongoId, ValidateNested } from 'class-validator';
import { UserModel } from '../../user';
import { Mockerizer } from '../../common/mockerizer.decorator';
import { Types } from 'mongoose';
import { ProductModel } from '../product';

const { assign } = Object;

@Mockerizer<CartModel>(
  {
    id: () => Types.ObjectId().toHexString(),
    products: (productModel: ProductModel) => [productModel],
    user: () => UserModel.MOCK,
  },
  [
    {
      model: ProductModel,
      count: 1,
    },
  ],
)
export class CartModel {
  @IsDefined()
  @IsMongoId()
  public readonly id!: string;

  @IsInstance(ProductModel, { each: true })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  public readonly products!: ProductModel[];

  @IsInstance(UserModel)
  @IsDefined()
  public readonly user!: UserModel;

  constructor(model: CartModel) {
    assign(this, model);
  }
}
