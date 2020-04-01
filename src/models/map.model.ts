export abstract class MapModel<C, O = Omit<C, 'map' | 'set' | 'get'>, K = keyof O, V = O[keyof O]> {
  private readonly _map = new Map<K, V>();

  public set(key: K, value: V) {
    this._map.set(key, value);
  }

  public get(key: K): V | undefined {
    return this._map.get(key);
  }
}
