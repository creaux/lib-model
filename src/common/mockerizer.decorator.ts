import 'reflect-metadata';
import { ValueOf } from '../generics/ValueOf';
import { Constructor } from '../generics/constructor';

export const MOCK_TOKEN = Symbol('mockerizer:mock');

// TODO: Implement fake directly for numbers,words,imageUrls
export const Mockerizer = <T, K extends Constructor<T> = Constructor<T>>(
  properties: Record<keyof T, (...args: any[]) => ValueOf<T>>,
  mockModels?: {
    model: Constructor<any>;
    count?: number;
  }[],
): ((Target: K) => K) => {
  return (Target: K): K => {
    class Mock {
      constructor(private readonly count: number = 1) {
        if (this.count === 1) {
          // @ts-ignore
          return Mock.instance();
        }
      }

      private static instance() {
        let mocks = [];
        if (Array.isArray(mockModels)) {
          mocks = mockModels.map(mockModel => {
            const Mock = Reflect.getMetadata(MOCK_TOKEN, mockModel.model);
            if (mockModel.count === 1) {
              return new mockModel.model(new Mock(mockModel.count));
            }
            if (mockModel.count) {
              return [...new Mock(mockModel.count)].map(mock => new mockModel.model(mock));
            }
            return new Mock();
          });
        }
        const result: { [key: string]: ValueOf<T> } = {};
        for (const key in properties) {
          if (properties.hasOwnProperty(key)) {
            result[key] = properties[key](...mocks);
          }
        }
        return result;
      }

      *[Symbol.iterator]() {
        for (let i = 0; i < this.count; i++) {
          yield Mock.instance();
        }
      }
    }

    Reflect.defineMetadata(MOCK_TOKEN, Mock, Target);

    return Target;
  };
};
