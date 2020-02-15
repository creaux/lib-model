import { IsArray, IsDefined, IsInstance, IsMongoId, IsString } from 'class-validator';
import { RoleModel } from './role.model';
import { Exclude, Type } from 'class-transformer';
import { L10nModel } from '../common/l10n.model';
import { LanguageEnum, LocationEnum } from '../common';

export class UserPopulatedModel {
  public static MOCK_PROPERTIES = {
    id: '000000000000000000000e00',
    forname: 'Frantisek',
    surname: 'Votrapa',
    email: 'frantisek@votrapa.cz',
    password: '12345',
    roles: [{ name: 'Superadmin', id: '000000000000000000000e00' }],
    l10n: new L10nModel({ location: LocationEnum.US, language: LanguageEnum.EN }),
  };

  public static MOCK = new UserPopulatedModel(UserPopulatedModel.MOCK_PROPERTIES);

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

  @IsDefined()
  @IsInstance(L10nModel)
  @Type(() => L10nModel)
  public readonly l10n!: L10nModel;

  constructor(args: UserPopulatedModel) {
    Object.assign(this, args);
  }
}
