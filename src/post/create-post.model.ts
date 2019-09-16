import { Types } from 'mongoose';
import { PostStateEnum } from './post-state.enum';

export class CreatePostModel {
  public constructor(
    public readonly title: string,
    public readonly subtitle: string,
    public readonly content: string,
    public readonly image: string,
    public readonly state: PostStateEnum,
    public readonly labels: string[],
    public readonly createdBy: Types.ObjectId,
    public readonly section: Types.ObjectId,
  ) {}
}
