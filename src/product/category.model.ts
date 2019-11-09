import { IsString } from 'class-validator';

export class CategoryModel {
  @IsString()
  public name: string;

  constructor(name: string) {
    this.name = name;
  }
}
