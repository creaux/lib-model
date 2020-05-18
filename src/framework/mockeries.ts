import 'reflect-metadata';
import { BuilderInterface } from '../generics/builder.interface';
import { Injectable, Injector } from './injector';
import { Constructor } from '../generics/constructor.type';

export interface MockeriesInterface<T = object> extends BuilderInterface<T> {
  mock(): T;
  statics?: () => T[];
}

enum MockeriesType {
  CLASS = 'mockeries:class',
  INSTANCE = 'mockeries:instance',
}

function define(type: MockeriesType, mock: object, target: Constructor) {
  Reflect.defineMetadata(type, mock, target);
}

function get(type: MockeriesType, target: any): typeof target {
  return Reflect.getMetadata(type, target) as IterableIterator<typeof target>;
}

function has(type: MockeriesType, target: Constructor): boolean {
  return Reflect.hasMetadata(type, target);
}

function factorize(mockeries: MockeriesInterface) {
  return function* mock(count = 1) {
    for (let i = 0; i < count; i++) {
      yield mockeries.mock();
    }

    if (mockeries.statics) {
      for (const mockeri of mockeries.statics()) {
        yield mockeri;
      }
    }
  };
}

function instantiate<T>(target: Constructor & { statics?: Function }): T;
function instantiate<T>(target: Constructor & { statics?: Function }, multi: number): T[];
function instantiate(target: Constructor & { statics?: Function }, multi = 0) {
  if (has(MockeriesType.INSTANCE, target)) {
    throw new Error(`There is already exists mock on ${target.name}`);
  }

  if (!has(MockeriesType.CLASS, target)) {
    throw new Error(`Mockeries for ${target.name} are not assigned`);
  }

  const mock = get(MockeriesType.CLASS, target);

  if (multi > 0) {
    const mocks = [...mock(multi)];
    define(MockeriesType.INSTANCE, mocks, target);
    return mocks;
  } else {
    const mocks = mock().next().value;
    define(MockeriesType.INSTANCE, mocks, target);
    return mocks;
  }
}

function create(target: Constructor, multi = 0) {
  const mock = get(MockeriesType.CLASS, target);

  if (multi > 0) {
    return [...mock(multi)];
  } else {
    return mock().next().value;
  }
}

function clean(target: Constructor) {
  if (has(MockeriesType.INSTANCE, target)) {
    return Reflect.deleteMetadata(MockeriesType.INSTANCE, target);
  }
  console.warn(`There is no mock INSTANCE on ${target.name}`);
}

function resolve(Target: Constructor) {
  if (!has(MockeriesType.INSTANCE, Target)) {
    throw new Error(`There is missing mock INSTANCE for ${Target.name}`);
  }

  return get(MockeriesType.INSTANCE, Target);
}

export function AssignMockeries(mockeries: Constructor<MockeriesInterface>): ClassDecorator {
  return target => {
    const mock = factorize(Injector.resolve<MockeriesInterface>(mockeries));
    define(MockeriesType.CLASS, mock, (target as unknown) as Constructor);
  };
}

export function Retrieve(...models: Constructor[]): MethodDecorator {
  return (target: any, propertyKey: string | symbol, propertyDescriptor: PropertyDescriptor) => {
    const method = propertyDescriptor.value as Function;
    propertyDescriptor.value = function() {
      const mocks = new Set();

      for (const model of models) {
        mocks.add(resolve(model));
      }
      return method.call(this, ...mocks.values());
    };
  };
}

@Injectable()
export class Mockeries {
  public resolve<T extends object | object[]>(target: Constructor): T {
    const instance = get(MockeriesType.INSTANCE, target);
    if (instance) {
      return instance;
    }
    throw new Error(`There is no mock INSTANCE of class ${target.name}.`);
  }

  /**
   * Creates static instance mock on model
   * @param target
   * @param multi
   */
  public prepare<T extends object>(target: Constructor): T;
  public prepare<T extends object[]>(target: Constructor, multi: number): T;
  public prepare<T>(target: Constructor, multi = 0) {
    return instantiate<T>(target, multi);
  }

  public use(target: Constructor, mocks: object) {
    // TODO: mocks plainToClass
    define(MockeriesType.INSTANCE, mocks, target);
  }

  /**
   * Clean up mock from model
   * @param target
   */
  public clean(target: Constructor) {
    return clean(target);
  }

  /**
   * Create dynamic mock which is immediatelly returned
   * @param target
   * @param multi
   */
  public create<T extends object>(target: Constructor): T;
  public create<T extends object[]>(target: Constructor, multi: number): T;
  public create(target: Constructor, multi = 0) {
    return create(target, multi);
  }
}
