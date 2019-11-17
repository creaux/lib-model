import { IsNumber } from 'class-validator';

export class RequestCollectionModel {
  @IsNumber()
  public readonly skip!: number;

  constructor(model: RequestCollectionModel) {
    this.skip = 0;
    Object.assign(this, model);
  }
}
