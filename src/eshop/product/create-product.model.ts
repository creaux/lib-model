import {
  ArrayNotEmpty,
  IsArray,
  IsDefined,
  IsInstance,
  IsNumber,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { ImageModel } from '../../common/image.model';
import { Mockerizer } from '../../common/mockerizer.decorator';
import { lorem, random } from 'faker';
import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

@Mockerizer<CreateProductModel>(
  {
    title: () => lorem.words(3),
    description: () => lorem.words(30),
    images: (imagesModel: ImageModel[]) => imagesModel,
    price: () => random.number(),
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
  public readonly title!: string;

  @ApiModelProperty({
    required: true,
    type: String,
    example: lorem.words(),
  })
  @IsDefined()
  @IsString()
  @Length(1, 240)
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
  public readonly images!: ImageModel[];

  @ApiModelProperty({
    required: true,
    type: String,
    example: random.number(),
  })
  @IsDefined()
  @IsNumber()
  public readonly price!: number;

  constructor(model: CreateProductModel) {
    Object.assign(this, model);
  }
}
