import { ArrayNotEmpty, IsDefined, IsInstance, IsMongoId, IsString, Length, ValidateNested } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { ImageModel } from '../../common/image.model';
import { Types } from 'mongoose';
import { lorem } from 'faker';
import { Mockerizer } from '../../common';
import { PriceModel } from './price.model';
import { LocationEnum } from '../../common';

const { assign } = Object;

@Mockerizer<ProductModel>(
  {
    id: () => Types.ObjectId().toHexString(),
    title: () => lorem.words(3),
    description: () => lorem.words(20),
    images: (imageMocks: ImageModel[]) => imageMocks,
    prices: () => [new PriceModel({ value: 123, country: LocationEnum.US })],
  },
  [
    {
      model: ImageModel,
      count: 3,
    },
  ],
)
export class ProductModel {
  @IsDefined()
  @ArrayNotEmpty()
  @IsInstance(ImageModel, { each: true })
  @ValidateNested({ each: true })
  @Expose()
  public readonly images!: ImageModel[];

  @IsDefined()
  @IsMongoId()
  @Expose()
  public readonly id!: string;

  @IsDefined()
  @IsString()
  @Length(1, 120)
  @Expose()
  public readonly title!: string;

  @IsDefined()
  @IsString()
  @Length(1, 240)
  @Expose()
  public readonly description!: string;

  @IsDefined()
  @IsInstance(PriceModel, { each: true })
  @ValidateNested({ each: true })
  @Type(() => PriceModel)
  @Expose()
  public readonly prices!: PriceModel[];

  constructor(model: ProductModel) {
    assign(this, model);
  }
}
