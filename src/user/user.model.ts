import { IsArray } from 'class-validator';
import { RoleModel } from './role.model';
import { UserAbstract } from './user.abstract';

export class UserModel extends UserAbstract {
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

  @IsArray()
  public readonly roles!: RoleModel[];

  public constructor(partial: Partial<UserModel>) {
    super();
    Object.assign(this, partial);
  }
}
