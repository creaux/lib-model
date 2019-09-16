import { Types } from 'mongoose';

export class UserModel {
  constructor(
    public readonly _id: Types.ObjectId,
    public readonly forname: string,
    public readonly surname: string,
    public readonly email: string,
    public readonly password: string
  ) {}
}
