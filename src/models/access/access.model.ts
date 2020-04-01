import { IAccessInfo } from 'accesscontrol';
import { Types } from 'mongoose';
import { CreateAccessModel } from './create-access.model';
import { IsMongoId } from 'class-validator';

export class AccessModel extends CreateAccessModel implements IAccessInfo {
  @IsMongoId()
  public readonly id!: Types.ObjectId;

  constructor(model: AccessModel) {
    super(model);
    Object.assign(this, model);
  }
}
