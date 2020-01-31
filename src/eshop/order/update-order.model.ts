import { IsArray, IsMongoId, IsOptional, ArrayNotEmpty } from 'class-validator';
import { Mockerizer } from '../../common';
import { Types } from 'mongoose';
import { ApiModelPropertyMock } from '../../decorators';
import { ApiModelProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

@Mockerizer<UpdateOrderModel>({
  products: () => [Types.ObjectId().toHexString()],
  user: () => Types.ObjectId().toHexString(),
})
export class UpdateOrderModel {
  @ApiModelPropertyMock({
    required: false,
    type: [String],
    example: ['5de3e0a388e99a666e8ee8ab'],
  })
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsMongoId({ each: true })
  @Expose()
  public readonly products!: string[];

  @ApiModelProperty({
    required: true,
    type: String,
    example: '000000000000000000000d00',
  })
  @IsOptional()
  @IsMongoId()
  @Expose()
  public readonly user!: string;

  constructor(args: Partial<UpdateOrderModel>) {
    // This makes sure that plainToClass from class-transform will work
    // as it is initializing using empty constructor and then copying all keys one by one
    Object.assign(this, args);
  }
}
