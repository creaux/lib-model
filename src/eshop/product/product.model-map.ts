import { IsDefined, IsMongoId, IsNumber, IsString, IsUrl, Length } from 'class-validator';
import { ImageModel } from '../../common/image.model';
import { ModelMap } from '../../common/model-map.abstract';
import { ModelMapParams } from '../../generics/model-map-params';
import { Types } from 'mongoose';
import { lorem, random } from 'faker';
import { ModelMock } from '../../common/model-mock.decorator';

@ModelMock({
  id: () => Types.ObjectId().toHexString(),
  title: lorem.words,
  description: lorem.words,
  images: () => [ImageModel.MOCK],
  price: random.number,
})
export class ProductModelMap extends ModelMap<ProductModelMap, typeof ProductModelMap.KEYS> {
  public static KEYS = {
    ID: Symbol('id'),
    TITLE: Symbol('title'),
    DESCRIPTION: Symbol('description'),
    PRICE: Symbol('price'),
  };

  @IsDefined()
  @IsMongoId()
  public set id(value: string) {
    this.map.set(ProductModelMap.KEYS.ID, value);
  }

  public get id(): string {
    return this.map.get(ProductModelMap.KEYS.ID) as string;
  }

  @IsDefined()
  @IsString()
  @Length(1, 120)
  public set title(value: string) {
    this.map.set(ProductModelMap.KEYS.TITLE, value);
  }

  public get title(): string {
    return this.map.get(ProductModelMap.KEYS.TITLE) as string;
  }

  @IsDefined()
  @IsString()
  public set description(value: string) {
    this.map.set(ProductModelMap.KEYS.DESCRIPTION, value);
  }

  public get description(): string {
    return this.map.get(ProductModelMap.KEYS.DESCRIPTION) as string;
  }

  @IsDefined({ each: true })
  @IsUrl({}, { each: true })
  @Length(1)
  public readonly images: Set<ImageModel>;

  @IsDefined()
  @IsNumber()
  public set price(value: number) {
    this.map.set(ProductModelMap.KEYS.PRICE, value);
  }

  public get price(): number {
    return this.map.get(ProductModelMap.KEYS.PRICE) as number;
  }

  public constructor({ id, title, description, images, price }: ProductModelMapParams) {
    super();

    this.id = id;
    this.title = title;
    this.description = description;
    this.price = price;

    this.images = new Set<ImageModel>(images);
  }
}

export type ProductModelMapParams = Omit<ModelMapParams<ProductModelMap, typeof ProductModelMap.KEYS>, 'images'> & {
  images: ImageModel[];
};
