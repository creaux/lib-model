import { IsEnum } from 'class-validator';
import { Expose } from 'class-transformer';
import { LanguageEnum } from '../../enums/language.enum';
import { LocationEnum } from '../../enums/location.enum';
import { ApiModelProperty } from '@nestjs/swagger';
import { AssignMockeries, MockeriesInterface } from '../../framework/mockeries';
import { BuilderInterface } from '../../generics/builder.interface';
import { Injectable } from '../../framework/injector';

export abstract class L10nBuilderAbstract {
  protected language!: LanguageEnum;
  protected location!: LocationEnum;
}

@Injectable()
export class L10nBuilder extends L10nBuilderAbstract implements BuilderInterface<L10nModel> {
  public withLanguage(language: LanguageEnum) {
    this.language = language;
    return this;
  }

  public withLocation(location: LocationEnum) {
    this.location = location;
    return this;
  }

  build(): L10nModel {
    return new L10nModel({ language: this.language, location: this.location });
  }
}

@Injectable()
export class L10nMockeries extends L10nBuilder implements MockeriesInterface<L10nModel> {
  public mockLanguage() {
    return this.withLanguage(LanguageEnum.EN);
  }

  public mockLocation() {
    return this.withLocation(LocationEnum.US);
  }

  mock(): L10nModel {
    return this.mockLanguage()
      .mockLocation()
      .build();
  }
}

@AssignMockeries(L10nMockeries)
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
