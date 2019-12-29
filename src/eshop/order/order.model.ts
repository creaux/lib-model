import { IsArray, IsDefined, IsInstance, IsMongoId, ValidateNested, IsDateString } from 'class-validator';
import { UserModel } from '../../user';
import { MOCK_TOKEN, Mockerizer } from '../../common/mockerizer.decorator';
import { Types } from 'mongoose';
import { ProductModel } from '../product/product.model';
import { Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';

const ProductMock = Reflect.getMetadata(MOCK_TOKEN, ProductModel);

@Mockerizer<OrderModel>(
  {
    id: () => Types.ObjectId().toHexString(),
    user: () => UserModel.MOCK,
    products: (productModelMocks: ProductModel[]) => productModelMocks,
    createdAt: () => new Date().toDateString(),
  },
  [
    {
      model: ProductModel,
      count: 3,
    },
  ],
)
export class OrderModel {
  @ApiModelProperty({
    required: true,
    type: Types.ObjectId,
    example: Types.ObjectId().toHexString(),
  })
  @IsDefined()
  @IsMongoId()
  public readonly id: string;

  @ApiModelProperty({
    required: false,
    type: [ProductModel],
    example: new ProductMock(3),
  })
  @IsArray()
  @IsInstance(ProductModel, { each: true })
  @IsDefined()
  public readonly products: ProductModel[];

  @ApiModelProperty({
    required: true,
    type: UserModel,
    example: UserModel.MOCK,
  })
  @IsDefined()
  @IsInstance(UserModel)
  @ValidateNested()
  @Type(() => UserModel)
  public readonly user: UserModel;

  // TODO: Test
  @IsDefined()
  @IsDateString()
  public readonly createdAt: string;

  constructor({ id, user, products, createdAt = new Date().toDateString() }: OrderModel) {
    this.id = id;
    this.user = user;
    this.products = products;
    this.createdAt = createdAt;
  }
}
