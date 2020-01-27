import { IsDefined, IsEnum, IsNumber } from 'class-validator';
import { PriceEnum } from './prices.enum';

export class PriceModel {
  @IsDefined()
  @IsNumber()
  public readonly value!: number;

  @IsDefined()
  @IsEnum(PriceEnum)
  public readonly currency!: PriceEnum;

  constructor(args: PriceModel) {
    Object.assign(this, args);
  }
}
