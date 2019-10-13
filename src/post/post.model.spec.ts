import test from 'ava';
import { PostModel } from './post.model';
import { Validator } from 'class-validator';

let postModel: PostModel;
let validator: Validator;

test.before(() => {
  postModel = PostModel.MOCK;
  validator = new Validator();
});

test('should contain title', t => {
  t.is(postModel.title, PostModel.MOCK_PROPERTIES.title);
});

test('should contain subtitle', t => {
  t.is(postModel.subtitle, PostModel.MOCK_PROPERTIES.subtitle);
});

test('should contain content', t => {
  t.is(postModel.content, PostModel.MOCK_PROPERTIES.content);
});

test('should contain image', t => {
  t.is(postModel.image, PostModel.MOCK_PROPERTIES.image);
});

test('should contain state', t => {
  t.is(postModel.state, PostModel.MOCK_PROPERTIES.state);
});

test('should contain labels', t => {
  t.is(postModel.labels, PostModel.MOCK_PROPERTIES.labels);
});

test('should contain createdBy', t => {
  t.is(postModel.createdBy, PostModel.MOCK_PROPERTIES.createdBy);
});

test('should contain section', t => {
  t.is(postModel.section, PostModel.MOCK_PROPERTIES.section);
});

test('should raise error when title is not string', async t => {
  const model = new PostModel(
    // @ts-ignore
    123,
    PostModel.MOCK_PROPERTIES.subtitle,
    PostModel.MOCK_PROPERTIES.content,
    PostModel.MOCK_PROPERTIES.image,
    PostModel.MOCK_PROPERTIES.state,
    PostModel.MOCK_PROPERTIES.labels,
    PostModel.MOCK_PROPERTIES.createdBy,
    PostModel.MOCK_PROPERTIES.section,
    PostModel.MOCK_PROPERTIES.id,
    PostModel.MOCK_PROPERTIES.updatedBy,
    PostModel.MOCK_PROPERTIES.createdAt,
    PostModel.MOCK_PROPERTIES.updatedAt,
  );
  const validated = await validator.validate(model);
  t.deepEqual(
    validated[0].toString(),
    'An instance of PostModel has failed the validation:\n' +
      ' - property title has failed the following constraints: length, isString \n',
  );
});

test('should raise error when subtitle is not string', async t => {
  const model = new PostModel(
    PostModel.MOCK_PROPERTIES.title,
    // @ts-ignore
    123,
    PostModel.MOCK_PROPERTIES.content,
    PostModel.MOCK_PROPERTIES.image,
    PostModel.MOCK_PROPERTIES.state,
    PostModel.MOCK_PROPERTIES.labels,
    PostModel.MOCK_PROPERTIES.createdBy,
    PostModel.MOCK_PROPERTIES.section,
    PostModel.MOCK_PROPERTIES.id,
    PostModel.MOCK_PROPERTIES.updatedBy,
    PostModel.MOCK_PROPERTIES.createdAt,
    PostModel.MOCK_PROPERTIES.updatedAt,
  );
  const validated = await validator.validate(model);
  t.deepEqual(
    validated[0].toString(),
    'An instance of PostModel has failed the validation:\n' +
      ' - property subtitle has failed the following constraints: length, isString \n',
  );
});

test('should raise error when content is not string', async t => {
  const model = new PostModel(
    PostModel.MOCK_PROPERTIES.title,
    PostModel.MOCK_PROPERTIES.subtitle,
    // @ts-ignore
    123,
    PostModel.MOCK_PROPERTIES.image,
    PostModel.MOCK_PROPERTIES.state,
    PostModel.MOCK_PROPERTIES.labels,
    PostModel.MOCK_PROPERTIES.createdBy,
    PostModel.MOCK_PROPERTIES.section,
    PostModel.MOCK_PROPERTIES.id,
    PostModel.MOCK_PROPERTIES.updatedBy,
    PostModel.MOCK_PROPERTIES.createdAt,
    PostModel.MOCK_PROPERTIES.updatedAt,
  );
  const validated = await validator.validate(model);
  t.deepEqual(
    validated[0].toString(),
    'An instance of PostModel has failed the validation:\n' +
      ' - property content has failed the following constraints: isString \n',
  );
});

test('should raise error when image is not url', async t => {
  const model = new PostModel(
    PostModel.MOCK_PROPERTIES.title,
    PostModel.MOCK_PROPERTIES.subtitle,
    PostModel.MOCK_PROPERTIES.content,
    'abc',
    PostModel.MOCK_PROPERTIES.state,
    PostModel.MOCK_PROPERTIES.labels,
    PostModel.MOCK_PROPERTIES.createdBy,
    PostModel.MOCK_PROPERTIES.section,
    PostModel.MOCK_PROPERTIES.id,
    PostModel.MOCK_PROPERTIES.updatedBy,
    PostModel.MOCK_PROPERTIES.createdAt,
    PostModel.MOCK_PROPERTIES.updatedAt,
  );
  const validated = await validator.validate(model);
  t.deepEqual(
    validated[0].toString(),
    'An instance of PostModel has failed the validation:\n' +
      ' - property image has failed the following constraints: isUrl \n',
  );
});

test('should raise validation error when state is not enum', async t => {
  const model = new PostModel(
    PostModel.MOCK_PROPERTIES.title,
    PostModel.MOCK_PROPERTIES.subtitle,
    PostModel.MOCK_PROPERTIES.content,
    PostModel.MOCK_PROPERTIES.image,
    // @ts-ignore
    'abc',
    PostModel.MOCK_PROPERTIES.labels,
    PostModel.MOCK_PROPERTIES.createdBy,
    PostModel.MOCK_PROPERTIES.section,
    PostModel.MOCK_PROPERTIES.id,
    PostModel.MOCK_PROPERTIES.updatedBy,
    PostModel.MOCK_PROPERTIES.createdAt,
    PostModel.MOCK_PROPERTIES.updatedAt,
  );
  const validated = await validator.validate(model);
  t.is(
    validated[0].toString(),
    'An instance of PostModel has failed the validation:\n' +
      ' - property state has failed the following constraints: isEnum \n',
  );
});

test('should raise validation error when labels are not array of strings', async t => {
  const model = new PostModel(
    PostModel.MOCK_PROPERTIES.title,
    PostModel.MOCK_PROPERTIES.subtitle,
    PostModel.MOCK_PROPERTIES.content,
    PostModel.MOCK_PROPERTIES.image,
    PostModel.MOCK_PROPERTIES.state,
    // @ts-ignore
    'abc',
    PostModel.MOCK_PROPERTIES.createdBy,
    PostModel.MOCK_PROPERTIES.section,
    PostModel.MOCK_PROPERTIES.id,
    PostModel.MOCK_PROPERTIES.updatedBy,
    PostModel.MOCK_PROPERTIES.createdAt,
    PostModel.MOCK_PROPERTIES.updatedAt,
  );
  const validated = await validator.validate(model);
  t.is(
    validated[0].toString(),
    'An instance of PostModel has failed the validation:\n' +
      ' - property labels has failed the following constraints: isArray \n',
  );
});

test('should raise validation error when createdBy is not ObjectId', async t => {
  const model = new PostModel(
    PostModel.MOCK_PROPERTIES.title,
    PostModel.MOCK_PROPERTIES.subtitle,
    PostModel.MOCK_PROPERTIES.content,
    PostModel.MOCK_PROPERTIES.image,
    PostModel.MOCK_PROPERTIES.state,
    PostModel.MOCK_PROPERTIES.labels,
    // @ts-ignore
    'abc',
    PostModel.MOCK_PROPERTIES.section,
    PostModel.MOCK_PROPERTIES.id,
    PostModel.MOCK_PROPERTIES.updatedBy,
    PostModel.MOCK_PROPERTIES.createdAt,
    PostModel.MOCK_PROPERTIES.updatedAt,
  );
  const validated = await validator.validate(model);
  t.is(
    validated[0].toString(),
    'An instance of PostModel has failed the validation:\n' +
      ' - property createdBy has failed the following constraints: isMongoId \n',
  );
});

test('should raise validation error when section is not ObjectId', async t => {
  const model = new PostModel(
    PostModel.MOCK_PROPERTIES.title,
    PostModel.MOCK_PROPERTIES.subtitle,
    PostModel.MOCK_PROPERTIES.content,
    PostModel.MOCK_PROPERTIES.image,
    PostModel.MOCK_PROPERTIES.state,
    PostModel.MOCK_PROPERTIES.labels,
    PostModel.MOCK_PROPERTIES.createdBy,
    // @ts-ignore
    'abc',
    PostModel.MOCK_PROPERTIES.id,
    PostModel.MOCK_PROPERTIES.updatedBy,
    PostModel.MOCK_PROPERTIES.createdAt,
    PostModel.MOCK_PROPERTIES.updatedAt,
  );
  const validated = await validator.validate(model);
  t.is(
    validated[0].toString(),
    'An instance of PostModel has failed the validation:\n' +
      ' - property section has failed the following constraints: isMongoId \n',
  );
});

test('should raise validation error when id is not ObjectId', async t => {
  const model = new PostModel(
    PostModel.MOCK_PROPERTIES.title,
    PostModel.MOCK_PROPERTIES.subtitle,
    PostModel.MOCK_PROPERTIES.content,
    PostModel.MOCK_PROPERTIES.image,
    PostModel.MOCK_PROPERTIES.state,
    PostModel.MOCK_PROPERTIES.labels,
    PostModel.MOCK_PROPERTIES.createdBy,
    PostModel.MOCK_PROPERTIES.section,
    'abc',
    PostModel.MOCK_PROPERTIES.updatedBy,
    PostModel.MOCK_PROPERTIES.createdAt,
    PostModel.MOCK_PROPERTIES.updatedAt,
  );
  const validated = await validator.validate(model);
  t.is(
    validated[0].toString(),
    'An instance of PostModel has failed the validation:\n' +
      ' - property id has failed the following constraints: isMongoId \n',
  );
});

test('should raise validation error when updatedBy is not ObjectId', async t => {
  const model = new PostModel(
    PostModel.MOCK_PROPERTIES.title,
    PostModel.MOCK_PROPERTIES.subtitle,
    PostModel.MOCK_PROPERTIES.content,
    PostModel.MOCK_PROPERTIES.image,
    PostModel.MOCK_PROPERTIES.state,
    PostModel.MOCK_PROPERTIES.labels,
    PostModel.MOCK_PROPERTIES.createdBy,
    PostModel.MOCK_PROPERTIES.section,
    PostModel.MOCK_PROPERTIES.id,
    'abc',
    PostModel.MOCK_PROPERTIES.createdAt,
    PostModel.MOCK_PROPERTIES.updatedAt,
  );
  const validated = await validator.validate(model);
  t.is(
    validated[0].toString(),
    'An instance of PostModel has failed the validation:\n' +
      ' - property updatedBy has failed the following constraints: isMongoId \n',
  );
});

test('should raise validation error when createdAt is not ObjectId', async t => {
  const model = new PostModel(
    PostModel.MOCK_PROPERTIES.title,
    PostModel.MOCK_PROPERTIES.subtitle,
    PostModel.MOCK_PROPERTIES.content,
    PostModel.MOCK_PROPERTIES.image,
    PostModel.MOCK_PROPERTIES.state,
    PostModel.MOCK_PROPERTIES.labels,
    PostModel.MOCK_PROPERTIES.createdBy,
    PostModel.MOCK_PROPERTIES.section,
    PostModel.MOCK_PROPERTIES.id,
    PostModel.MOCK_PROPERTIES.updatedBy,
    'abc',
    PostModel.MOCK_PROPERTIES.updatedAt,
  );
  const validated = await validator.validate(model);
  t.is(
    validated[0].toString(),
    'An instance of PostModel has failed the validation:\n' +
      ' - property createdAt has failed the following constraints: isDateString \n',
  );
});

test('should raise validation error when updatedAt is not ObjectId', async t => {
  const model = new PostModel(
    PostModel.MOCK_PROPERTIES.title,
    PostModel.MOCK_PROPERTIES.subtitle,
    PostModel.MOCK_PROPERTIES.content,
    PostModel.MOCK_PROPERTIES.image,
    PostModel.MOCK_PROPERTIES.state,
    PostModel.MOCK_PROPERTIES.labels,
    PostModel.MOCK_PROPERTIES.createdBy,
    PostModel.MOCK_PROPERTIES.section,
    PostModel.MOCK_PROPERTIES.id,
    PostModel.MOCK_PROPERTIES.updatedBy,
    PostModel.MOCK_PROPERTIES.updatedAt,
    'abc',
  );
  const validated = await validator.validate(model);
  t.is(
    validated[0].toString(),
    'An instance of PostModel has failed the validation:\n' +
      ' - property updatedAt has failed the following constraints: isDateString \n',
  );
});
