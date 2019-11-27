import { IsMongoId, IsDateString, IsString, Length, IsUrl, IsEnum, IsArray, ValidateNested } from 'class-validator';
import { PostStateEnum } from './post-state.enum';
import { UserModel } from '../user';

export class PostModel {
  public static MOCK_PROPERTIES: PostModel = {
    title: 'Mocked Post Title',
    subtitle: 'Mocked Post Subtitle',
    content: 'Mocked Post Content',
    image: 'https://picsum.photos/200/300',
    state: PostStateEnum.DRAFT,
    labels: ['label1', 'label2', 'label3'],
    createdBy: UserModel.MOCK,
    section: '507f1f77bcf86cd799439011',
    id: '507f1f77bcf86cd799439011',
    updatedBy: UserModel.MOCK,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  public static MOCK: PostModel = new PostModel(PostModel.MOCK_PROPERTIES);

  @IsMongoId()
  public readonly id!: string;

  @ValidateNested()
  public readonly updatedBy!: UserModel;

  @IsDateString()
  public readonly createdAt!: string;

  @IsDateString()
  public readonly updatedAt!: string;

  @IsString()
  @Length(0, 120)
  public readonly title!: string;

  @IsString()
  @Length(0, 360)
  public readonly subtitle!: string;

  @IsString()
  public readonly content!: string;

  @IsUrl()
  public readonly image!: string;

  @IsEnum(PostStateEnum)
  public readonly state!: PostStateEnum;

  @IsString({ each: true })
  @IsArray()
  public readonly labels!: string[];

  @ValidateNested()
  public readonly createdBy!: UserModel;

  @IsMongoId()
  public readonly section!: string;

  public constructor(model: PostModel) {
    Object.assign(this, model);
  }
}
