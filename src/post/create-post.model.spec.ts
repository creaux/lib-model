import { CreatePostModel } from './create-post.model';
import { Validator } from 'class-validator';

describe('CreatePostModel', () => {
  let createPostModel: CreatePostModel;
  let validator: Validator;

  beforeEach(() => {
    createPostModel = CreatePostModel.MOCK;
    validator = new Validator();
  });

  it('should contain title', () => {
    expect(createPostModel.title).toEqual(CreatePostModel.MOCK_PROPERTIES.title);
  });

  it('should contain subtitle', () => {
    expect(createPostModel.subtitle).toEqual(CreatePostModel.MOCK_PROPERTIES.subtitle);
  });

  it('should contain content', () => {
    expect(createPostModel.content).toEqual(CreatePostModel.MOCK_PROPERTIES.content);
  });

  it('should contain image', () => {
    expect(createPostModel.image).toEqual(CreatePostModel.MOCK_PROPERTIES.image);
  });

  it('should contain state', () => {
    expect(createPostModel.state).toEqual(CreatePostModel.MOCK_PROPERTIES.state);
  });

  it('should contain labels', () => {
    expect(createPostModel.labels).toEqual(CreatePostModel.MOCK_PROPERTIES.labels);
  });

  it('should contain createdBy', () => {
    expect(createPostModel.createdBy).toEqual(CreatePostModel.MOCK_PROPERTIES.createdBy);
  });

  it('should contain section', () => {
    expect(createPostModel.section).toEqual(CreatePostModel.MOCK_PROPERTIES.section);
  });

  it('should raise error when title is not string', async () => {
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
    expect(validated[0].toString()).toEqual(
      'An instance of CreatePostModel has failed the validation:\n' +
        ' - property title has failed the following constraints: length, isString \n',
    );
  });

  it('should raise error when subtitle is not string', async () => {
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
    expect(validated[0].toString()).toEqual(
      'An instance of CreatePostModel has failed the validation:\n' +
        ' - property subtitle has failed the following constraints: length, isString \n',
    );
  });

  it('should raise error when content is not string', async () => {
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
    expect(validated[0].toString()).toEqual(
      'An instance of CreatePostModel has failed the validation:\n' +
        ' - property content has failed the following constraints: length, isString \n',
    );
  });

  it('should raise error when image is not url', async () => {
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
    expect(validated[0].toString()).toEqual(
      'An instance of CreatePostModel has failed the validation:\n' +
        ' - property image has failed the following constraints: isUrl \n',
    );
  });

  it('should raise validation error when state is not enum', async () => {
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
    expect(validated[0].toString()).toEqual(
      'An instance of CreatePostModel has failed the validation:\n' +
        ' - property state has failed the following constraints: isEnum \n',
    );
  });

  it('should raise validation error when labels are not array of strings', async () => {
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
    expect(validated[0].toString()).toEqual(
      'An instance of CreatePostModel has failed the validation:\n' +
        ' - property labels has failed the following constraints: isArray \n',
    );
  });

  it('should raise validation error when createdBy is not ObjectId', async () => {
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
    expect(validated[0].toString()).toEqual(
      'An instance of CreatePostModel has failed the validation:\n' +
        ' - property createdBy has failed the following constraints: isMongoId \n',
    );
  });

  it('should raise validation error when section is not ObjectId', async () => {
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
    expect(validated[0].toString()).toEqual(
      'An instance of CreatePostModel has failed the validation:\n' +
        ' - property section has failed the following constraints: isMongoId \n',
    );
  });
});
