import { IsArray, IsInstance, IsMongoId, IsString, ValidateNested } from 'class-validator';
import { RoleModel } from './role.model';
import { Exclude, Expose, Type } from 'class-transformer';
import { L10nModel } from '../common/l10n.model';
import { LanguageEnum, LocationEnum } from '../common';

export class UserModel {
  public static MOCK_PROPERTIES = {
    forname: 'Frantisek',
    surname: 'Votrapa',
    email: 'frantisek@votrapa.cz',
    password: '12345',
    roles: [
      {
        id: '5dc84787046b05067ec1adc5',
        name: 'Executive',
      },
    ],
    id: '5dde8b96ed14209384f74d14',
    l10n: new L10nModel({
      language: LanguageEnum.EN,
      location: LocationEnum.US,
    }),
  };

  public static MOCK = new UserModel(UserModel.MOCK_PROPERTIES);

  @IsString()
  public readonly forname!: string;

  @IsString()
  public readonly surname!: string;

  @IsString()
  public readonly email!: string;

  @IsMongoId()
  public readonly id!: string;

  @IsString()
  @Exclude()
  public readonly password!: string;

  @IsArray()
  public readonly roles!: RoleModel[];

  // TODO: Test
  @IsInstance(L10nModel)
  @ValidateNested()
  @Type(() => L10nModel)
  @Expose()
  public readonly l10n!: L10nModel;

  constructor(params: UserModel) {
    Object.assign(this, params);
  }
}
