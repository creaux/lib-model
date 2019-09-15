import { Types } from 'mongoose';

import { PostState } from './post-state.enum';

export class CreatePostDto {
  public readonly title: string;
  public readonly subtitle: string;
  public readonly content: string;
  public readonly image: string;
  public readonly state: PostState;
  public readonly labels: string[];
  public readonly createdBy: Types.ObjectId;
  public readonly section: Types.ObjectId;
}
