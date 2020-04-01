import { ArrayNotEmpty, IsDefined, IsInstance, IsMongoId, IsString, Length, ValidateNested } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { ImageModel, ImageMockeries } from '../image/image.model';
import { Types } from 'mongoose';
import { lorem } from 'faker';
import { AssignMockeries, MockeriesInterface } from '../../framework/mockeries';
import { PriceMockeries, PriceModel } from '../price/price.model';
import { ApiModelProperty } from '@nestjs/swagger';
import { BuilderInterface } from '../../generics/builder.interface';
import { Injectable } from '../../framework/injector';

const { assign } = Object;

export abstract class ProductBuilderAbstract {
  protected id!: string;
  protected title!: string;
  protected description!: string;
  protected images!: ImageModel[];
  protected prices!: PriceModel[];
}

@Injectable()
export class ProductBuilder extends ProductBuilderAbstract implements BuilderInterface<ProductModel> {
  withId(id: string) {
    this.id = id;
    return this;
  }

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

  build(): ProductModel {
    return new ProductModel({
      id: this.id,
      title: this.title,
      description: this.description,
      images: this.images,
      prices: this.prices,
    });
  }
}

@Injectable()
export class ProductMockeries extends ProductBuilder implements MockeriesInterface<ProductModel> {
  constructor(private imageMockeries: ImageMockeries, private priceMockeries: PriceMockeries) {
    super();
  }

  mockId() {
    return this.withId(Types.ObjectId().toHexString());
  }

  mockTitle() {
    return this.withTitle(lorem.words());
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

  mock(): ProductModel {
    return this.mockId()
      .mockTitle()
      .mockDescription()
      .mockImages()
      .mockPrices()
      .build();
  }
}

@AssignMockeries(ProductMockeries)
export class ProductModel {
  @ApiModelProperty({
    required: true,
    type: ImageModel,
  })
  @IsDefined()
  @ArrayNotEmpty()
  @IsInstance(ImageModel, { each: true })
  @ValidateNested({ each: true })
  @Expose()
  public readonly images!: ImageModel[];

  @ApiModelProperty({
    required: true,
    type: String,
    example: Types.ObjectId().toHexString(),
  })
  @IsDefined()
  @IsMongoId()
  @Expose()
  public readonly id!: string;

  @ApiModelProperty({
    required: true,
    type: String,
    example: lorem.words(4),
  })
  @IsDefined()
  @IsString()
  @Length(1, 120)
  @Expose()
  public readonly title!: string;

  @ApiModelProperty({
    required: true,
    type: String,
    example: lorem.words(8),
  })
  @IsDefined()
  @IsString()
  @Length(1, 240)
  @Expose()
  public readonly description!: string;

  @ApiModelProperty({
    required: true,
    type: String,
  })
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
