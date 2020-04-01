import { PostStateEnum } from '../../enums/post-state.enum';
import { IsString, IsUrl, IsEnum, IsMongoId, Length, IsArray, IsDefined } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';
import { SectionExistsConstrain } from '../../constrains/section-exists.constrain';
import { BuilderInterface } from '../../generics/builder.interface';
import { lorem, image } from 'faker';
import { Types } from 'mongoose';
import { Injectable } from '../../framework/injector';
import { AssignMockeries, MockeriesInterface } from '../../framework/mockeries';
import { UserExistsConstrain } from '../../constrains/user-exists.constrain';

export class CreatePostBuilderAbstract {
  protected title!: string;
  protected subtitle!: string;
  protected content!: string;
  protected image!: string; // TODO ImageModel
  protected state!: PostStateEnum;
  protected labels!: string[];
  protected createdBy!: string;
  protected section!: string;
}

@Injectable()
export class CreatePostBuilder extends CreatePostBuilderAbstract implements BuilderInterface<CreatePostModel> {
  public withTitle(title: string) {
    this.title = title;
    return this;
  }

  public withSubtitle(subtitle: string) {
    this.subtitle = subtitle;
    return this;
  }

  public withContent(content: string) {
    this.content = content;
    return this;
  }

  public withImage(image: string) {
    this.image = image;
    return this;
  }

  public withState(state: PostStateEnum) {
    this.state = state;
    return this;
  }

  public withLabels(labels: string[]) {
    this.labels = labels;
    return this;
  }

  public withCreatedBy(createdBy: string) {
    this.createdBy = createdBy;
    return this;
  }

  public withSection(section: string) {
    this.section = section;
    return this;
  }

  build(): CreatePostModel {
    return new CreatePostModel({
      title: this.title,
      subtitle: this.subtitle,
      content: this.content,
      image: this.image,
      state: this.state,
      labels: this.labels,
      createdBy: this.createdBy,
      section: this.section,
    });
  }
}

@Injectable()
export class CreatePostMockeries extends CreatePostBuilder implements MockeriesInterface<CreatePostModel> {
  public mockTitle() {
    return this.withTitle(lorem.words());
  }

  public mockSubtitle() {
    return this.withSubtitle(lorem.words());
  }

  public mockContent() {
    return this.withContent(lorem.words());
  }

  public mockImage() {
    return this.withImage(image.imageUrl());
  }

  public mockState() {
    return this.withState(PostStateEnum.DRAFT);
  }

  public mockLabels() {
    return this.withLabels([lorem.word()]);
  }

  public mockCreatedBy() {
    return this.withCreatedBy(Types.ObjectId().toHexString());
  }

  public mockSection() {
    return this.withSection(Types.ObjectId().toHexString());
  }

  public mock(): CreatePostModel {
    return this.mockTitle()
      .mockSubtitle()
      .mockContent()
      .mockState()
      .mockImage()
      .mockLabels()
      .mockCreatedBy()
      .mockSection()
      .build();
  }
}

@AssignMockeries(CreatePostMockeries)
export class CreatePostModel {
  @ApiModelProperty({
    required: true,
    type: String,
    example: 'Mocked Post Title',
  })
  @IsString()
  @Length(1, 120)
  @IsDefined()
  @Expose()
  public readonly title!: string;

  @ApiModelProperty({
    type: String,
    example: 'Mocked Post Subtitle',
  })
  @IsString()
  @Length(1, 360)
  @IsDefined()
  @Expose()
  public readonly subtitle!: string;

  @ApiModelProperty({
    type: String,
    example: 'Mocked Post Content',
  })
  @IsString()
  @Length(1)
  @IsDefined()
  @Expose()
  public readonly content!: string;

  @ApiModelProperty({
    type: String,
    example: 'https://picsum.photos/200/300',
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
    isArray: true,
    example: ['label1', 'label2', 'label3'],
  })
  @IsString({ each: true })
  @IsArray()
  @Expose()
  public readonly labels!: string[];

  @ApiModelProperty({
    type: String,
    example: '000000000000000000000a00',
  })
  @IsDefined()
  @IsMongoId()
  @UserExistsConstrain.decorator()
  @Expose()
  public readonly createdBy!: string;

  @ApiModelProperty({
    type: String,
    example: '00000000000000000000000a',
  })
  @IsMongoId()
  @IsDefined()
  @SectionExistsConstrain.decorator()
  @Expose()
  public readonly section!: string;

  public constructor(model: CreatePostModel) {
    Object.assign(this, model);
  }
}
