import { IsMongoId } from 'class-validator';
import { CreateOrderModel } from './create-order.model';

export class OrderModel extends CreateOrderModel {
  @IsMongoId()
  public readonly id!: string;

  constructor(model: OrderModel) {
    super(model);
    Object.assign(this, model);
  }
}
