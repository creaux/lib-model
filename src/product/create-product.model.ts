import { IsString, IsArray } from 'class-validator';
import { ImageModel } from '../common/image.model';
import { PriceModel } from '../common/price.model';

export class CreateProductModel {
  @IsString()
  public readonly title!: string;

  @IsString()
  public readonly description!: string;

  @IsArray()
  public readonly images!: ImageModel[];

  public readonly price!: PriceModel;

  constructor(model: CreateProductModel) {
    Object.assign(this, model);
  }
}
