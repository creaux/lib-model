import { IsDefined, IsNumber, IsString, IsEnum } from 'class-validator';
import { Expose } from 'class-transformer';
import { ExposeGroup, LocationEnum } from '../../common';

export class PriceModel {
  @IsDefined()
  @IsNumber()
  @Expose()
  public readonly value!: number;

  @IsDefined()
  @Expose()
  @IsEnum(LocationEnum)
  public readonly country!: LocationEnum;

  @IsString()
  @Expose({ groups: [ExposeGroup.RESPONSE] })
  public get currency(): string {
    return require('./currencies.json')[this.country];
  }

  @IsNumber()
  @Expose({ groups: [ExposeGroup.RESPONSE] })
  public get tax(): number {
    // TODO Missing functionality for example for US where each state has different tax
    return require('./taxes.json')[this.country].rate;
  }

  @IsNumber()
  @Expose({ groups: [ExposeGroup.RESPONSE] })
  public get charge(): number {
    return Math.round(this.value * this.tax * 100) / 100;
  }

  @IsNumber()
  @Expose({ groups: [ExposeGroup.RESPONSE] })
  public get price(): number {
    return this.value + this.charge;
  }

  constructor(args: Omit<PriceModel, 'tax' | 'currency' | 'charge' | 'price'>) {
    Object.assign(this, args);
  }
}
