import 'reflect-metadata';

export const MOCK_TOKEN = Symbol('MOCK_TOKEN');

export function ModelMock<T extends { new (...args: any[]): { [key: string]: () => any } }>(properties: {
  [key: string]: () => any;
}) {
  return function classDecorator(Target: any) {
    class Mock {
      constructor(public readonly count: number = 1) {
        if (this.count === 1) {
          // @ts-ignore
          return Mock.instance();
        }
      }

      public static instance() {
        const result: { [key: string]: string } = {};
        for (const key in properties) {
          if (properties.hasOwnProperty(key)) {
            result[key] = (properties[key] as () => any)();
          }
        }
        return result;
      }

      public *[Symbol.iterator]() {
        for (let i = 0; i < this.count; i++) {
          yield Mock.instance();
        }
      }
    }

    Reflect.defineMetadata(MOCK_TOKEN, Mock, Target);

    return Target;
  };
}
