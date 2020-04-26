import 'reflect-metadata';
import { CreatePostModel } from './create-post.model';
import { Validator } from 'class-validator';
import { Fiber } from '../../framework/preparator';
import { Injector } from '../../framework/injector';

const { keys } = Object;

describe('CreatePostModel', () => {
  let fiber: Fiber;
  let validator: Validator;
  let createPostModel: CreatePostModel;

  beforeAll(async () => {
    fiber = Injector.resolve(Fiber);
    createPostModel = await fiber.retrieveFromModel(CreatePostModel, 0);
    validator = new Validator();
  });

  describe('model properties types', () => {
    describe('title', () => {
      it('not defined', async () => {
        const { title, ...props } = createPostModel;
        const model = new CreatePostModel({
          // @ts-ignore
          title: undefined,
          ...props,
        });

        const validated = (await validator.validate(model))[0];

        expect(validated.property).toEqual('title');
        expect(keys(validated.constraints)).toEqual(['isDefined', 'length', 'isString']);
      });

      it('not a string', async () => {
        const { title, ...props } = createPostModel;
        const model = new CreatePostModel({
          // @ts-ignore
          title: 123,
          ...props,
        });

        const validated = (await validator.validate(model))[0];

        expect(validated.property).toEqual('title');
        expect(keys(validated.constraints)).toEqual(['length', 'isString']);
      });

      it('to short', async () => {
        const { title, ...props } = createPostModel;
        const model = new CreatePostModel({
          // @ts-ignore
          title: '',
          ...props,
        });

        const validated = (await validator.validate(model))[0];

        expect(validated.property).toEqual('title');
        expect(keys(validated.constraints)).toEqual(['length']);
      });

      it('to long', async () => {
        const { title, ...props } = createPostModel;
        const model = new CreatePostModel({
          // @ts-ignore
          title:
            'm9Xya6DE7qHnvBMOAKfsoR91qeaVqIC4FtCWOCzLHGv5S8pPm4XkcPYTR19lZlBewSsLFUAHrAeMSQlf5bAvu6horoBcJhv0Ifca3RsjVKBEF8QZ8Ws8gCcNS',
          ...props,
        });

        const validated = (await validator.validate(model))[0];

        expect(validated.property).toEqual('title');
        expect(keys(validated.constraints)).toEqual(['length']);
      });
    });

    describe('subtitle', () => {
      it('not defined', async () => {
        const { subtitle, ...props } = createPostModel;
        const model = new CreatePostModel({
          // @ts-ignore
          subtitle: undefined,
          ...props,
        });

        const validated = (await validator.validate(model))[0];

        expect(validated.property).toEqual('subtitle');
        expect(keys(validated.constraints)).toEqual(['isDefined', 'length', 'isString']);
      });

      it('not a string', async () => {
        const { subtitle, ...props } = createPostModel;
        const model = new CreatePostModel({
          // @ts-ignore
          subtitle: 123,
          ...props,
        });

        const validated = (await validator.validate(model))[0];

        expect(validated.property).toEqual('subtitle');
        expect(keys(validated.constraints)).toEqual(['length', 'isString']);
      });

      it('to short', async () => {
        const { subtitle, ...props } = createPostModel;
        const model = new CreatePostModel({
          // @ts-ignore
          subtitle: '',
          ...props,
        });

        const validated = (await validator.validate(model))[0];

        expect(validated.property).toEqual('subtitle');
        expect(keys(validated.constraints)).toEqual(['length']);
      });

      it('to long', async () => {
        const { subtitle, ...props } = createPostModel;
        const model = new CreatePostModel({
          // @ts-ignore
          subtitle:
            'nSnlNQXBTj1CftTF4S96Nj7gZCWhbmpJTRyG9spe5NDKO5cezVzgnK9qaL9pSyAU7BwgFcdYd49EWZr9XsuT45y52ShAcHE3EZLcJHY8C7NbI1KYrhJKFnLlnfwB0mgZkrZ6wDg1jyBZ3neiQmY3biFdagjmwqcu84bCunlDTBYdH1cgW0EhoMOyXblSBv5kdtjZqiWDdCebxr603DP9a02UovXrtrmd80QLKaBdAt1E2ehr36tIP4CuOfJCU165Sl1h91wyfeW7b3yNohsAlyDS5rLnfmQ0k16qJ4mnPGYwOg8rKjycdWFtG0NOg2vy5HlhSYzkW2nO2itx5XKvZOnrhAQEHAeRty0slA7oZ',
          ...props,
        });

        const validated = (await validator.validate(model))[0];

        expect(validated.property).toEqual('subtitle');
        expect(keys(validated.constraints)).toEqual(['length']);
      });
    });

    describe('content', () => {
      it('not defined', async () => {
        const { content, ...props } = createPostModel;
        const model = new CreatePostModel({
          // @ts-ignore
          content: undefined,
          ...props,
        });

        const validated = (await validator.validate(model))[0];

        expect(validated.property).toEqual('content');
        expect(keys(validated.constraints)).toEqual(['isDefined', 'length', 'isString']);
      });

      it('not a string', async () => {
        const { content, ...props } = createPostModel;
        const model = new CreatePostModel({
          // @ts-ignore
          content: 123,
          ...props,
        });

        const validated = (await validator.validate(model))[0];

        expect(validated.property).toEqual('content');
        expect(keys(validated.constraints)).toEqual(['length', 'isString']);
      });

      it('to short', async () => {
        const { content, ...props } = createPostModel;
        const model = new CreatePostModel({
          // @ts-ignore
          content: '',
          ...props,
        });

        const validated = (await validator.validate(model))[0];

        expect(validated.property).toEqual('content');
        expect(keys(validated.constraints)).toEqual(['length']);
      });
    });

    describe('image', () => {
      it('not defined', async () => {
        const { image, ...props } = createPostModel;
        const model = new CreatePostModel({
          // @ts-ignore
          image: undefined,
          ...props,
        });

        const validated = (await validator.validate(model))[0];

        expect(validated.property).toEqual('image');
        expect(keys(validated.constraints)).toEqual(['isDefined', 'isUrl']);
      });

      it('not url', async () => {
        const { image, ...props } = createPostModel;
        const model = new CreatePostModel({
          // @ts-ignore
          image: '546',
          ...props,
        });

        const validated = (await validator.validate(model))[0];

        expect(validated.property).toEqual('image');
        expect(keys(validated.constraints)).toEqual(['isUrl']);
      });
    });

    describe('image', () => {
      it('not defined', async () => {
        const { state, ...props } = createPostModel;
        const model = new CreatePostModel({
          // @ts-ignore
          state: undefined,
          ...props,
        });

        const validated = (await validator.validate(model))[0];

        expect(validated.property).toEqual('state');
        expect(keys(validated.constraints)).toEqual(['isDefined', 'isEnum']);
      });

      it('not enum', async () => {
        const { state, ...props } = createPostModel;
        const model = new CreatePostModel({
          // @ts-ignore
          state: 'abc',
          ...props,
        });

        const validated = (await validator.validate(model))[0];

        expect(validated.property).toEqual('state');
        expect(keys(validated.constraints)).toEqual(['isEnum']);
      });
    });

    describe('labels', () => {
      it('not defined', async () => {
        const { labels, ...props } = createPostModel;
        const model = new CreatePostModel({
          // @ts-ignore
          labels: undefined,
          ...props,
        });

        const validated = (await validator.validate(model))[0];

        expect(validated.property).toEqual('labels');
        expect(keys(validated.constraints)).toEqual(['isArray']);
      });
    });

    describe('createdBy', () => {
      it('not defined', async () => {
        const { createdBy, ...props } = createPostModel;
        const model = new CreatePostModel({
          // @ts-ignore
          createdBy: undefined,
          ...props,
        });

        const validated = (await validator.validate(model))[0];

        expect(validated.property).toEqual('createdBy');
        expect(keys(validated.constraints)).toEqual(['isDefined', 'isMongoId']);
      });

      it('not mongo id', async () => {
        const { createdBy, ...props } = createPostModel;
        const model = new CreatePostModel({
          // @ts-ignore
          createdBy: '13545',
          ...props,
        });

        const validated = (await validator.validate(model))[0];

        expect(validated.property).toEqual('createdBy');
        expect(keys(validated.constraints)).toEqual(['isMongoId']);
      });
    });

    describe('section', () => {
      it('not defined', async () => {
        const { section, ...props } = createPostModel;
        const model = new CreatePostModel({
          // @ts-ignore
          section: undefined,
          ...props,
        });

        const validated = (await validator.validate(model))[0];

        expect(validated.property).toEqual('section');
        expect(keys(validated.constraints)).toEqual(['isDefined', 'isMongoId']);
      });

      it('not mongo id', async () => {
        const { section, ...props } = createPostModel;
        const model = new CreatePostModel({
          // @ts-ignore
          section: '13545',
          ...props,
        });

        const validated = (await validator.validate(model))[0];

        expect(validated.property).toEqual('section');
        expect(keys(validated.constraints)).toEqual(['isMongoId']);
      });
    });
  });
});
