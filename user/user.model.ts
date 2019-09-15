import { Types } from 'mongoose';

export interface IUserModel {
  readonly _id: Types.ObjectId;
  readonly forname: string;
  readonly surname: string;
  readonly email: string;
  readonly password: string;
}
