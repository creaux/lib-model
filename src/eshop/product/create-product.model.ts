import { ArrayNotEmpty, IsArray, IsDefined, IsInstance, IsString, Length, ValidateNested } from 'class-validator';
import { ImageModel } from '../../common/image.model';
import { Mockerizer } from '../../common/mockerizer.decorator';
import { lorem } from 'faker';
import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PriceModel } from './price.model';
import { CurrenciesEnum } from './currencies.enum';
import { Expose } from 'class-transformer';

@Mockerizer<CreateProductModel>(
  {
    title: () => lorem.words(3),
    description: () => lorem.words(10),
    images: (imagesModel: ImageModel[]) => imagesModel,
    prices: () => [new PriceModel({ value: 123, currency: CurrenciesEnum.USD })],
  },
  [
    {
      model: ImageModel,
      count: 3,
    },
  ],
)
export class CreateProductModel {
  @ApiModelProperty({
    required: true,
    type: String,
    example: lorem.words(),
  })
  @IsDefined()
  @IsString()
  @Length(1, 120)
  @Expose()
  public readonly title!: string;

  @ApiModelProperty({
    required: true,
    type: String,
    example: lorem.words(),
  })
  @IsDefined()
  @IsString()
  @Length(1, 240)
  @Expose()
  public readonly description!: string;

  @ApiModelProperty({
    required: true,
    type: [ImageModel],
    example: [ImageModel.MOCK],
  })
  @IsDefined()
  @IsArray()
  @ArrayNotEmpty()
  @IsInstance(ImageModel, { each: true })
  @ValidateNested({ each: true })
  @Type(() => ImageModel)
  @Expose()
  public readonly images!: ImageModel[];

  @ApiModelProperty({
    required: true,
    type: String,
    example: [new PriceModel({ value: 123, currency: CurrenciesEnum.USD })],
  })
  @IsDefined()
  @IsArray()
  @IsInstance(PriceModel, { each: true })
  @ValidateNested({ each: true })
  @Type(() => PriceModel)
  @Expose()
  public readonly prices!: PriceModel[];

  constructor(model: CreateProductModel) {
    Object.assign(this, model);
  }
}
