import { IsNumber, IsMongoId } from 'class-validator';

export class CreateOrderModel {
  @IsMongoId()
  public readonly productId!: string;

  @IsNumber()
  public readonly amount!: number;

  constructor(model: CreateOrderModel) {
    Object.assign(this, model);
  }
}
