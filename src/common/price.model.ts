import { IsDefined, IsNumber, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class PriceModel {
  @IsDefined()
  @IsNumber()
  @Expose()
  public readonly amount!: number;

  @IsDefined()
  @IsString()
  @Expose()
  public readonly currency!: string;

  constructor(args: PriceModel) {
    Object.assign(this, args);
  }
}
