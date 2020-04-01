import { IsArray, IsDefined, IsInstance, IsMongoId, IsString } from 'class-validator';
import { RoleModel } from '../role/role.model';
import { Exclude, Type, Expose } from 'class-transformer';
import { L10nModel } from '../l10n/l10n.model';
import { LanguageEnum } from '../../enums/language.enum';
import { LocationEnum } from '../../enums/location.enum';

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
  @Exclude({ toPlainOnly: true })
  @Expose({ toClassOnly: true })
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
