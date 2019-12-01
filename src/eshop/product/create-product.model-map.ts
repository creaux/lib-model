import { IsDefined, IsNumber, IsString, IsUrl, Length } from 'class-validator';
import { ImageModel } from '../../common/image.model';
import { ModelMap } from '../../common/model-map.abstract';
import { ModelMapParams } from '../../generics/model-map-params';
import { ModelMock } from '../../common/model-mock.decorator';
import { lorem, random } from 'faker';

export type CreateProductParams = Readonly<Omit<CreateProductModelMap, 'images'> & { images: ImageModel[] }>;

@ModelMock({
  title: lorem.words,
  description: lorem.words,
  images: () => [ImageModel.MOCK],
  price: random.number,
})
export class CreateProductModelMap extends ModelMap<CreateProductModelMap, typeof CreateProductModelMap.KEYS> {
  public static KEYS = {
    TITLE: Symbol('title'),
    DESCRIPTION: Symbol('description'),
    PRICE: Symbol('price'),
  };

  @IsDefined()
  @IsString()
  @Length(1, 120)
  public set title(value: string) {
    this.map.set(CreateProductModelMap.KEYS.TITLE, value);
  }

  public get title(): string {
    return this.map.get(CreateProductModelMap.KEYS.TITLE) as string;
  }

  @IsDefined()
  @IsString()
  public set description(value: string) {
    this.map.set(CreateProductModelMap.KEYS.DESCRIPTION, value);
  }

  public get description(): string {
    return this.map.get(CreateProductModelMap.KEYS.DESCRIPTION) as string;
  }

  @IsDefined({ each: true })
  @IsUrl({}, { each: true })
  @Length(1)
  public readonly images: Set<ImageModel>;

  @IsDefined()
  @IsNumber()
  public set price(value: number) {
    this.map.set(CreateProductModelMap.KEYS.PRICE, value);
  }

  public get price(): number {
    return this.map.get(CreateProductModelMap.KEYS.PRICE) as number;
  }

  public constructor({
    title,
    description,
    images,
    price,
  }: Omit<ModelMapParams<CreateProductModelMap, typeof CreateProductModelMap.KEYS>, 'images'> & {
    images: ImageModel[];
  }) {
    super();

    this.title = title;
    this.description = description;
    this.images = new Set<ImageModel>(images);
    this.price = price;
  }
}
