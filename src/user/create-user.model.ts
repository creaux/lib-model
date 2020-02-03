import { IsInstance, IsString, ValidateNested } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { CreateEntityAbstract } from '../create-entity.abstract';
import { L10nModel } from '../common/l10n.model';
import { ApiModelProperty } from '@nestjs/swagger';
import { LanguageEnum, LocationEnum } from '../common';
import { Types } from 'mongoose';

export class CreateUserModel extends CreateEntityAbstract {
  @IsString()
  @ApiModelProperty({
    required: true,
    type: String,
    example: 'James',
  })
  @Expose()
  public readonly forname!: string;

  @ApiModelProperty({
    required: true,
    type: String,
    example: 'Donovan',
  })
  @IsString()
  @Expose()
  public readonly surname!: string;

  @ApiModelProperty({
    required: true,
    type: String,
    example: 'james@donovan.xy',
  })
  @IsString()
  @Expose()
  public readonly email!: string;

  @ApiModelProperty({
    required: true,
    type: String,
    example: '12345',
  })
  @IsString()
  @Expose()
  public readonly password!: string;

  @ApiModelProperty({
    required: true,
    type: [Types.ObjectId],
    isArray: true,
    example: ['5e021e7c909b5abd8afb0ba5'],
  })
  @IsString()
  @Expose()
  public readonly roles!: string[];

  // TODO: Test
  @ApiModelProperty({
    required: true,
    type: L10nModel,
    example: new L10nModel({
      language: LanguageEnum.EN,
      location: LocationEnum.US,
    }),
  })
  @IsInstance(L10nModel)
  @ValidateNested()
  @Type(() => L10nModel)
  @Expose()
  public readonly l10n!: L10nModel;

  public constructor(data: Partial<CreateUserModel>) {
    super();

    Object.assign(this, data);
  }
}
