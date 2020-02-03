import { Types } from 'mongoose';
import { PasswordSchema } from '../schemas/password.schema';
import { ROLE_MODEL } from './role.schema';
import { BaseScheme } from '../schemas/base.schema';

export const USER_MODEL = 'User';

export const UserSchema = new PasswordSchema(
  {
    _id: { type: Types.ObjectId },
    forname: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    roles: [{ type: Types.ObjectId, ref: ROLE_MODEL }],
    l10n: {
      type: [
        new BaseScheme({
          language: { type: String, required: true },
          location: { type: String, required: true },
        }),
      ],
      required: true,
      validate: [value => value.length > 0, 'Require l10n for user'],
    },
  },
  {
    versionKey: false,
    toJSON: {
      // To work with mongoose-intl
      virtuals: true,
    },
  },
);
