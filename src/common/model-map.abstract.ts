import { ValueOf } from '../generics/ValueOf';
import { Model } from './model.abstract';

export abstract class ModelMap<T, K> extends Model {
  public static readonly KEYS: any;

  protected readonly map: Map<ValueOf<K>, ValueOf<T>>;

  public get(key: ValueOf<K>): ValueOf<T> | undefined {
    return this.map.get(key);
  }

  public set(key: ValueOf<K>, value: ValueOf<T>) {
    this.map.set(key, value);
  }

  constructor() {
    super();

    this.map = new Map();
  }
}
