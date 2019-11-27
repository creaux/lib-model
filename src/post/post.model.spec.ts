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
  const model = new PostModel({
    // @ts-ignore
    title: 123,
    subtitle: PostModel.MOCK_PROPERTIES.subtitle,
    content: PostModel.MOCK_PROPERTIES.content,
    image: PostModel.MOCK_PROPERTIES.image,
    state: PostModel.MOCK_PROPERTIES.state,
    labels: PostModel.MOCK_PROPERTIES.labels,
    createdBy: PostModel.MOCK_PROPERTIES.createdBy,
    section: PostModel.MOCK_PROPERTIES.section,
    id: PostModel.MOCK_PROPERTIES.id,
    updatedBy: PostModel.MOCK_PROPERTIES.updatedBy,
    createdAt: PostModel.MOCK_PROPERTIES.createdAt,
    updatedAt: PostModel.MOCK_PROPERTIES.updatedAt,
  });
  const validated = await validator.validate(model);
  t.deepEqual(
    validated[0].toString(),
    'An instance of PostModel has failed the validation:\n' +
      ' - property title has failed the following constraints: length, isString \n',
  );
});

test('should raise error when subtitle is not string', async t => {
  const model = new PostModel({
    title: PostModel.MOCK_PROPERTIES.title,
    // @ts-ignore
    subtitle: 123,
    content: PostModel.MOCK_PROPERTIES.content,
    image: PostModel.MOCK_PROPERTIES.image,
    state: PostModel.MOCK_PROPERTIES.state,
    labels: PostModel.MOCK_PROPERTIES.labels,
    createdBy: PostModel.MOCK_PROPERTIES.createdBy,
    section: PostModel.MOCK_PROPERTIES.section,
    id: PostModel.MOCK_PROPERTIES.id,
    updatedBy: PostModel.MOCK_PROPERTIES.updatedBy,
    createdAt: PostModel.MOCK_PROPERTIES.createdAt,
    updatedAt: PostModel.MOCK_PROPERTIES.updatedAt,
  });
  const validated = await validator.validate(model);
  t.deepEqual(
    validated[0].toString(),
    'An instance of PostModel has failed the validation:\n' +
      ' - property subtitle has failed the following constraints: length, isString \n',
  );
});

test('should raise error when content is not string', async t => {
  const model = new PostModel({
    title: PostModel.MOCK_PROPERTIES.title,
    subtitle: PostModel.MOCK_PROPERTIES.subtitle,
    // @ts-ignore
    content: 123,
    image: PostModel.MOCK_PROPERTIES.image,
    state: PostModel.MOCK_PROPERTIES.state,
    labels: PostModel.MOCK_PROPERTIES.labels,
    createdBy: PostModel.MOCK_PROPERTIES.createdBy,
    section: PostModel.MOCK_PROPERTIES.section,
    id: PostModel.MOCK_PROPERTIES.id,
    updatedBy: PostModel.MOCK_PROPERTIES.updatedBy,
    createdAt: PostModel.MOCK_PROPERTIES.createdAt,
    updatedAt: PostModel.MOCK_PROPERTIES.updatedAt,
  });
  const validated = await validator.validate(model);
  t.deepEqual(
    validated[0].toString(),
    'An instance of PostModel has failed the validation:\n' +
      ' - property content has failed the following constraints: isString \n',
  );
});

test('should raise error when image is not url', async t => {
  const model = new PostModel({
    title: PostModel.MOCK_PROPERTIES.title,
    subtitle: PostModel.MOCK_PROPERTIES.subtitle,
    content: PostModel.MOCK_PROPERTIES.content,
    // @ts-ignore
    image: 'abc',
    state: PostModel.MOCK_PROPERTIES.state,
    labels: PostModel.MOCK_PROPERTIES.labels,
    createdBy: PostModel.MOCK_PROPERTIES.createdBy,
    section: PostModel.MOCK_PROPERTIES.section,
    id: PostModel.MOCK_PROPERTIES.id,
    updatedBy: PostModel.MOCK_PROPERTIES.updatedBy,
    createdAt: PostModel.MOCK_PROPERTIES.createdAt,
    updatedAt: PostModel.MOCK_PROPERTIES.updatedAt,
  });
  const validated = await validator.validate(model);
  t.deepEqual(
    validated[0].toString(),
    'An instance of PostModel has failed the validation:\n' +
      ' - property image has failed the following constraints: isUrl \n',
  );
});

test('should raise validation error when state is not enum', async t => {
  const model = new PostModel({
    title: PostModel.MOCK_PROPERTIES.title,
    subtitle: PostModel.MOCK_PROPERTIES.subtitle,
    content: PostModel.MOCK_PROPERTIES.content,
    image: PostModel.MOCK_PROPERTIES.image,
    // @ts-ignore
    state: 'abc',
    labels: PostModel.MOCK_PROPERTIES.labels,
    createdBy: PostModel.MOCK_PROPERTIES.createdBy,
    section: PostModel.MOCK_PROPERTIES.section,
    id: PostModel.MOCK_PROPERTIES.id,
    updatedBy: PostModel.MOCK_PROPERTIES.updatedBy,
    createdAt: PostModel.MOCK_PROPERTIES.createdAt,
    updatedAt: PostModel.MOCK_PROPERTIES.updatedAt,
  });
  const validated = await validator.validate(model);
  t.is(
    validated[0].toString(),
    'An instance of PostModel has failed the validation:\n' +
      ' - property state has failed the following constraints: isEnum \n',
  );
});

test('should raise validation error when labels are not array of strings', async t => {
  const model = new PostModel({
    title: PostModel.MOCK_PROPERTIES.title,
    subtitle: PostModel.MOCK_PROPERTIES.subtitle,
    content: PostModel.MOCK_PROPERTIES.content,
    image: PostModel.MOCK_PROPERTIES.image,
    state: PostModel.MOCK_PROPERTIES.state,
    // @ts-ignore
    labels: 'abc',
    createdBy: PostModel.MOCK_PROPERTIES.createdBy,
    section: PostModel.MOCK_PROPERTIES.section,
    id: PostModel.MOCK_PROPERTIES.id,
    updatedBy: PostModel.MOCK_PROPERTIES.updatedBy,
    createdAt: PostModel.MOCK_PROPERTIES.createdAt,
    updatedAt: PostModel.MOCK_PROPERTIES.updatedAt,
  });
  const validated = await validator.validate(model);
  t.is(
    validated[0].toString(),
    'An instance of PostModel has failed the validation:\n' +
      ' - property labels has failed the following constraints: isArray \n',
  );
});

test('should raise validation error when createdBy is not ObjectId', async t => {
  const model = new PostModel({
    title: PostModel.MOCK_PROPERTIES.title,
    subtitle: PostModel.MOCK_PROPERTIES.subtitle,
    content: PostModel.MOCK_PROPERTIES.content,
    image: PostModel.MOCK_PROPERTIES.image,
    state: PostModel.MOCK_PROPERTIES.state,
    labels: PostModel.MOCK_PROPERTIES.labels,
    // @ts-ignore
    createdBy: 'abc',
    section: PostModel.MOCK_PROPERTIES.section,
    id: PostModel.MOCK_PROPERTIES.id,
    updatedBy: PostModel.MOCK_PROPERTIES.updatedBy,
    createdAt: PostModel.MOCK_PROPERTIES.createdAt,
    updatedAt: PostModel.MOCK_PROPERTIES.updatedAt,
  });
  const validated = await validator.validate(model);
  t.is(
    validated[0].toString(),
    'An instance of PostModel has failed the validation:\n' +
      ' - property createdBy.createdBy has failed the following constraints: nestedValidation \n',
  );
});

test('should raise validation error when section is not ObjectId', async t => {
  const model = new PostModel({
    title: PostModel.MOCK_PROPERTIES.title,
    subtitle: PostModel.MOCK_PROPERTIES.subtitle,
    content: PostModel.MOCK_PROPERTIES.content,
    image: PostModel.MOCK_PROPERTIES.image,
    state: PostModel.MOCK_PROPERTIES.state,
    labels: PostModel.MOCK_PROPERTIES.labels,
    createdBy: PostModel.MOCK_PROPERTIES.createdBy,
    section: 'abc',
    id: PostModel.MOCK_PROPERTIES.id,
    updatedBy: PostModel.MOCK_PROPERTIES.updatedBy,
    createdAt: PostModel.MOCK_PROPERTIES.createdAt,
    updatedAt: PostModel.MOCK_PROPERTIES.updatedAt,
  });
  const validated = await validator.validate(model);
  t.is(
    validated[0].toString(),
    'An instance of PostModel has failed the validation:\n' +
      ' - property section has failed the following constraints: isMongoId \n',
  );
});

test('should raise validation error when id is not ObjectId', async t => {
  const model = new PostModel({
    title: PostModel.MOCK_PROPERTIES.title,
    subtitle: PostModel.MOCK_PROPERTIES.subtitle,
    content: PostModel.MOCK_PROPERTIES.content,
    image: PostModel.MOCK_PROPERTIES.image,
    state: PostModel.MOCK_PROPERTIES.state,
    labels: PostModel.MOCK_PROPERTIES.labels,
    createdBy: PostModel.MOCK_PROPERTIES.createdBy,
    section: PostModel.MOCK_PROPERTIES.section,
    id: 'abc',
    updatedBy: PostModel.MOCK_PROPERTIES.updatedBy,
    createdAt: PostModel.MOCK_PROPERTIES.createdAt,
    updatedAt: PostModel.MOCK_PROPERTIES.updatedAt,
  });
  const validated = await validator.validate(model);
  t.is(
    validated[0].toString(),
    'An instance of PostModel has failed the validation:\n' +
      ' - property id has failed the following constraints: isMongoId \n',
  );
});

test('should raise validation error when updatedBy is not ObjectId', async t => {
  const model = new PostModel({
    title: PostModel.MOCK_PROPERTIES.title,
    subtitle: PostModel.MOCK_PROPERTIES.subtitle,
    content: PostModel.MOCK_PROPERTIES.content,
    image: PostModel.MOCK_PROPERTIES.image,
    state: PostModel.MOCK_PROPERTIES.state,
    labels: PostModel.MOCK_PROPERTIES.labels,
    createdBy: PostModel.MOCK_PROPERTIES.createdBy,
    section: PostModel.MOCK_PROPERTIES.section,
    id: PostModel.MOCK_PROPERTIES.id,
    // @ts-ignore
    updatedBy: 'abc',
    createdAt: PostModel.MOCK_PROPERTIES.createdAt,
    updatedAt: PostModel.MOCK_PROPERTIES.updatedAt,
  });
  const validated = await validator.validate(model);
  t.is(
    validated[0].toString(),
    'An instance of PostModel has failed the validation:\n' +
      ' - property updatedBy.updatedBy has failed the following constraints: nestedValidation \n',
  );
});

test('should raise validation error when createdAt is not ObjectId', async t => {
  const model = new PostModel({
    title: PostModel.MOCK_PROPERTIES.title,
    subtitle: PostModel.MOCK_PROPERTIES.subtitle,
    content: PostModel.MOCK_PROPERTIES.content,
    image: PostModel.MOCK_PROPERTIES.image,
    state: PostModel.MOCK_PROPERTIES.state,
    labels: PostModel.MOCK_PROPERTIES.labels,
    createdBy: PostModel.MOCK_PROPERTIES.createdBy,
    section: PostModel.MOCK_PROPERTIES.section,
    id: PostModel.MOCK_PROPERTIES.id,
    updatedBy: PostModel.MOCK_PROPERTIES.updatedBy,
    createdAt: 'abc',
    updatedAt: PostModel.MOCK_PROPERTIES.updatedAt,
  });
  const validated = await validator.validate(model);
  t.is(
    validated[0].toString(),
    'An instance of PostModel has failed the validation:\n' +
      ' - property createdAt has failed the following constraints: isDateString \n',
  );
});

test('should raise validation error when updatedAt is not ObjectId', async t => {
  const model = new PostModel({
    title: PostModel.MOCK_PROPERTIES.title,
    subtitle: PostModel.MOCK_PROPERTIES.subtitle,
    content: PostModel.MOCK_PROPERTIES.content,
    image: PostModel.MOCK_PROPERTIES.image,
    state: PostModel.MOCK_PROPERTIES.state,
    labels: PostModel.MOCK_PROPERTIES.labels,
    createdBy: PostModel.MOCK_PROPERTIES.createdBy,
    section: PostModel.MOCK_PROPERTIES.section,
    id: PostModel.MOCK_PROPERTIES.id,
    updatedBy: PostModel.MOCK_PROPERTIES.updatedBy,
    createdAt: PostModel.MOCK_PROPERTIES.createdAt,
    updatedAt: 'abc',
  });
  const validated = await validator.validate(model);
  t.is(
    validated[0].toString(),
    'An instance of PostModel has failed the validation:\n' +
      ' - property updatedAt has failed the following constraints: isDateString \n',
  );
});
