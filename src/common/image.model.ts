import { IsString } from 'class-validator';

export class ImageModel {
  @IsString()
  public readonly src: string;
  @IsString()
  public readonly alt: string;

  constructor(src: string, alt: string) {
    this.src = src;
    this.alt = alt;
  }
}
