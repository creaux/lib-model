import { Types } from 'mongoose';
import { PasswordSchema } from '../schemas/password.schema';

export const UserSchema = new PasswordSchema(
  {
    _id: { type: Types.ObjectId },
    forname: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    versionKey: false,
    toJSON: {
      // To work with mongoose-intl
      virtuals: true,
    },
  },
);
