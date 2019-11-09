import { IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class MongoModel {
  @IsMongoId()
  public readonly id!: string;

  constructor(model: MongoModel) {
    Object.assign(this, model);
  }

  public get objectId(): Types.ObjectId {
    return Types.ObjectId(this.id);
  }
}
