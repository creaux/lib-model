import { ArrayNotEmpty, IsArray, IsDefined, IsInstance, IsString, Length, ValidateNested } from 'class-validator';
import { ImageModel, ImageMockeries } from '../image/image.model';
import { AssignMockeries, MockeriesInterface } from '../../framework/mockeries';
import { lorem } from 'faker';
import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PriceMockeries, PriceModel } from '../price/price.model';
import { Expose } from 'class-transformer';
import { LocationEnum } from '../../enums/location.enum';
import { BuilderInterface } from '../../generics/builder.interface';
import { Injectable } from '../../framework/injector';

export abstract class CreateProductBuilderAbstract {
  protected title!: string;
  protected description!: string;
  protected images!: ImageModel[];
  protected prices!: PriceModel[];
}

@Injectable()
export class CreateProductBuilder extends CreateProductBuilderAbstract implements BuilderInterface<CreateProductModel> {
  withTitle(title: string) {
    this.title = title;
    return this;
  }

  withDescription(description: string) {
    this.description = description;
    return this;
  }

  withImages(images: ImageModel[]) {
    this.images = images;
    return this;
  }

  withPrices(prices: PriceModel[]) {
    this.prices = prices;
    return this;
  }

  build(): CreateProductModel {
    return new CreateProductModel({
      title: this.title,
      description: this.description,
      images: this.images,
      prices: this.prices,
    });
  }
}

@Injectable()
export class CreateProductMockeries extends CreateProductBuilder implements MockeriesInterface<CreateProductModel> {
  constructor(private imageMockeries: ImageMockeries, private priceMockeries: PriceMockeries) {
    super();
  }

  mockTitle() {
    return this.withTitle(lorem.words(3));
  }

  mockDescription() {
    return this.withDescription(lorem.words(15));
  }

  mockImages() {
    return this.withImages([this.imageMockeries.mock()]);
  }

  mockPrices() {
    return this.withPrices([this.priceMockeries.mock()]);
  }

  mock(): CreateProductModel {
    return this.mockTitle()
      .mockDescription()
      .mockImages()
      .mockPrices()
      .build();
  }
}

@AssignMockeries(CreateProductMockeries)
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
    example: [new PriceModel({ value: 123, country: LocationEnum.US })],
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
