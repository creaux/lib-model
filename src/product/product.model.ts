import { IsMongoId } from 'class-validator';
import { CreateProductModel } from './create-product.model';

export class ProductModel extends CreateProductModel {
  @IsMongoId()
  public readonly id!: string;

  constructor(model: ProductModel) {
    super(model);
    Object.assign(this, model);
  }
}
