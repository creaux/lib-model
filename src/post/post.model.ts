import { IsMongoId, IsDateString } from 'class-validator';
import { PostStateEnum } from './post-state.enum';
import { CreatePostModel } from './create-post.model';

export class PostModel extends CreatePostModel {
  public static MOCK_PROPERTIES = {
    title: 'Mocked Post Title',
    subtitle: 'Mocked Post Subtitle',
    content: 'Mocked Post Content',
    image: 'https://picsum.photos/200/300',
    state: PostStateEnum.DRAFT,
    labels: ['label1', 'label2', 'label3'],
    createdBy: '507f1f77bcf86cd799439011',
    section: '507f1f77bcf86cd799439011',
    id: '507f1f77bcf86cd799439011',
    updatedBy: '507f1f77bcf86cd799439011',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  public static MOCK = new PostModel(
    PostModel.MOCK_PROPERTIES.title,
    PostModel.MOCK_PROPERTIES.subtitle,
    PostModel.MOCK_PROPERTIES.content,
    PostModel.MOCK_PROPERTIES.image,
    PostModel.MOCK_PROPERTIES.state,
    PostModel.MOCK_PROPERTIES.labels,
    PostModel.MOCK_PROPERTIES.createdBy,
    PostModel.MOCK_PROPERTIES.section,
    PostModel.MOCK_PROPERTIES.id,
    PostModel.MOCK_PROPERTIES.updatedBy,
    PostModel.MOCK_PROPERTIES.createdAt,
    PostModel.MOCK_PROPERTIES.updatedAt,
  );

  @IsMongoId()
  public readonly id: string;

  @IsMongoId()
  public readonly updatedBy: string;

  @IsDateString()
  public readonly createdAt: string;

  @IsDateString()
  public readonly updatedAt: string;

  public constructor(
    title: string,
    subtitle: string,
    content: string,
    image: string,
    state: PostStateEnum,
    labels: string[],
    createdBy: string,
    section: string,
    id: string,
    updatedBy: string,
    createdAt: string,
    updatedAt: string,
  ) {
    super(title, subtitle, content, image, state, labels, createdBy, section);

    this.id = id;
    this.updatedBy = updatedBy;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
