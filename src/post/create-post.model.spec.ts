import test from 'ava';
import { CreatePostModel } from './create-post.model';
import { Validator } from 'class-validator';
import { PostStateEnum } from './post-state.enum';

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
    {
      // @ts-ignore
      title: 123,
      subtitle: CreatePostModel.MOCK_PROPERTIES.subtitle,
      content: CreatePostModel.MOCK_PROPERTIES.content,
      image: CreatePostModel.MOCK_PROPERTIES.image,
      state: CreatePostModel.MOCK_PROPERTIES.state,
      labels: CreatePostModel.MOCK_PROPERTIES.labels,
      createdBy: CreatePostModel.MOCK_PROPERTIES.createdBy,
      section: CreatePostModel.MOCK_PROPERTIES.section,
    },
  );
  const validated = await validator.validate(model);
  t.deepEqual(
    validated[0].toString(),
    'An instance of CreatePostModel has failed the validation:\n' +
      ' - property title has failed the following constraints: length, isString \n',
  );
});

test('should raise error when subtitle is not string', async t => {
  const model = new CreatePostModel({
    title: CreatePostModel.MOCK_PROPERTIES.title,
    // @ts-ignore
    subtitle: 123,
    content: CreatePostModel.MOCK_PROPERTIES.content,
    image: CreatePostModel.MOCK_PROPERTIES.image,
    state: CreatePostModel.MOCK_PROPERTIES.state,
    labels: CreatePostModel.MOCK_PROPERTIES.labels,
    createdBy: CreatePostModel.MOCK_PROPERTIES.createdBy,
    section: CreatePostModel.MOCK_PROPERTIES.section,
  });
  const validated = await validator.validate(model);
  t.deepEqual(
    validated[0].toString(),
    'An instance of CreatePostModel has failed the validation:\n' +
      ' - property subtitle has failed the following constraints: length, isString \n',
  );
});

test('should raise error when content is not string', async t => {
  const model = new CreatePostModel({
    title: CreatePostModel.MOCK_PROPERTIES.title,
    subtitle: CreatePostModel.MOCK_PROPERTIES.subtitle,
    // @ts-ignore
    content: 123,
    image: CreatePostModel.MOCK_PROPERTIES.image,
    state: CreatePostModel.MOCK_PROPERTIES.state,
    labels: CreatePostModel.MOCK_PROPERTIES.labels,
    createdBy: CreatePostModel.MOCK_PROPERTIES.createdBy,
    section: CreatePostModel.MOCK_PROPERTIES.section,
  });
  const validated = await validator.validate(model);
  t.deepEqual(
    validated[0].toString(),
    'An instance of CreatePostModel has failed the validation:\n' +
      ' - property content has failed the following constraints: isString \n',
  );
});

test('should raise error when image is not url', async t => {
  const model = new CreatePostModel({
    title: CreatePostModel.MOCK_PROPERTIES.title,
    subtitle: CreatePostModel.MOCK_PROPERTIES.subtitle,
    content: CreatePostModel.MOCK_PROPERTIES.content,
    image: 'abc',
    state: CreatePostModel.MOCK_PROPERTIES.state,
    labels: CreatePostModel.MOCK_PROPERTIES.labels,
    createdBy: CreatePostModel.MOCK_PROPERTIES.createdBy,
    section: CreatePostModel.MOCK_PROPERTIES.section,
  });
  const validated = await validator.validate(model);
  t.deepEqual(
    validated[0].toString(),
    'An instance of CreatePostModel has failed the validation:\n' +
      ' - property image has failed the following constraints: isUrl \n',
  );
});

test('should raise validation error when state is not enum', async t => {
  const model = new CreatePostModel({
    title: CreatePostModel.MOCK_PROPERTIES.title,
    subtitle: CreatePostModel.MOCK_PROPERTIES.subtitle,
    content: CreatePostModel.MOCK_PROPERTIES.content,
    image: CreatePostModel.MOCK_PROPERTIES.image,
    // @ts-ignore
    state: 'abc',
    labels: CreatePostModel.MOCK_PROPERTIES.labels,
    createdBy: CreatePostModel.MOCK_PROPERTIES.createdBy,
    section: CreatePostModel.MOCK_PROPERTIES.section,
  });
  const validated = await validator.validate(model);
  t.is(
    validated[0].toString(),
    'An instance of CreatePostModel has failed the validation:\n' +
      ' - property state has failed the following constraints: isEnum \n',
  );
});

test('should raise validation error when labels are not array of strings', async t => {
  const model = new CreatePostModel({
    title: CreatePostModel.MOCK_PROPERTIES.title,
    subtitle: CreatePostModel.MOCK_PROPERTIES.subtitle,
    content: CreatePostModel.MOCK_PROPERTIES.content,
    image: CreatePostModel.MOCK_PROPERTIES.image,
    state: CreatePostModel.MOCK_PROPERTIES.state,
    // @ts-ignore
    labels: 123,
    createdBy: CreatePostModel.MOCK_PROPERTIES.createdBy,
    section: CreatePostModel.MOCK_PROPERTIES.section,
  });
  const validated = await validator.validate(model);
  t.is(
    validated[0].toString(),
    'An instance of CreatePostModel has failed the validation:\n' +
      ' - property labels has failed the following constraints: isArray \n',
  );
});

test('should raise validation error when createdBy is not ObjectId', async t => {
  const model = new CreatePostModel({
    title: CreatePostModel.MOCK_PROPERTIES.title,
    subtitle: CreatePostModel.MOCK_PROPERTIES.subtitle,
    content: CreatePostModel.MOCK_PROPERTIES.content,
    image: CreatePostModel.MOCK_PROPERTIES.image,
    state: CreatePostModel.MOCK_PROPERTIES.state,
    labels: CreatePostModel.MOCK_PROPERTIES.labels,
    // @ts-ignore
    createdBy: 'abc',
    section: CreatePostModel.MOCK_PROPERTIES.section,
  });
  const validated = await validator.validate(model);
  t.is(
    validated[0].toString(),
    'An instance of CreatePostModel has failed the validation:\n' +
      ' - property createdBy has failed the following constraints: isMongoId \n',
  );
});

test('should raise validation error when section is not ObjectId', async t => {
  const model = new CreatePostModel({
    title: CreatePostModel.MOCK_PROPERTIES.title,
    subtitle: CreatePostModel.MOCK_PROPERTIES.subtitle,
    content: CreatePostModel.MOCK_PROPERTIES.content,
    image: CreatePostModel.MOCK_PROPERTIES.image,
    state: CreatePostModel.MOCK_PROPERTIES.state,
    labels: CreatePostModel.MOCK_PROPERTIES.labels,
    createdBy: CreatePostModel.MOCK_PROPERTIES.createdBy,
    // @ts-ignore
    section: 'abc',
  });
  const validated = await validator.validate(model);
  t.is(
    validated[0].toString(),
    'An instance of CreatePostModel has failed the validation:\n' +
      ' - property section has failed the following constraints: isMongoId \n',
  );
});
