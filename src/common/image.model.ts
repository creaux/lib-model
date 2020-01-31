import { IsDefined, IsString, IsUrl } from 'class-validator';
import { Mockerizer } from './mockerizer.decorator';
import { image, lorem } from 'faker';
import { Expose } from 'class-transformer';

const { assign } = Object;

interface ImageModelInterface {
  src: string;
  alt: string;
}

// @ts-ignore
@Mockerizer<ImageModelInterface>({
  src: () => image.imageUrl(),
  alt: () => lorem.words(),
})
export class ImageModel {
  public static MOCK_PROPERTIES = {
    src: 'http://lorempixel.com/640/480/fashion',
    alt: 'Loewm pixel',
  };

  public static MOCK = new ImageModel(ImageModel.MOCK_PROPERTIES);

  @IsDefined()
  @IsUrl()
  @Expose()
  public readonly src!: string;

  @IsDefined()
  @IsString()
  @Expose()
  public readonly alt!: string;

  constructor(model: ImageModel) {
    assign(this, model);
  }
}
