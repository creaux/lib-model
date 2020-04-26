import { AssignMockeries, Mockeries, MockeriesInterface } from './mockeries';
import { Injector } from './injector';
import { BuilderInterface } from '../generics/builder.interface';
import { Types } from 'mongoose';
import instantiate = WebAssembly.instantiate;

class TestModelBuilder implements BuilderInterface<TestModel> {
  protected id!: string;

  withId(id: string) {
    this.id = id;
    return this;
  }

  build(): TestModel {
    return new TestModel({
      id: this.id,
    });
  }
}

class TestModelMockeries extends TestModelBuilder implements MockeriesInterface<TestModel> {
  mockId() {
    this.withId(Types.ObjectId().toHexString());
    return this;
  }

  mock(): TestModel {
    return this.mockId().build();
  }
}

@AssignMockeries(TestModelMockeries)
class TestModel {
  public id!: string;

  constructor(params: TestModel) {
    Object.assign(this, params);
  }
}

describe('Mockeries', () => {
  let mockeries: Mockeries;
  let testModelMock: TestModel | TestModel[];

  beforeEach(() => {
    mockeries = Injector.resolve<Mockeries>(Mockeries);
  });

  afterEach(() => {
    mockeries.clean(TestModel);
  });

  it('should prepare one mock on model', () => {
    testModelMock = mockeries.prepare<TestModel>(TestModel);
    expect(testModelMock).toBeTruthy();
    expect(testModelMock instanceof Array).toBeFalsy();
    expect(testModelMock instanceof TestModel).toBeTruthy();
  });

  it('should prepare more than one mock', () => {
    testModelMock = mockeries.prepare<TestModel[]>(TestModel, 2);
    expect(testModelMock).toBeTruthy();
    expect(testModelMock instanceof Array).toBeTruthy();
    expect(testModelMock.length).toBe(2);
    const resolved = mockeries.resolve<TestModel[]>(TestModel);
    expect(resolved instanceof Array).toBeTruthy();
    expect(resolved.length).toBe(2);
  });

  it('should save mock to model metadata', () => {
    testModelMock = mockeries.prepare<TestModel>(TestModel);
    const resolved = mockeries.resolve<TestModel>(TestModel);
    expect(testModelMock).toEqual(resolved);
  });

  it('should create one dynamic mock', () => {
    testModelMock = mockeries.create<TestModel>(TestModel);
    expect(testModelMock instanceof TestModel).toBeTruthy();
  });

  it('should create more one dynamic mock', () => {
    testModelMock = mockeries.create<TestModel[]>(TestModel, 2);
    expect(testModelMock instanceof Array).toBeTruthy();
  });

  it('should create one mock without saving it to metadata instance', () => {
    testModelMock = mockeries.create<TestModel>(TestModel);
    expect(() => mockeries.resolve(TestModel)).toThrow(new Error('There is no mock INSTANCE of class TestModel.'));
  });

  it('should clean mock from model metadata', () => {
    testModelMock = mockeries.prepare<TestModel>(TestModel);
    mockeries.clean(TestModel);
    expect(() => mockeries.resolve(TestModel)).toThrow(new Error('There is no mock INSTANCE of class TestModel.'));
  });
});
