import { Types } from 'mongoose';
import { IsMongoId } from 'class-validator';

export abstract class CreateEntityAbstract {
  @IsMongoId()
  public readonly _id: string = Types.ObjectId().toHexString();
}
