import { PostStateEnum } from './post-state.enum';
import { IsString, IsUrl, IsEnum, IsMongoId, Length, IsArray } from 'class-validator';

export class CreatePostModel {
  public static MOCK_PROPERTIES = {
    title: 'Mocked Post Title',
    subtitle: 'Mocked Post Subtitle',
    content: 'Mocked Post Content',
    image: 'https://picsum.photos/200/300',
    state: PostStateEnum.DRAFT,
    labels: ['label1', 'label2', 'label3'],
    createdBy: '000000000000000000000a00',
    section: '00000000000000000000000a',
  };

  public static MOCK = new CreatePostModel(CreatePostModel.MOCK_PROPERTIES);

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

  @IsMongoId()
  public readonly createdBy!: string;

  @IsMongoId()
  public readonly section!: string;

  public constructor(model: CreatePostModel) {
    Object.assign(this, model);
  }
}
