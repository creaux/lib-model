import { ArrayNotEmpty, IsArray, IsDefined, IsMongoId } from 'class-validator';
import { Mockerizer } from '../../common';
import { Types } from 'mongoose';
import { ApiModelProperty } from '@nestjs/swagger';
import { ProductModel } from '../product';
import { UserModel } from '../../user';
import { ApiModelPropertyMock } from '../../decorators';

@Mockerizer<CreateOrderModel>({
  products: () => [Types.ObjectId().toHexString()],
  user: () => Types.ObjectId().toHexString(),
})
export class CreateOrderModel {
  @ApiModelPropertyMock(
    {
      required: false,
      type: [ProductModel],
    },
    {
      Model: ProductModel,
    },
  )
  @IsArray()
  @ArrayNotEmpty()
  @IsMongoId({ each: true })
  public readonly products: string[];

  @ApiModelProperty({
    required: true,
    type: UserModel,
    example: UserModel.MOCK,
  })
  @IsDefined()
  @IsMongoId()
  public readonly user: string;

  constructor({ user, products }: CreateOrderModel) {
    this.user = user;
    this.products = products;
  }
}
