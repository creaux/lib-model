import { Validator } from 'class-validator';
import { ProductModel } from './product.model';
import { ImageModel } from '../../common/image.model';
import { MOCK_TOKEN } from '../../common/mockerizer.decorator';
const { keys } = Object;

describe('ProductModel', () => {
  let productModel: ProductModel;
  let validator: Validator;
  let Mock: any;

  beforeEach(() => {
    Mock = Reflect.getMetadata(MOCK_TOKEN, ProductModel);
    productModel = new Mock();
    validator = new Validator();
  });

  it('should contain one mock', () => {
    expect([new Mock()].length).toEqual(1);
  });

  it('should contain five mocks', () => {
    expect([...new Mock(5)].length).toEqual(5);
  });

  it('should raise error when id is not defined', async () => {
    const { id, ...props } = productModel;
    const model = new ProductModel({
      // @ts-ignore
      id: undefined,
      ...props,
    });

    const validated = (await validator.validate(model))[0];

    expect(validated.property).toEqual('id');
    expect(keys(validated.constraints)).toEqual(['isDefined', 'isMongoId']);
  });

  it('should raise error when id is not mongo id', async () => {
    const { id, ...props } = productModel;
    const model = new ProductModel({
      // @ts-ignore
      id: 'abc',
      ...props,
    });

    const validated = (await validator.validate(model))[0];

    expect(validated.property).toEqual('id');
    expect(keys(validated.constraints)).toEqual(['isMongoId']);
  });

  it('should raise error when title is defined', async () => {
    const { title, ...props } = productModel;
    const model = new ProductModel({
      // @ts-ignore
      title: undefined,
      ...props,
    });

    const validated = (await validator.validate(model))[0];

    expect(validated.property).toEqual('title');
    expect(keys(validated.constraints)).toEqual(['isDefined', 'length', 'isString']);
  });

  it('should raise error when title is not string', async () => {
    const { title, ...props } = productModel;
    const model = new ProductModel({
      // @ts-ignore
      title: 123,
      ...props,
    });

    const validated = (await validator.validate(model))[0];

    expect(validated.property).toEqual('title');
    expect(keys(validated.constraints)).toEqual(['length', 'isString']);
  });

  it('should raise error when title is not of required length', async () => {
    const { title, ...props } = productModel;
    const model = new ProductModel({
      // @ts-ignore
      title: '',
      ...props,
    });

    const validated = (await validator.validate(model))[0];

    expect(validated.property).toEqual('title');
    expect(keys(validated.constraints)).toEqual(['length']);
  });

  it('should raise error when description is not defined', async () => {
    const { description, ...props } = productModel;
    const model = new ProductModel({
      // @ts-ignore
      description: undefined,
      ...props,
    });

    const validated = (await validator.validate(model))[0];

    expect(validated.property).toEqual('description');
    expect(keys(validated.constraints)).toEqual(['isDefined', 'length', 'isString']);
  });

  it('should raise error when description is not string', async () => {
    const { description, ...props } = productModel;
    const model = new ProductModel({
      // @ts-ignore
      description: 123,
      ...props,
    });

    const validated = (await validator.validate(model))[0];

    expect(validated.property).toEqual('description');
    expect(keys(validated.constraints)).toEqual(['length', 'isString']);
  });

  it('should raise error when description is more than 240 characters', async () => {
    const { description, ...props } = productModel;
    const model = new ProductModel({
      // @ts-ignore
      description:
        'Vestibulum id ligula porta felis euismod semper. Etiam porta sem malesuada magna mollis euismod. Sed posuere consectetur est at lobortis. Donec sed odio dui. Vestibulum id ligula porta felis euismod semper. Etiam porta sem malesuada magna m.',
      ...props,
    });

    const validated = (await validator.validate(model))[0];

    expect(validated.property).toEqual('description');
    expect(keys(validated.constraints)).toEqual(['length']);
  });

  it('should raise error when images are not defined', async () => {
    const { images, ...props } = productModel;
    const model = new ProductModel({
      // @ts-ignore
      images: undefined,
      ...props,
    });
    const validated = (await validator.validate(model))[0];
    expect(validated.property).toEqual('images');
    expect(keys(validated.constraints)).toEqual(['isDefined', 'arrayNotEmpty']);
  });

  it("should raise error when images don't have at least one member", async () => {
    const { images, ...props } = productModel;
    const model = new ProductModel({
      images: [],
      ...props,
    });
    const validated = (await validator.validate(model))[0];
    expect(validated.property).toEqual('images');
    expect(keys(validated.constraints)).toEqual(['arrayNotEmpty']);
  });

  it('should raise error when images are not valid urls', async () => {
    const { images, ...props } = productModel;
    const model = new ProductModel({
      images: [new ImageModel({ src: 'abc', alt: 'Some description' })],
      ...props,
    });
    const validated = (await validator.validate(model))[0];
    expect(validated.property).toEqual('images');
    expect(validated.children[0].property).toEqual('0');
    expect(validated.children[0].children[0].property).toEqual('src');
    expect(keys(validated.children[0].children[0].constraints)).toEqual(['isUrl']);
  });

  it('should raise error when price is not defined', async () => {
    const { price, ...props } = productModel;
    const model = new ProductModel({
      // @ts-ignore
      price: undefined,
      ...props,
    });
    const validated = (await validator.validate(model))[0];
    expect(validated.property).toEqual('price');
    expect(keys(validated.constraints)).toEqual(['isDefined', 'isNumber']);
  });

  it('should raise error when price is not valid', async () => {
    const { price, ...props } = productModel;
    const model = new ProductModel({
      // @ts-ignore
      price: 'abc',
      ...props,
    });
    const validated = (await validator.validate(model))[0];
    expect(validated.property).toEqual('price');
    expect(keys(validated.constraints)).toEqual(['isNumber']);
  });
});
