import {
  IsArray,
  IsDefined,
  IsInstance,
  IsMongoId,
  ValidateNested,
  IsDateString,
  IsEnum,
  IsString,
} from 'class-validator';
import { UserModel } from '../../user';
import { MOCK_TOKEN, Mockerizer } from '../../common';
import { Types } from 'mongoose';
import { ProductModel } from '../product';
import { Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';
import { OrderProcess } from './order-process.enum';
import { PaymentModel } from '../payment/payment.model';

const ProductMock = Reflect.getMetadata(MOCK_TOKEN, ProductModel);

@Mockerizer<OrderModel>(
  {
    id: () => Types.ObjectId().toHexString(),
    user: () => UserModel.MOCK,
    products: (productModelMocks: ProductModel[]) => productModelMocks,
    createdAt: () => new Date().toDateString(),
    process: () => OrderProcess.UNPAID,
    payment: () => new PaymentModel({ paymentId: 'abc', createdAt: new Date().toDateString(), secret: 'cda' }),
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
  public readonly id!: string;

  @ApiModelProperty({
    required: false,
    type: [ProductModel],
    example: new ProductMock(3),
  })
  @IsArray()
  @IsInstance(ProductModel, { each: true })
  @IsDefined()
  public readonly products!: ProductModel[];

  @ApiModelProperty({
    required: true,
    type: UserModel,
    example: UserModel.MOCK,
  })
  @IsDefined()
  @IsInstance(UserModel)
  @ValidateNested()
  @Type(() => UserModel)
  public readonly user!: UserModel;

  // TODO: Test
  @IsDefined()
  @IsDateString()
  public readonly createdAt!: string;

  // TODO: Test
  @IsDefined()
  @IsEnum(OrderProcess)
  public readonly process!: OrderProcess;

  // TODO: Test
  @IsDefined()
  @IsInstance(PaymentModel)
  @ValidateNested()
  @Type(() => PaymentModel)
  public readonly payment?: PaymentModel;

  constructor(params: OrderModel) {
    Object.assign(this, params);
  }
}
