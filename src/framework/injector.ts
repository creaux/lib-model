import { Constructor } from '../generics/constructor.type';

export type GenericClassDecorator<T> = (target: T) => void;

/**
 * Class emits metadata only when it is decorated
 * design:paramtypes represent params of constructor
 * @constructor
 */
export const Injectable = (): GenericClassDecorator<Constructor<object>> => {
  return (target: Constructor): typeof target => {
    return target;
  };
};

export const Injector = new (class {
  resolve<T>(target: any): T {
    const tokens = Reflect.getMetadata('design:paramtypes', target) || [];
    const injections = tokens.map((token: Constructor) => Injector.resolve<any>(token));
    return new target(...injections);
  }
})();
