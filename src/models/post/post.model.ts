import { IsArray, IsDateString, IsEnum, IsMongoId, IsString, IsUrl, Length, ValidateNested } from 'class-validator';
import { PostStateEnum } from '../../enums/post-state.enum';
import { Types } from 'mongoose';
import { SectionModel } from '../section/section.model';
import { BuilderInterface } from '../../generics/builder.interface';
import { lorem } from 'faker';
import { UserModel } from '../user/user.model';
import { Injectable } from '../../framework/injector';
import { AssignMockeries, MockeriesInterface, Retrieve } from '../../framework/mockeries';
import { ImageModel } from '../image/image.model';
import { Type } from 'class-transformer';

export class PostBuilderAbstract {
  protected id!: string;
  protected title!: string;
  protected subtitle!: string;
  protected content!: string;
  protected image!: ImageModel;
  protected state!: PostStateEnum;
  protected createdBy!: UserModel;
  protected section!: SectionModel;
  protected updatedBy!: UserModel;
  protected createdAt!: string;
  protected updatedAt!: string;
  protected labels!: string[];
}

@Injectable()
export class PostBuilder extends PostBuilderAbstract implements BuilderInterface<PostModel> {
  withId(id: string) {
    this.id = id;
    return this;
  }

  withTitle(title: string) {
    this.title = title;
    return this;
  }

  withSubtitle(subtitle: string) {
    this.subtitle = subtitle;
    return this;
  }

  withContent(content: string) {
    this.content = content;
    return this;
  }

  withImage(image: ImageModel) {
    this.image = image;
    return this;
  }

  withState(state: PostStateEnum) {
    this.state = state;
    return this;
  }

  withCreatedBy(createdBy: UserModel) {
    this.createdBy = createdBy;
    return this;
  }

  withCreatedAt(createdAt: string) {
    this.createdAt = createdAt;
    return this;
  }

  withUpdatedAt(updatedAt: string) {
    this.updatedAt = updatedAt;
    return this;
  }

  withUpdatedBy(updatedBy: UserModel) {
    this.updatedBy = updatedBy;
    return this;
  }

  withSection(section: SectionModel) {
    this.section = section;
    return this;
  }

  withLabels(labels: string[]) {
    this.labels = labels;
    return this;
  }

  build(): PostModel {
    return new PostModel({
      id: this.id,
      title: this.title,
      subtitle: this.subtitle,
      content: this.content,
      state: this.state,
      createdBy: this.createdBy,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      updatedBy: this.updatedBy,
      image: this.image,
      section: this.section,
      labels: this.labels,
    });
  }
}

@Injectable()
export class PostMockeries extends PostBuilder implements MockeriesInterface<PostModel> {
  mockId() {
    return this.withId(Types.ObjectId().toHexString());
  }

  mockTitle() {
    return this.withTitle(lorem.words());
  }

  mockSubtitle() {
    return this.withSubtitle(lorem.words());
  }

  mockContent() {
    return this.withContent(lorem.paragraphs());
  }

  @Retrieve(ImageModel)
  mockImage(imageModel: ImageModel) {
    return this.withImage(imageModel);
  }

  mockState() {
    return this.withState(PostStateEnum.DRAFT);
  }

  mockLabels() {
    return this.withLabels([lorem.word()]);
  }

  @Retrieve(UserModel)
  mockCreatedBy(userModel: UserModel) {
    return this.withCreatedBy(userModel);
  }

  @Retrieve(SectionModel)
  mockSection(sectionModel: SectionModel) {
    return this.withSection(sectionModel);
  }

  @Retrieve(UserModel)
  mockUpdatedBy(userModel: UserModel) {
    return this.withUpdatedBy(userModel);
  }

  mockCreatedAt() {
    return this.withCreatedAt(new Date().toISOString());
  }

  mockUpdatedAt() {
    return this.withUpdatedAt(new Date().toISOString());
  }

  mock(): PostModel {
    return (
      this.mockId()
        .mockId()
        .mockTitle()
        .mockSubtitle()
        .mockContent()
        // @ts-ignore
        .mockImage()
        .mockState()
        .mockLabels()
        // @ts-ignore
        .mockCreatedBy()
        // @ts-ignore
        .mockSection()
        // @ts-ignore
        .mockUpdatedBy()
        .mockCreatedAt()
        .mockUpdatedAt()
        .build()
    );
  }
}

@AssignMockeries(PostMockeries)
export class PostModel {
  @IsMongoId()
  public readonly id!: string;

  @ValidateNested()
  public readonly updatedBy!: UserModel;

  @IsDateString()
  public readonly createdAt!: string;

  @IsDateString()
  public readonly updatedAt!: string;

  @IsString()
  @Length(1, 120)
  public readonly title!: string;

  @IsString()
  @Length(1, 360)
  public readonly subtitle!: string;

  @IsString()
  public readonly content!: string;

  @ValidateNested()
  @Type(() => ImageModel)
  public readonly image!: ImageModel;

  @IsEnum(PostStateEnum)
  public readonly state!: PostStateEnum;

  @IsString({ each: true })
  @IsArray()
  public readonly labels!: string[];

  @ValidateNested()
  public readonly createdBy!: UserModel;

  @IsMongoId()
  public readonly section!: SectionModel;

  public constructor(model: PostModel) {
    Object.assign(this, model);
  }
}
