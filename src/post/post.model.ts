import { Types } from 'mongoose';
import { PostStateEnum } from './post-state.enum';

export class PostModel {
  constructor(
    public readonly title: string,
    public readonly subtitle: string,
    public readonly content: string,
    public readonly image: string,
    public readonly state: PostStateEnum,
    public readonly labels: string[],
    public readonly createdBy: Types.ObjectId,
    public readonly section: Types.ObjectId,
    public readonly id: Types.ObjectId,
    public readonly updatedBy: Types.ObjectId,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
