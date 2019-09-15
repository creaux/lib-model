import { Types, Document } from 'mongoose';
import { PostStateEnum } from './post-state.enum';

export interface PostModel extends Document {
  title: string;
  subtitle: string;
  content: string;
  image: string;
  state: PostStateEnum;
  labels: string[];
  createdBy: Types.ObjectId;
  section: Types.ObjectId;
  //
  id: Types.ObjectId;
  updatedBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
