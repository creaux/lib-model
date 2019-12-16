import { IsArray, IsMongoId, IsString } from 'class-validator';
import { RoleModel } from './role.model';
import { UserAbstract } from './user.abstract';
import { Exclude } from 'class-transformer';

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

  constructor({ id, roles, password, email, forname, surname }: UserModel) {
    this.roles = roles;
    this.id = id;
    this.password = password;
    this.email = email;
    this.forname = forname;
    this.surname = surname;
  }
}
