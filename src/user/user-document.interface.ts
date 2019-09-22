import { Document } from 'mongoose';
import { UserModel } from './user.model';

export interface UserDocumentInterface extends Document, UserModel {}
