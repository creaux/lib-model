import { IsDefined, IsString, IsUrl } from 'class-validator';

export class ImageModel {
  public static MOCK_PROPERTIES = {
    src: 'http://lorempixel.com/640/480/fashion',
    alt: 'Loewm pixel',
  };

  public static MOCK = new ImageModel(ImageModel.MOCK_PROPERTIES);

  @IsDefined()
  @IsUrl()
  public readonly src: string;

  @IsDefined()
  @IsString()
  public readonly alt: string;

  constructor({ src, alt }: ImageModel) {
    this.src = src;
    this.alt = alt;
  }
}
