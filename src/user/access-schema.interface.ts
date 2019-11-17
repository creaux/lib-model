import { Document } from 'mongoose';

export interface AccessSchemaInterface extends Document {
  readonly id: string;

  readonly role: string | string[];

  readonly resource: string | string[];

  readonly attributes: string | string[];

  readonly action: string;

  readonly possession: string;

  readonly denied: boolean;
}
