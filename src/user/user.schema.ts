import { Types, SchemaDefinition, SchemaOptions } from 'mongoose';
import { PasswordSchema } from '../schemas/password.schema';
import { ROLE_MODEL } from './role.schema';

export const USER_MODEL = 'users';

// class UserSchemaIs extends PasswordSchema {
//   constructor(definition?: SchemaDefinition, options?: SchemaOptions) {
//     super(definition, options);

//     this.virtual('roles').get(function(this: { roles: Types.ObjectId[] }): string | undefined {
//       if (!!this.roles) {
//         this.roles.
//         return this._id.toHexString();
//       }
//       return undefined;
//     });

//     this.set('toObject', {
//       virtuals: true,
//       transform: (_, ret) => {
//         delete ret._id;
//       },
//     });

//     this.set('toJSON', {
//       virtuals: true,
//       transform: (_, ret) => {
//         delete ret._id;
//       },
//     });
//   }
// }

export const UserSchema = new PasswordSchema(
  {
    _id: { type: Types.ObjectId },
    forname: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    roles: [{ type: Types.ObjectId, ref: ROLE_MODEL }],
  },
  {
    versionKey: false,
    toJSON: {
      // To work with mongoose-intl
      virtuals: true,
    },
  },
);
