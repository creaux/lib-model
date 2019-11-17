import { Document } from 'mongoose';

export interface AuthSchemaInterface extends Document {
  id?: string;
  user: string;
  token: string;
  createdAt?: string;
}
