import { IsDateString, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class PaymentModel {
  @Expose()
  @IsString()
  public readonly paymentId!: string;

  @Expose()
  @IsString()
  public readonly secret!: string;

  @Expose()
  @IsDateString()
  public readonly createdAt!: string;

  constructor(params: PaymentModel) {
    Object.assign(this, params);
  }
}
