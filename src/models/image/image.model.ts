import { IsDefined, IsString, IsUrl } from 'class-validator';
import { AssignMockeries, MockeriesInterface } from '../../framework/mockeries';
import { image, lorem } from 'faker';
import { Expose } from 'class-transformer';
import { BuilderInterface } from '../../generics/builder.interface';
import { Injectable } from '../../framework/injector';

const { assign } = Object;

export abstract class ImageBuilderAbstract {
  protected src!: string;
  protected alt!: string;
}

@Injectable()
export class ImageBuilder extends ImageBuilderAbstract implements BuilderInterface<ImageModel> {
  public withSrc(src: string) {
    this.src = src;
    return this;
  }

  public withAlt(alt: string) {
    this.alt = alt;
    return this;
  }

  public build(): ImageModel {
    return new ImageModel({ src: this.src, alt: this.alt });
  }
}

@Injectable()
export class ImageMockeries extends ImageBuilder implements MockeriesInterface<ImageModel> {
  public mockSrc() {
    return this.withSrc(image.imageUrl());
  }

  public mockAlt() {
    return this.withAlt(lorem.words());
  }

  public mock(): ImageModel {
    return this.mockSrc()
      .mockAlt()
      .build();
  }
}

@AssignMockeries(ImageMockeries)
export class ImageModel {
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
