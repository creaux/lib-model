import { IsEnum } from 'class-validator';
import { Expose } from 'class-transformer';
import { LanguageEnum } from './language.enum';
import { LocationEnum } from './location.enum';
import { ApiModelProperty } from '@nestjs/swagger';

export class L10nModel {
  @ApiModelProperty({
    required: true,
    enum: LanguageEnum,
    example: LanguageEnum.EN,
  })
  @IsEnum(LanguageEnum)
  @Expose()
  public readonly language!: LanguageEnum;

  @ApiModelProperty({
    required: true,
    enum: LocationEnum,
    example: LocationEnum.US,
  })
  @IsEnum(LocationEnum)
  @Expose()
  public readonly location!: LocationEnum;

  constructor(params: L10nModel) {
    Object.assign(this, params);
  }
}
