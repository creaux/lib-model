import { Document } from 'mongoose';

export interface AuthSchemaInterface extends Document {
  id?: string;
  userId: string;
  token: string;
  createdAt?: string;
}
