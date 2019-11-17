import { UserAbstract } from './user.abstract';
import { IsArray } from 'class-validator';
import { RoleModel } from './role.model';

export class UserPopulatedModel extends UserAbstract {
  public static MOCK_PROPERTIES = {
    forname: 'Frantisek',
    surname: 'Votrapa',
    email: 'frantisek@votrapa.cz',
    password: '12345',
    roles: [{ name: 'Superadmin', id: '000000000000000000000e00' }],
  };

  public static MOCK = new UserPopulatedModel(UserPopulatedModel.MOCK_PROPERTIES);

  @IsArray()
  public readonly roles!: RoleModel[];

  public constructor(partial: Partial<UserPopulatedModel>) {
    super();
    Object.assign(this, partial);
  }
}
