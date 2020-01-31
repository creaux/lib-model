import { IsDefined, IsEnum, IsNumber } from 'class-validator';
import { CurrenciesEnum } from './currencies.enum';
import { Expose } from 'class-transformer';

export class PriceModel {
  @IsDefined()
  @IsNumber()
  @Expose()
  public readonly value!: number;

  @IsDefined()
  @IsEnum(CurrenciesEnum)
  @Expose()
  public readonly currency!: CurrenciesEnum;

  constructor(args: PriceModel) {
    Object.assign(this, args);
  }
}
