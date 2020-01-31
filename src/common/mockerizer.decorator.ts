import 'reflect-metadata';

export const MOCK_TOKEN = Symbol('mockerizer:mock');

// TODO: Implement fake directly for numbers,words,imageUrls
export const Mockerizer = <T, E extends string = '', K = new (...args: any[]) => T, O = Omit<T, E>>(
  properties: Record<keyof O, (...args: any[]) => O[keyof O]>,
  mockModels?: {
    model: new (...args: any[]) => any;
    count?: number;
  }[],
): ((Target: K) => K) => {
  return Target => {
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
        const result: { [key: string]: O[keyof O] } = {};
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
