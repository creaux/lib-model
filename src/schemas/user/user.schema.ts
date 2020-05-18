import { Types } from 'mongoose';
import { PasswordSchema } from '../password.schema';
import { BaseScheme } from '../base.schema';
import { LanguageEnum } from '../../enums/language.enum';
import { LocationEnum } from '../../enums/location.enum';
import { SchemaName } from '../../enums/schema-name';

export const UserSchema = new PasswordSchema(
  {
    _id: { type: Types.ObjectId },
    forname: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    roles: { type: [Types.ObjectId], ref: SchemaName.ROLE },
    l10n: {
      type: new BaseScheme(
        {
          language: { type: String, required: true, enum: [...Object.values(LanguageEnum)] },
          location: { type: String, required: true, enum: [...Object.values(LocationEnum)] },
        },
        { _id: false },
      ),
      required: [true, 'require l10n for user'],
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
