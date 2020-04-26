import { Fiber } from './preparator';
import { AssignMockeries, Mockeries, MockeriesInterface, Retrieve } from './mockeries';
import { AssignSchema, AssignSchemaOptions } from './schema';
import { BuilderInterface } from '../generics/builder.interface';
import { Injector } from './injector';
import { lorem } from 'faker';
import { BaseScheme } from '../schemas/base.schema';
import { Types } from 'mongoose';
import { SchemaName } from '../enums/schema-name';

abstract class TestingBuilderAbstract {
  protected title!: string;
}

class Testing1Builder extends TestingBuilderAbstract implements BuilderInterface {
  withTitle(title: string) {
    this.title = title;
  }

  build(): object {
    return new Testing1Model({ title: this.title });
  }
}

class Testing1Mockeries extends Testing1Builder implements MockeriesInterface {
  mockTitle() {
    this.withTitle(lorem.words(2));
    return this;
  }

  mock(): object {
    return this.mockTitle().build();
  }
}

const TestingSchema = new BaseScheme({
  _id: { type: Types.ObjectId },
  title: { type: String },
});

@AssignMockeries(Testing1Mockeries)
@AssignSchema(new AssignSchemaOptions(TestingSchema, SchemaName.TESTING1))
class Testing1Model {
  public title!: string;

  constructor(args: Testing1Model) {
    Object.assign(this, args);
  }
}

const Testing2Schema = new BaseScheme({
  _id: { type: Types.ObjectId },
  name: { type: String },
  testing1: { type: Types.ObjectId, ref: SchemaName.TESTING1 },
});

abstract class Testing2BuilderAbstract {
  protected name!: string;
  protected testing1!: Testing1Model;
}

class Testing2Builder extends Testing2BuilderAbstract implements BuilderInterface {
  withName(name: string) {
    this.name = name;
    return this;
  }

  withTesting1(testing1: Testing1Model) {
    this.testing1 = testing1;
    return this;
  }

  build(): object {
    return new Testing2Model({ name: this.name, testing1: this.testing1 });
  }
}

class Testing2Mockeries extends Testing2Builder implements MockeriesInterface {
  mockName() {
    return this.withName(lorem.word());
  }

  @Retrieve(Testing1Model)
  mockTesting1(testing1model?: Testing1Model) {
    // @ts-ignore
    return this.withTesting1(testing1model);
  }

  mock(): object {
    return this.mockName()
      .mockTesting1()
      .build();
  }
}

@AssignMockeries(Testing2Mockeries)
@AssignSchema(new AssignSchemaOptions(Testing2Schema, SchemaName.TESTING2))
class Testing2Model {
  public name!: string;

  public testing1!: Testing1Model;

  constructor(args: Testing2Model) {
    Object.assign(this, args);
  }
}

describe('Preparator', () => {
  let fiber: Fiber;
  let mockeries: Mockeries;

  beforeEach(async () => {
    mockeries = Injector.resolve<Mockeries>(Mockeries);
    fiber = Injector.resolve<Fiber>(Fiber);
    await fiber.createFromModel(Testing1Model);
    await fiber.createFromModel(Testing2Model);
  });

  afterEach(async () => {
    await fiber.tearDown();
  });

  it('should create model', async () => {
    const mongoData = await fiber.retrieveFromMongo(Testing1Model);
    const sessionData = await mockeries.resolve<Testing1Model>(Testing1Model);
    expect(mongoData).toEqual([sessionData]);
  });

  it('should create model with ref', async () => {
    const mongoData = await fiber.retrieveFromMongo(Testing2Model, [SchemaName.TESTING1]);
    const sessionData = await mockeries.resolve<Testing1Model>(Testing2Model);
    expect(mongoData).toEqual([sessionData]);
  });
});
