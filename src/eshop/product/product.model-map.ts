import { IsArray, IsDefined, IsNumber, IsString, IsUrl, Length } from 'class-validator';

enum ProductMapKeys {
  TITLE = 'title',
  DESCRIPTION = 'description',
  PRICE = 'price',
}

export interface ProductInterface {
  title: string;
  description: string;
  images: Set<string>;
  price: number;
}

export class ProductModelMap extends Map<keyof ProductInterface, ProductInterface[keyof ProductInterface]> {
  public static MOCK_PROPERTIES: ProductInterface = {
    title: 'Mock title',
    description: 'Lorem ipsum dolor sit amet',
    images: new Set(['https://picsum.photos/200/300', 'https://picsum.photos/200/300']),
    price: 400,
  };

  public static MOCK: ProductModelMap = new ProductModelMap(ProductModelMap.MOCK_PROPERTIES);

  public static setToArray<T>(value: Set<T>): T[] {
    return Array.from(value);
  }

  @IsDefined()
  @IsString()
  @Length(1, 120)
  public set title(value: string) {
    this.set(ProductMapKeys.TITLE, value);
  }

  public get title(): string {
    return this.get(ProductMapKeys.TITLE) as string;
  }

  @IsDefined()
  @IsString()
  public set description(value: string) {
    this.set(ProductMapKeys.DESCRIPTION, value);
  }

  public get description(): string {
    return this.get(ProductMapKeys.DESCRIPTION) as string;
  }

  @IsDefined({ each: true })
  @IsUrl({}, { each: true })
  @Length(1)
  public readonly images: Set<string>;

  @IsDefined()
  @IsNumber()
  public set price(value: number) {
    this.set(ProductMapKeys.PRICE, value);
  }

  public get price(): number {
    return this.get(ProductMapKeys.PRICE) as number;
  }

  public constructor(model: ProductInterface) {
    super();

    this.title = model.title;
    this.description = model.description;
    this.images = model.images;
    this.price = model.price;
  }
}
