import { Document } from 'mongoose';

export interface RoleSchemaInterface extends Document {
  readonly id: string;
  readonly name: string;
}
