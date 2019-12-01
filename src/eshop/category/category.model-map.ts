import { IsDefined, IsString } from 'class-validator';
import { ModelMap } from '../../common/model-map.abstract';
import { ModelMapParams } from '../../generics/model-map-params';
import { ModelMock } from '../../common/model-mock.decorator';
import { lorem } from 'faker';

@ModelMock({
  name: () => lorem.words(3),
})
export class CategoryModelMap extends ModelMap<CategoryModelMap, typeof CategoryModelMap.KEYS> {
  public static KEYS = {
    NAME: Symbol('name'),
  };

  @IsDefined()
  @IsString()
  public set name(value: string) {
    this.map.set(CategoryModelMap.KEYS.NAME, value);
  }

  public get name(): string {
    return this.map.get(CategoryModelMap.KEYS.NAME) as string;
  }

  constructor({ name }: ModelMapParams<CategoryModelMap, typeof CategoryModelMap.KEYS>) {
    super();

    this.name = name;
  }
}
