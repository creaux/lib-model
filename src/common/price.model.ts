import { IsDefined, IsNumber, IsString } from 'class-validator';

export class PriceModel {
  @IsDefined()
  @IsNumber()
  public readonly amount!: number;

  @IsDefined()
  @IsString()
  public readonly currency!: string;

  constructor({ currency, amount }: PriceModel) {
    this.currency = currency;
    this.amount = amount;
  }
}
