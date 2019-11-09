import { IsString } from 'class-validator';

export class CreateCategoryModel {
  @IsString()
  public name: string;

  constructor(name: string) {
    this.name = name;
  }
}
