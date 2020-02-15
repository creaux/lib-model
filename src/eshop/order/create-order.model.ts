import { ArrayNotEmpty, IsArray, IsMongoId, IsDefined, IsEnum } from 'class-validator';
import { Mockerizer } from '../../common';
import { Types } from 'mongoose';
import { OrderProcess } from './order-process.enum';
import { MapModel } from '../../common/map.model';
import { Expose, Exclude } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';
import { PaymentModel } from '../payment';

type CreateOrderExcludedProps = 'process' | 'payment' | 'createdAt' | 'user' | keyof MapModel<CreateOrderModel>;

interface CreateOrderInterface {
  products: string[];
  process: OrderProcess;
  payment: PaymentModel;
  createdAt: string;
  user: string;
}

@Mockerizer<CreateOrderModel, CreateOrderExcludedProps>({
  products: () => [Types.ObjectId().toHexString()],
})
@Expose()
export class CreateOrderModel extends MapModel<CreateOrderInterface> {
  @ApiModelProperty({
    required: false,
    type: [String],
    example: ['5de3e0a388e99a666e8ee8ab'],
  })
  @IsDefined()
  @IsArray()
  @ArrayNotEmpty()
  @IsMongoId({ each: true })
  @Expose()
  public readonly products!: string[];

  // TODO: Test
  @IsEnum(OrderProcess)
  @Exclude({ toClassOnly: true })
  public readonly process = OrderProcess.UNPAID;

  // TODO Test
  @Exclude({ toClassOnly: true })
  @Expose({ toPlainOnly: true })
  public get payment(): PaymentModel {
    return this.get('payment') as PaymentModel;
  }

  @Exclude({ toClassOnly: true })
  @Expose({ toPlainOnly: true })
  public get createdAt(): string {
    return this.get('createdAt') as string;
  }

  @Exclude({ toClassOnly: true })
  @Expose({ toPlainOnly: true })
  public get user(): string {
    return this.get('user') as string;
  }

  constructor(args: Partial<CreateOrderModel>) {
    super();
    // This makes sure that plainToClass from class-transform will work
    // as it is initializing using empty constructor and then copying all keys one by one
    Object.assign(this, args);
  }
}
