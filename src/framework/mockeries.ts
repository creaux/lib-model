import 'reflect-metadata';
import { BuilderInterface } from '../generics/builder.interface';
import { Injectable, Injector } from './injector';
import { Constructor } from '../generics/constructor.type';

export interface MockeriesInterface<T = object> extends BuilderInterface<T> {
  mock(): object;
}

enum MockeriesType {
  CLASS = 'mockeries:class',
  INSTANCE = 'mockeries:instance',
}

function define(type: MockeriesType, mock: Object, target: Function) {
  Reflect.defineMetadata(type, mock, target);
}

function get(type: MockeriesType, target: any): typeof target {
  return Reflect.getMetadata(type, target) as IterableIterator<typeof target>;
}

function has(type: MockeriesType, target: Function): boolean {
  return Reflect.hasMetadata(type, target);
}

function factorize(mockeries: MockeriesInterface) {
  return function* mock(count = 1) {
    for (let i = 0; i < count; i++) {
      yield mockeries.mock();
    }
  };
}

function instantiate(target: any, multi = 0) {
  if (has(MockeriesType.INSTANCE, target)) {
    throw new Error(`There is already exists mock on ${target.name}`);
  }

  const mock = get(MockeriesType.CLASS, target);

  if (multi > 0) {
    define(MockeriesType.INSTANCE, [...mock(multi)], target);
  } else {
    define(MockeriesType.INSTANCE, mock().next().value, target);
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

export function AssignMockeries(token: Constructor<MockeriesInterface>): ClassDecorator {
  return target => {
    const mock = factorize(Injector.resolve<MockeriesInterface>(token));
    define(MockeriesType.CLASS, mock, target);
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
      return method.apply(this, ...mocks.values());
    };
  };
}

@Injectable()
export class Mockeries {
  public retrieve(target: Function): Object | Function {
    return get(MockeriesType.CLASS, target);
  }

  public resolve(target: any): typeof target {
    const instance = get(MockeriesType.INSTANCE, target);
    if (instance) {
      return instance;
    }
    throw new Error(`There is no mock INSTANCE of class ${target.name}.`);
  }

  public prepare(target: Constructor, multi: number) {
    return instantiate(target, multi);
  }

  public clean(target: Constructor) {
    return clean(target);
  }
}

export const mockeries = new Mockeries();
