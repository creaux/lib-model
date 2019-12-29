import {
  ArrayNotEmpty,
  IsDefined,
  IsInstance,
  IsMongoId,
  IsNumber,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { ImageModel } from '../../common/image.model';
import { Types } from 'mongoose';
import { lorem, random } from 'faker';
import { Mockerizer } from '../../common/mockerizer.decorator';

const { assign } = Object;

@Mockerizer<ProductModel>(
  {
    id: () => Types.ObjectId().toHexString(),
    title: () => lorem.words(3),
    description: () => lorem.words(20),
    images: (imageMocks: ImageModel[]) => imageMocks,
    price: random.number,
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
  public readonly images!: ImageModel[];

  @IsDefined()
  @IsMongoId()
  public readonly id!: string;

  @IsDefined()
  @IsString()
  @Length(1, 120)
  public readonly title!: string;

  @IsDefined()
  @IsString()
  @Length(1, 240)
  public readonly description!: string;

  @IsDefined()
  @IsNumber()
  public readonly price!: number;

  constructor(model: ProductModel) {
    assign(this, model);
  }
}
