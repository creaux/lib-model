import { Validator } from 'class-validator';
import test from 'ava';
import { ProductModel } from './product.model';
import { ImageModel } from '../../common/image.model';
import { MOCK_TOKEN } from '../../common/mockerizer.decorator';
const { keys } = Object;

let productModel: ProductModel;
let validator: Validator;
let Mock: any;

test.before(() => {
  Mock = Reflect.getMetadata(MOCK_TOKEN, ProductModel);
  productModel = new Mock();
  validator = new Validator();
});

test('should contain one mock', t => {
  t.truthy([new Mock()].length === 1);
});

test('should contain five mocks', t => {
  t.truthy([...new Mock(5)].length === 5);
});

test('should raise error when id is not defined', async t => {
  const { id, ...props } = productModel;
  const model = new ProductModel({
    // @ts-ignore
    id: undefined,
    ...props,
  });

  const validated = (await validator.validate(model))[0];

  t.is(validated.property, 'id');
  t.deepEqual(keys(validated.constraints), ['isDefined', 'isMongoId']);
});

test('should raise error when id is not mongo id', async t => {
  const { id, ...props } = productModel;
  const model = new ProductModel({
    // @ts-ignore
    id: 'abc',
    ...props,
  });

  const validated = (await validator.validate(model))[0];

  t.is(validated.property, 'id');
  t.deepEqual(keys(validated.constraints), ['isMongoId']);
});

test('should raise error when title is defined', async t => {
  const { title, ...props } = productModel;
  const model = new ProductModel({
    // @ts-ignore
    title: undefined,
    ...props,
  });

  const validated = (await validator.validate(model))[0];

  t.is(validated.property, 'title');
  t.deepEqual(keys(validated.constraints), ['isDefined', 'length', 'isString']);
});

test('should raise error when title is not string', async t => {
  const { title, ...props } = productModel;
  const model = new ProductModel({
    // @ts-ignore
    title: 123,
    ...props,
  });

  const validated = (await validator.validate(model))[0];

  t.is(validated.property, 'title');
  t.deepEqual(keys(validated.constraints), ['length', 'isString']);
});

test('should raise error when title is not of required length', async t => {
  const { title, ...props } = productModel;
  const model = new ProductModel({
    // @ts-ignore
    title: '',
    ...props,
  });

  const validated = (await validator.validate(model))[0];

  t.is(validated.property, 'title');
  t.deepEqual(keys(validated.constraints), ['length']);
});

test('should raise error when description is not defined', async t => {
  const { description, ...props } = productModel;
  const model = new ProductModel({
    // @ts-ignore
    description: undefined,
    ...props,
  });

  const validated = (await validator.validate(model))[0];

  t.is(validated.property, 'description');
  t.deepEqual(keys(validated.constraints), ['isDefined', 'length', 'isString']);
});

test('should raise error when description is not string', async t => {
  const { description, ...props } = productModel;
  const model = new ProductModel({
    // @ts-ignore
    description: 123,
    ...props,
  });

  const validated = (await validator.validate(model))[0];

  t.is(validated.property, 'description');
  t.deepEqual(keys(validated.constraints), ['length', 'isString']);
});

test('should raise error when description is more than 240 characters', async t => {
  const { description, ...props } = productModel;
  const model = new ProductModel({
    // @ts-ignore
    description:
      'Vestibulum id ligula porta felis euismod semper. Etiam porta sem malesuada magna mollis euismod. Sed posuere consectetur est at lobortis. Donec sed odio dui. Vestibulum id ligula porta felis euismod semper. Etiam porta sem malesuada magna m.',
    ...props,
  });

  const validated = (await validator.validate(model))[0];

  t.is(validated.property, 'description');
  t.deepEqual(keys(validated.constraints), ['length']);
});

test('should raise error when images are not defined', async t => {
  const { images, ...props } = productModel;
  const model = new ProductModel({
    // @ts-ignore
    images: undefined,
    ...props,
  });
  const validated = (await validator.validate(model))[0];
  t.is(validated.property, 'images');
  t.deepEqual(keys(validated.constraints), ['isDefined', 'arrayNotEmpty']);
});

test("should raise error when images don't have at least one member", async t => {
  const { images, ...props } = productModel;
  const model = new ProductModel({
    images: [],
    ...props,
  });
  const validated = (await validator.validate(model))[0];
  t.is(validated.property, 'images');
  t.deepEqual(keys(validated.constraints), ['arrayNotEmpty']);
});

test('should raise error when images are not valid urls', async t => {
  const { images, ...props } = productModel;
  const model = new ProductModel({
    images: [new ImageModel({ src: 'abc', alt: 'Some description' })],
    ...props,
  });
  const validated = (await validator.validate(model))[0];
  t.is(validated.property, 'images');
  t.is(validated.children[0].property, '0');
  t.is(validated.children[0].children[0].property, 'src');
  t.deepEqual(keys(validated.children[0].children[0].constraints), ['isUrl']);
});

test('should raise error when price is not defined', async t => {
  const { price, ...props } = productModel;
  const model = new ProductModel({
    // @ts-ignore
    price: undefined,
    ...props,
  });
  const validated = (await validator.validate(model))[0];
  t.is(validated.property, 'price');
  t.deepEqual(keys(validated.constraints), ['isDefined', 'isNumber']);
});

test('should raise error when price is not valid', async t => {
  const { price, ...props } = productModel;
  const model = new ProductModel({
    // @ts-ignore
    price: 'abc',
    ...props,
  });
  const validated = (await validator.validate(model))[0];
  t.is(validated.property, 'price');
  t.deepEqual(keys(validated.constraints), ['isNumber']);
});
