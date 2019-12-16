import { ValueOf } from '../generics/ValueOf';
import { Model } from './model.abstract';

export abstract class ModelMap<T, K> extends Model {
  protected readonly map: Map<K, ValueOf<T>>;

  protected get(key: K): ValueOf<T> | undefined {
    return this.map.get(key);
  }

  protected set(key: K, value: ValueOf<T>) {
    this.map.set(key, value);
  }

  constructor() {
    super();

    this.map = new Map();
  }
}
