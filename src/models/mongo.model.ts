import { IsMongoId } from 'class-validator';

export class MongoModel {
  @IsMongoId()
  public readonly id!: string;

  constructor(model: MongoModel) {
    Object.assign(this, model);
  }
}
