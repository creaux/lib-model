import test from 'ava';
import { CreatePostModel } from './create-post.model';
import { Validator, ValidationError } from 'class-validator';

let createPostModel: CreatePostModel;
let validator: Validator;

test.before(() => {
  createPostModel = CreatePostModel.MOCK;
  validator = new Validator();
});

test('should contain title', t => {
  t.is(createPostModel.title, CreatePostModel.MOCK_PROPERTIES.title);
});

test('should contain subtitle', t => {
  t.is(createPostModel.subtitle, CreatePostModel.MOCK_PROPERTIES.subtitle);
});

test('should contain content', t => {
  t.is(createPostModel.content, CreatePostModel.MOCK_PROPERTIES.content);
});

test('should contain image', t => {
  t.is(createPostModel.image, CreatePostModel.MOCK_PROPERTIES.image);
});

test('should contain state', t => {
  t.is(createPostModel.state, CreatePostModel.MOCK_PROPERTIES.state);
});

test('should contain labels', t => {
  t.is(createPostModel.labels, CreatePostModel.MOCK_PROPERTIES.labels);
});

test('should contain createdBy', t => {
  t.is(createPostModel.createdBy, CreatePostModel.MOCK_PROPERTIES.createdBy);
});

test('should contain section', t => {
  t.is(createPostModel.section, CreatePostModel.MOCK_PROPERTIES.section);
});

test('should raise error when title is not string', async t => {
  const model = new CreatePostModel(
    // @ts-ignore
    123,
    CreatePostModel.MOCK_PROPERTIES.subtitle,
    CreatePostModel.MOCK_PROPERTIES.content,
    CreatePostModel.MOCK_PROPERTIES.image,
    CreatePostModel.MOCK_PROPERTIES.state,
    CreatePostModel.MOCK_PROPERTIES.labels,
    CreatePostModel.MOCK_PROPERTIES.createdBy,
    CreatePostModel.MOCK_PROPERTIES.section,
  );
  const validated = await validator.validate(model);
  t.deepEqual(
    validated[0].toString(),
    'An instance of CreatePostModel has failed the validation:\n' +
      ' - property title has failed the following constraints: length, isString \n',
  );
});

test('should raise error when subtitle is not string', async t => {
  const model = new CreatePostModel(
    CreatePostModel.MOCK_PROPERTIES.title,
    // @ts-ignore
    123,
    CreatePostModel.MOCK_PROPERTIES.content,
    CreatePostModel.MOCK_PROPERTIES.image,
    CreatePostModel.MOCK_PROPERTIES.state,
    CreatePostModel.MOCK_PROPERTIES.labels,
    CreatePostModel.MOCK_PROPERTIES.createdBy,
    CreatePostModel.MOCK_PROPERTIES.section,
  );
  const validated = await validator.validate(model);
  t.deepEqual(
    validated[0].toString(),
    'An instance of CreatePostModel has failed the validation:\n' +
      ' - property subtitle has failed the following constraints: length, isString \n',
  );
});

test('should raise error when content is not string', async t => {
  const model = new CreatePostModel(
    CreatePostModel.MOCK_PROPERTIES.title,
    CreatePostModel.MOCK_PROPERTIES.subtitle,
    // @ts-ignore
    123,
    CreatePostModel.MOCK_PROPERTIES.image,
    CreatePostModel.MOCK_PROPERTIES.state,
    CreatePostModel.MOCK_PROPERTIES.labels,
    CreatePostModel.MOCK_PROPERTIES.createdBy,
    CreatePostModel.MOCK_PROPERTIES.section,
  );
  const validated = await validator.validate(model);
  t.deepEqual(
    validated[0].toString(),
    'An instance of CreatePostModel has failed the validation:\n' +
      ' - property content has failed the following constraints: isString \n',
  );
});

test('should raise error when image is not url', async t => {
  const model = new CreatePostModel(
    CreatePostModel.MOCK_PROPERTIES.title,
    CreatePostModel.MOCK_PROPERTIES.subtitle,
    CreatePostModel.MOCK_PROPERTIES.content,
    'abc',
    CreatePostModel.MOCK_PROPERTIES.state,
    CreatePostModel.MOCK_PROPERTIES.labels,
    CreatePostModel.MOCK_PROPERTIES.createdBy,
    CreatePostModel.MOCK_PROPERTIES.section,
  );
  const validated = await validator.validate(model);
  t.deepEqual(
    validated[0].toString(),
    'An instance of CreatePostModel has failed the validation:\n' +
      ' - property image has failed the following constraints: isUrl \n',
  );
});

test('should raise validation error when state is not enum', async t => {
  const model = new CreatePostModel(
    CreatePostModel.MOCK_PROPERTIES.title,
    CreatePostModel.MOCK_PROPERTIES.subtitle,
    CreatePostModel.MOCK_PROPERTIES.content,
    CreatePostModel.MOCK_PROPERTIES.image,
    // @ts-ignore
    'abc',
    CreatePostModel.MOCK_PROPERTIES.labels,
    CreatePostModel.MOCK_PROPERTIES.createdBy,
    CreatePostModel.MOCK_PROPERTIES.section,
  );
  const validated = await validator.validate(model);
  t.is(
    validated[0].toString(),
    'An instance of CreatePostModel has failed the validation:\n' +
      ' - property state has failed the following constraints: isEnum \n',
  );
});

test('should raise validation error when labels are not array of strings', async t => {
  const model = new CreatePostModel(
    CreatePostModel.MOCK_PROPERTIES.title,
    CreatePostModel.MOCK_PROPERTIES.subtitle,
    CreatePostModel.MOCK_PROPERTIES.content,
    CreatePostModel.MOCK_PROPERTIES.image,
    CreatePostModel.MOCK_PROPERTIES.state,
    // @ts-ignore
    'abc',
    CreatePostModel.MOCK_PROPERTIES.createdBy,
    CreatePostModel.MOCK_PROPERTIES.section,
  );
  const validated = await validator.validate(model);
  t.is(
    validated[0].toString(),
    'An instance of CreatePostModel has failed the validation:\n' +
      ' - property labels has failed the following constraints: isArray \n',
  );
});

test('should raise validation error when createdBy is not ObjectId', async t => {
  const model = new CreatePostModel(
    CreatePostModel.MOCK_PROPERTIES.title,
    CreatePostModel.MOCK_PROPERTIES.subtitle,
    CreatePostModel.MOCK_PROPERTIES.content,
    CreatePostModel.MOCK_PROPERTIES.image,
    CreatePostModel.MOCK_PROPERTIES.state,
    CreatePostModel.MOCK_PROPERTIES.labels,
    // @ts-ignore
    'abc',
    CreatePostModel.MOCK_PROPERTIES.section,
  );
  const validated = await validator.validate(model);
  t.is(
    validated[0].toString(),
    'An instance of CreatePostModel has failed the validation:\n' +
      ' - property createdBy has failed the following constraints: isMongoId \n',
  );
});

test('should raise validation error when section is not ObjectId', async t => {
  const model = new CreatePostModel(
    CreatePostModel.MOCK_PROPERTIES.title,
    CreatePostModel.MOCK_PROPERTIES.subtitle,
    CreatePostModel.MOCK_PROPERTIES.content,
    CreatePostModel.MOCK_PROPERTIES.image,
    CreatePostModel.MOCK_PROPERTIES.state,
    CreatePostModel.MOCK_PROPERTIES.labels,
    CreatePostModel.MOCK_PROPERTIES.createdBy,
    // @ts-ignore
    'abc',
  );
  const validated = await validator.validate(model);
  t.is(
    validated[0].toString(),
    'An instance of CreatePostModel has failed the validation:\n' +
      ' - property section has failed the following constraints: isMongoId \n',
  );
});
