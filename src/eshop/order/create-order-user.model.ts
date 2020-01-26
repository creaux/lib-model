import { ArrayNotEmpty, IsArray, IsDefined, IsMongoId, IsDateString } from 'class-validator';
import { Mockerizer } from '../../common';
import { Types } from 'mongoose';
import { ApiModelProperty } from '@nestjs/swagger';
import { ApiModelPropertyMock } from '../../decorators';
import { OrderProcess } from './order-process.enum';

@Mockerizer<Omit<CreateOrderUserModel, 'process'>>({
  products: () => [Types.ObjectId().toHexString()],
  user: () => Types.ObjectId().toHexString(),
  createdAt: () => new Date().toDateString(),
  updatedAt: () => undefined,
})
export class CreateOrderUserModel {
  @ApiModelPropertyMock({
    required: false,
    type: [String],
    example: ['5e1882d4c4dbffe54e02eec5'],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsMongoId({ each: true })
  public readonly products!: string[];

  @ApiModelProperty({
    required: true,
    type: String,
    example: '5e1882d4c4dbffe54e02eec5',
  })
  @IsDefined()
  @IsMongoId()
  public readonly user!: string;

  @IsDefined()
  @IsDateString()
  public readonly createdAt!: string;

  @IsDefined()
  @IsDateString()
  public readonly updatedAt?: string;

  // TODO: Test
  public readonly process? = OrderProcess.UNPAID;

  constructor(args: CreateOrderUserModel) {
    // This makes sure that plainToClass from class-transform will work
    // as it is initializing using empty constructor and then copying all keys one by one
    Object.assign(this, args);
  }
}
