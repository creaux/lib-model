import { IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class DeletePostModel {
  @IsMongoId()
  public readonly id: string;

  public constructor(id: string) {
    this.id = id;
  }

  public get objectId(): Types.ObjectId {
    return Types.ObjectId(this.id);
  }
}
