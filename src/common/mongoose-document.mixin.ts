import { Constructor } from '../generics/constructor';
import { Document } from 'mongoose';

export function MongooseDocumentMixin<T extends Constructor>(Base: T) {
  return Object.setPrototypeOf(Base, Document.prototype);
}
