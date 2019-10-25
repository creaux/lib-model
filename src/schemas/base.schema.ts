import { Schema, SchemaDefinition, SchemaOptions, Types } from 'mongoose';

export class BaseScheme extends Schema {
  public constructor(definition?: SchemaDefinition, options?: SchemaOptions) {
    super(definition, options);

    this.virtual('id').get(function(this: { _id: Types.ObjectId }): string | undefined {
      if (!!this._id) {
        return this._id.toHexString();
      }
      return undefined;
    });

    this.set('toObject', {
      virtuals: true,
      transform: (_, ret) => {
        delete ret._id;
      },
    });

    this.set('toJSON', {
      virtuals: true,
      transform: (_, ret) => {
        delete ret._id;
      },
    });
  }
}
