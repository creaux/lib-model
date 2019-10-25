import { BaseScheme } from './base.schema';
import { SchemaDefinition, SchemaOptions, Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

export interface PasswordDocument extends Document {
  password: string;
}

export class PasswordSchema extends BaseScheme {
  private static SALT_WORK_FACTOR = 10;

  public constructor(definition?: SchemaDefinition, options?: SchemaOptions) {
    super(definition, options);

    this.pre<PasswordDocument>('save', function(next): void {
      // only hash the password if it has been modified (or is new)
      if (!this.isModified('password')) {
        return next();
      }

      // generate a salt
      bcrypt.genSalt(PasswordSchema.SALT_WORK_FACTOR, (err: Error, salt: string): void => {
        if (err) {
          return next(err);
        }

        // hash the password using our new salt
        bcrypt.hash(this.password, salt, (err2: Error, hash: string): void => {
          if (err2) {
            return next(err2);
          }

          // override the cleartext password with the hashed one
          this.password = hash;
          next();
        });
      });
    });
  }
}
