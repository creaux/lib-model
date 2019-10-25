import { IsMongoId, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';

export class UserModel {
  public static MOCK_PROPERTIES = {
    forname: 'Frantisek',
    surname: 'Votrapa',
    email: 'frantisek@votrapa.cz',
    password: '12345',
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

  public constructor(partial: Partial<UserModel>) {
    Object.assign(this, partial);
  }
}
