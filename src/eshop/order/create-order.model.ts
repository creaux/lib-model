import { ArrayNotEmpty, IsArray, IsMongoId, IsDefined, IsEnum } from 'class-validator';
import { Mockerizer } from '../../common';
import { Types } from 'mongoose';
import { ApiModelPropertyMock } from '../../decorators';
import { OrderProcess } from './order-process.enum';

@Mockerizer<Omit<CreateOrderModel, 'process'>>({
  products: () => [Types.ObjectId().toHexString()],
})
export class CreateOrderModel {
  @ApiModelPropertyMock({
    required: false,
    type: [String],
    example: ['5de3e0a388e99a666e8ee8ab'],
  })
  @IsDefined()
  @IsArray()
  @ArrayNotEmpty()
  @IsMongoId({ each: true })
  public readonly products!: string[];

  // TODO: Test
  @IsDefined()
  @IsEnum(OrderProcess)
  public readonly process? = OrderProcess.UNPAID;

  constructor(args: Partial<CreateOrderModel>) {
    // This makes sure that plainToClass from class-transform will work
    // as it is initializing using empty constructor and then copying all keys one by one
    Object.assign(this, args);
  }
}
