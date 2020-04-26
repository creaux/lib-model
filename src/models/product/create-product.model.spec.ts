import 'reflect-metadata';
import { Validator } from 'class-validator';
import { CreateProductModel } from './create-product.model';
import { Injector } from '../../framework/injector';
import { ImageModel } from '../image/image.model';
import { L10nModel } from '../l10n/l10n.model';
import { Mockeries } from '../../framework/mockeries';

const { keys } = Object;

describe('CreateProductModel', () => {
  let productModel: CreateProductModel;
  let validator: Validator;
  let fiber: Mockeries;

  beforeEach(() => {
    fiber = Injector.resolve(Mockeries);
    fiber.prepare<L10nModel>(L10nModel);
    fiber.prepare<CreateProductModel>(CreateProductModel);
    productModel = fiber.resolve(CreateProductModel);
    validator = new Validator();
  });

  afterEach(() => {
    fiber.clean(L10nModel);
    fiber.clean(CreateProductModel);
  });

  it('should raise error when title is defined', async () => {
    const { title, ...props } = productModel;
    const model = new CreateProductModel({
      // @ts-ignore
      title: undefined,
      ...props,
    });

    // console.log('REFLECT:', Reflect.getMetadata('something', model, 'title'));

    const validated = (await validator.validate(model))[0];

    expect(validated.property).toEqual('title');
    expect(keys(validated.constraints)).toEqual(['isDefined', 'length', 'isString']);
  });

  it('should raise error when title is not string', async () => {
    const { title, ...props } = productModel;
    const model = new CreateProductModel({
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
    const model = new CreateProductModel({
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
    const model = new CreateProductModel({
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
    const model = new CreateProductModel({
      // @ts-ignore
      description: 123,
      ...props,
    });

    const validated = (await validator.validate(model))[0];

    expect(validated.property).toEqual('description');
    expect(keys(validated.constraints)).toEqual(['length', 'isString']);
  });

  it('should raise error when images are not defined', async () => {
    const { images, ...props } = productModel;
    const model = new CreateProductModel({
      // @ts-ignore
      images: undefined,
      ...props,
    });
    const validated = (await validator.validate(model))[0];
    expect(validated.property).toEqual('images');
    expect(keys(validated.constraints)).toEqual(['isDefined', 'arrayNotEmpty', 'isArray']);
  });

  it("should raise error when images don't have at least one member", async () => {
    const { images, ...props } = productModel;
    const model = new CreateProductModel({
      images: [],
      ...props,
    });
    const validated = (await validator.validate(model))[0];
    expect(validated.property).toEqual('images');
    expect(keys(validated.constraints)).toEqual(['arrayNotEmpty']);
  });

  it("should raise error when images don't have ImageModel member", async () => {
    const { images, ...props } = productModel;
    const model = new CreateProductModel({
      // @ts-ignore
      images: ['123'],
      ...props,
    });
    const validated = (await validator.validate(model))[0];
    expect(validated.property).toEqual('images');
    expect(keys(validated.constraints)).toEqual(['isInstance']);
  });

  it('should raise error when images are not valid urls', async () => {
    const { images, ...props } = productModel;
    const model = new CreateProductModel({
      images: [new ImageModel({ src: 'abc', alt: 'Some description' })],
      ...props,
    });
    const validated = (await validator.validate(model))[0];
    expect(validated.property).toEqual('images');
    expect(validated.children[0].property).toEqual('0');
    expect(validated.children[0].children[0].property).toEqual('src');
    expect(keys(validated.children[0].children[0].constraints)).toEqual(['isUrl']);
  });

  it('should raise error when prices are not defined', async () => {
    const { prices, ...props } = productModel;
    const model = new CreateProductModel({
      // @ts-ignore
      prices: undefined,
      ...props,
    });
    const validated = (await validator.validate(model))[0];
    expect(validated.property).toEqual('prices');
    expect(keys(validated.constraints)).toEqual(['isDefined', 'isArray']);
  });

  it('should raise error when prices are not valid', async () => {
    const { prices, ...props } = productModel;
    const model = new CreateProductModel({
      // @ts-ignore
      prices: 'abc',
      ...props,
    });
    const validated = (await validator.validate(model))[0];
    expect(validated.property).toEqual('prices');
    expect(keys(validated.constraints)).toEqual(['isArray']);
  });

  it("should raise error when prices don't contain PricesModel objects", async () => {
    const { prices, ...props } = productModel;
    const model = new CreateProductModel({
      // @ts-ignore
      prices: [{ husa: 'kure' }],
      ...props,
    });
    const validated = (await validator.validate(model))[0];
    expect(validated.property).toEqual('prices');
    expect(keys(validated.constraints)).toEqual(['isInstance']);
  });
});
