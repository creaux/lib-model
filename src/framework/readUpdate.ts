import { Constructor } from '../generics/constructor.type';

export const READ_UPDATE_TOKEN = Symbol('READ_UPDATE_TOKEN');

export class AssignReadUpdateOptions {
  constructor(public read: Constructor, public update?: Constructor) {}
}

export function AssignReadUpdate(ruOptions: AssignReadUpdateOptions) {
  return (Target: Constructor) => {
    Reflect.defineMetadata(READ_UPDATE_TOKEN, ruOptions, Target);
    return Target;
  };
}

export class ReadUpdate {
  public static resolve(Target: Constructor) {
    return Reflect.getMetadata(READ_UPDATE_TOKEN, Target);
  }
}
