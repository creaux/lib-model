import { PostStateEnum } from './post-state.enum';
import { IsString, IsUrl, IsEnum, IsMongoId, Length, IsArray, IsDefined } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';

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

  @ApiModelProperty({
    required: true,
    type: String,
    example: CreatePostModel.MOCK.title,
  })
  @IsString()
  @Length(1, 120)
  @IsDefined()
  @Expose()
  public readonly title!: string;

  @ApiModelProperty({
    type: String,
    example: CreatePostModel.MOCK.subtitle,
  })
  @IsString()
  @Length(1, 360)
  @IsDefined()
  @Expose()
  public readonly subtitle!: string;

  @ApiModelProperty({
    type: String,
    example: CreatePostModel.MOCK.content,
  })
  @IsString()
  @Length(1)
  @IsDefined()
  @Expose()
  public readonly content!: string;

  @ApiModelProperty({
    type: String,
    example: CreatePostModel.MOCK.image,
  })
  @IsUrl()
  @IsDefined()
  @Expose()
  public readonly image!: string;

  @ApiModelProperty({
    enum: [PostStateEnum.DRAFT, PostStateEnum.PUBLISHED, PostStateEnum.ARCHIVED],
    type: PostStateEnum,
    example: PostStateEnum.DRAFT,
  })
  @IsEnum(PostStateEnum)
  @IsDefined()
  @Expose()
  public readonly state!: PostStateEnum;

  @ApiModelProperty({
    type: String,
    example: CreatePostModel.MOCK.labels,
    isArray: true,
  })
  @IsString({ each: true })
  @IsArray()
  @Expose()
  public readonly labels!: string[];

  @ApiModelProperty({
    type: String,
    example: CreatePostModel.MOCK.createdBy,
  })
  @IsDefined()
  @IsMongoId()
  @Expose()
  public readonly createdBy!: string;

  @ApiModelProperty({
    type: String,
    example: CreatePostModel.MOCK.section,
  })
  @IsMongoId()
  @Expose()
  public readonly section!: string;

  public constructor(model: CreatePostModel) {
    Object.assign(this, model);
  }
}
