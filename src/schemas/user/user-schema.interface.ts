import { Document } from 'mongoose';

export interface UserSchemaInterface extends Document {
  readonly id: string;
  readonly forname: string;
  readonly surname: string;
  readonly email: string;
  readonly password: string;
  readonly roles: string[];
}
