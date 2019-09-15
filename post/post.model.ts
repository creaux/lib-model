import { Types, Document } from 'mongoose';
import { PostState } from './post-state.enum';

export interface PostModel extends Document {
  title: string;
  subtitle: string;
  content: string;
  image: string;
  state: PostState;
  labels: string[];
  createdBy: Types.ObjectId;
  section: Types.ObjectId;
  //
  id: Types.ObjectId;
  updatedBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
