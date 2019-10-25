import { PostStateEnum } from './post-state.enum';
import { PostModel } from './post.model';
import { Document } from 'mongoose';

export interface PostSchemaInterface extends PostModel, Document {
  readonly title: string;
  readonly subtitle: string;
  readonly content: string;
  readonly image: string;
  readonly state: PostStateEnum;
  readonly labels: string[];
  readonly createdBy: string;
  readonly section: string;
  readonly id: string;
  readonly updatedBy: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly _id: string;
}
