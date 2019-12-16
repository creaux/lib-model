import { IsDefined, IsString } from 'class-validator';
import { ModelMap } from '../../common/model-map.abstract';
import { Mockerizer } from '../../common/mockerizer.decorator';
import { lorem } from 'faker';

@Mockerizer<CategoryModel>({
  name: () => lorem.words(3),
})
export class CategoryModel {
  @IsDefined()
  @IsString()
  public readonly name: string;

  constructor({ name }: CategoryModel) {
    this.name = name;
  }
}
