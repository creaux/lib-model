import { ModelMap } from '../common/model-map.abstract';

export type ModelMapParams<T, K> = Readonly<Pick<T, Exclude<keyof T, keyof ModelMap<T, K>>>>;
