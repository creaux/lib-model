import { UserAbstract } from './user.abstract';
import { IsArray, IsMongoId, IsString } from 'class-validator';
import { RoleModel } from './role.model';
import { Exclude } from 'class-transformer';

export class UserPopulatedModel {
  public static MOCK_PROPERTIES = {
    id: '000000000000000000000e00',
    forname: 'Frantisek',
    surname: 'Votrapa',
    email: 'frantisek@votrapa.cz',
    password: '12345',
    roles: [{ name: 'Superadmin', id: '000000000000000000000e00' }],
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

  public constructor({ id, forname, surname, email, password, roles }: UserPopulatedModel) {
    this.id = id;
    this.forname = forname;
    this.surname = surname;
    this.email = email;
    this.password = password;
    this.roles = roles;
  }
}
