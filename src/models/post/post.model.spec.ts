import 'reflect-metadata';
import { PostModel } from './post.model';
import { Validator } from 'class-validator';
import { MockeriesFiber } from '../../framework/preparator';
import { Injector } from '../../framework/injector';
import { ImageModel } from '../image/image.model';
import { UserModel } from '../user/user.model';
import { L10nModel } from '../l10n/l10n.model';
import { RoleModel } from '../role/role.model';
import { SectionModel } from '../section/section.model';

describe('PostModel', () => {
  let fiber: MockeriesFiber;
  let postModel: PostModel;
  let validator: Validator;

  beforeEach(() => {
    fiber = Injector.resolve(MockeriesFiber);
    fiber.prepareMockeries(ImageModel);
    fiber.prepareMockeries(L10nModel);
    fiber.prepareMockeries(RoleModel);
    fiber.prepareMockeries(UserModel);
    fiber.prepareMockeries(SectionModel);
    fiber.prepareMockeries(PostModel);
    postModel = fiber.retrieveMockeries(PostModel);
    validator = new Validator();
  });

  afterEach(() => {
    fiber.cleanMockeries(ImageModel);
    fiber.cleanMockeries(L10nModel);
    fiber.cleanMockeries(RoleModel);
    fiber.cleanMockeries(UserModel);
    fiber.cleanMockeries(SectionModel);
    fiber.cleanMockeries(PostModel);
  });

  test('should contain title', () => {
    expect(postModel.title).toEqual(postModel.title);
  });

  test('should contain subtitle', () => {
    expect(postModel.subtitle).toEqual(postModel.subtitle);
  });

  test('should contain content', () => {
    expect(postModel.content).toEqual(postModel.content);
  });

  test('should contain image', () => {
    expect(postModel.image).toEqual(postModel.image);
  });

  test('should contain state', () => {
    expect(postModel.state).toEqual(postModel.state);
  });

  test('should contain labels', () => {
    expect(postModel.labels).toEqual(postModel.labels);
  });

  test('should contain createdBy', () => {
    expect(postModel.createdBy).toEqual(postModel.createdBy);
  });

  test('should contain section', () => {
    expect(postModel.section).toEqual(postModel.section);
  });

  test('should raise error when title is not string', async () => {
    const model = new PostModel({
      // @ts-ignore
      title: 123,
      subtitle: postModel.subtitle,
      content: postModel.content,
      image: postModel.image,
      state: postModel.state,
      labels: postModel.labels,
      createdBy: postModel.createdBy,
      section: postModel.section,
      id: postModel.id,
      updatedBy: postModel.updatedBy,
      createdAt: postModel.createdAt,
      updatedAt: postModel.updatedAt,
    });
    const validated = await validator.validate(model);
    expect(validated[0].toString()).toEqual(
      'An instance of PostModel has failed the validation:\n' +
        ' - property title has failed the following constraints: length, isString \n',
    );
  });

  test('should raise error when subtitle is not string', async () => {
    const model = new PostModel({
      title: postModel.title,
      // @ts-ignore
      subtitle: 123,
      content: postModel.content,
      image: postModel.image,
      state: postModel.state,
      labels: postModel.labels,
      createdBy: postModel.createdBy,
      section: postModel.section,
      id: postModel.id,
      updatedBy: postModel.updatedBy,
      createdAt: postModel.createdAt,
      updatedAt: postModel.updatedAt,
    });
    const validated = await validator.validate(model);
    expect(validated[0].toString()).toEqual(
      'An instance of PostModel has failed the validation:\n' +
        ' - property subtitle has failed the following constraints: length, isString \n',
    );
  });

  test('should raise error when content is not string', async () => {
    const model = new PostModel({
      title: postModel.title,
      subtitle: postModel.subtitle,
      // @ts-ignore
      content: 123,
      image: postModel.image,
      state: postModel.state,
      labels: postModel.labels,
      createdBy: postModel.createdBy,
      section: postModel.section,
      id: postModel.id,
      updatedBy: postModel.updatedBy,
      createdAt: postModel.createdAt,
      updatedAt: postModel.updatedAt,
    });
    const validated = await validator.validate(model);
    expect(validated[0].toString()).toEqual(
      'An instance of PostModel has failed the validation:\n' +
        ' - property content has failed the following constraints: isString \n',
    );
  });

  test('should raise error when image is not url', async () => {
    const model = new PostModel({
      title: postModel.title,
      subtitle: postModel.subtitle,
      content: postModel.content,
      // @ts-ignore
      image: 'abc',
      state: postModel.state,
      labels: postModel.labels,
      createdBy: postModel.createdBy,
      section: postModel.section,
      id: postModel.id,
      updatedBy: postModel.updatedBy,
      createdAt: postModel.createdAt,
      updatedAt: postModel.updatedAt,
    });
    const validated = await validator.validate(model);
    expect(validated[0].toString()).toEqual(
      'An instance of PostModel has failed the validation:\n' +
        ' - property image.image has failed the following constraints: nestedValidation \n',
    );
  });

  test('should raise validation error when state is not enum', async () => {
    const model = new PostModel({
      title: postModel.title,
      subtitle: postModel.subtitle,
      content: postModel.content,
      image: postModel.image,
      // @ts-ignore
      state: 'abc',
      labels: postModel.labels,
      createdBy: postModel.createdBy,
      section: postModel.section,
      id: postModel.id,
      updatedBy: postModel.updatedBy,
      createdAt: postModel.createdAt,
      updatedAt: postModel.updatedAt,
    });
    const validated = await validator.validate(model);
    expect(validated[0].toString()).toEqual(
      'An instance of PostModel has failed the validation:\n' +
        ' - property state has failed the following constraints: isEnum \n',
    );
  });

  test('should raise validation error when labels are not array of strings', async () => {
    const model = new PostModel({
      title: postModel.title,
      subtitle: postModel.subtitle,
      content: postModel.content,
      image: postModel.image,
      state: postModel.state,
      // @ts-ignore
      labels: 'abc',
      createdBy: postModel.createdBy,
      section: postModel.section,
      id: postModel.id,
      updatedBy: postModel.updatedBy,
      createdAt: postModel.createdAt,
      updatedAt: postModel.updatedAt,
    });
    const validated = await validator.validate(model);
    expect(validated[0].toString()).toEqual(
      'An instance of PostModel has failed the validation:\n' +
        ' - property labels has failed the following constraints: isArray \n',
    );
  });

  test('should raise validation error when createdBy is not ObjectId', async () => {
    const model = new PostModel({
      title: postModel.title,
      subtitle: postModel.subtitle,
      content: postModel.content,
      image: postModel.image,
      state: postModel.state,
      labels: postModel.labels,
      // @ts-ignore
      createdBy: 'abc',
      section: postModel.section,
      id: postModel.id,
      updatedBy: postModel.updatedBy,
      createdAt: postModel.createdAt,
      updatedAt: postModel.updatedAt,
    });
    const validated = await validator.validate(model);
    expect(validated[0].toString()).toEqual(
      'An instance of PostModel has failed the validation:\n' +
        ' - property createdBy.createdBy has failed the following constraints: nestedValidation \n',
    );
  });

  test('should raise validation error when section is not ObjectId', async () => {
    const model = new PostModel({
      title: postModel.title,
      subtitle: postModel.subtitle,
      content: postModel.content,
      image: postModel.image,
      state: postModel.state,
      labels: postModel.labels,
      createdBy: postModel.createdBy,
      // @ts-ignore
      section: 'abc',
      id: postModel.id,
      updatedBy: postModel.updatedBy,
      createdAt: postModel.createdAt,
      updatedAt: postModel.updatedAt,
    });
    const validated = await validator.validate(model);
    expect(validated[0].toString()).toEqual(
      'An instance of PostModel has failed the validation:\n' +
        ' - property section has failed the following constraints: isMongoId \n',
    );
  });

  test('should raise validation error when id is not ObjectId', async () => {
    const model = new PostModel({
      title: postModel.title,
      subtitle: postModel.subtitle,
      content: postModel.content,
      image: postModel.image,
      state: postModel.state,
      labels: postModel.labels,
      createdBy: postModel.createdBy,
      section: postModel.section,
      id: 'abc',
      updatedBy: postModel.updatedBy,
      createdAt: postModel.createdAt,
      updatedAt: postModel.updatedAt,
    });
    const validated = await validator.validate(model);
    expect(validated[0].toString()).toEqual(
      'An instance of PostModel has failed the validation:\n' +
        ' - property id has failed the following constraints: isMongoId \n',
    );
  });

  test('should raise validation error when updatedBy is not ObjectId', async () => {
    const model = new PostModel({
      title: postModel.title,
      subtitle: postModel.subtitle,
      content: postModel.content,
      image: postModel.image,
      state: postModel.state,
      labels: postModel.labels,
      createdBy: postModel.createdBy,
      section: postModel.section,
      id: postModel.id,
      // @ts-ignore
      updatedBy: 'abc',
      createdAt: postModel.createdAt,
      updatedAt: postModel.updatedAt,
    });
    const validated = await validator.validate(model);
    expect(validated[0].toString()).toEqual(
      'An instance of PostModel has failed the validation:\n' +
        ' - property updatedBy.updatedBy has failed the following constraints: nestedValidation \n',
    );
  });

  test('should raise validation error when createdAt is not ObjectId', async () => {
    const model = new PostModel({
      title: postModel.title,
      subtitle: postModel.subtitle,
      content: postModel.content,
      image: postModel.image,
      state: postModel.state,
      labels: postModel.labels,
      createdBy: postModel.createdBy,
      section: postModel.section,
      id: postModel.id,
      updatedBy: postModel.updatedBy,
      createdAt: 'abc',
      updatedAt: postModel.updatedAt,
    });
    const validated = await validator.validate(model);
    expect(validated[0].toString()).toEqual(
      'An instance of PostModel has failed the validation:\n' +
        ' - property createdAt has failed the following constraints: isDateString \n',
    );
  });

  test('should raise validation error when updatedAt is not ObjectId', async () => {
    const model = new PostModel({
      title: postModel.title,
      subtitle: postModel.subtitle,
      content: postModel.content,
      image: postModel.image,
      state: postModel.state,
      labels: postModel.labels,
      createdBy: postModel.createdBy,
      section: postModel.section,
      id: postModel.id,
      updatedBy: postModel.updatedBy,
      createdAt: postModel.createdAt,
      updatedAt: 'abc',
    });
    const validated = await validator.validate(model);
    expect(validated[0].toString()).toEqual(
      'An instance of PostModel has failed the validation:\n' +
        ' - property updatedAt has failed the following constraints: isDateString \n',
    );
  });
});
