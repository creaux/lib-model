export interface Constructor<T extends Record<string, any> = {}> {
  new (...args: any[]): T;
}
