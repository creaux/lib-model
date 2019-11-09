import { IsNumber, IsString } from 'class-validator';

export class PriceModel {
  @IsNumber()
  public readonly amount!: number;

  @IsString()
  public readonly currency!: string;

  constructor(model: PriceModel) {
    Object.assign(this, model);
  }
}
