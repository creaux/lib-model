import { IsEmail, IsString } from 'class-validator';

export class AuthSignInModel {
  public static MOCK_PROPERTIES = {
    email: 'karel@vomacka.cz',
    password: '12345',
  };
  public static MOCK = new AuthSignInModel({
    email: AuthSignInModel.MOCK_PROPERTIES.email,
    password: AuthSignInModel.MOCK_PROPERTIES.password,
  });

  @IsEmail()
  public readonly email!: string;

  @IsString()
  public readonly password!: string;

  public constructor(model: AuthSignInModel) {
    Object.assign(this, model);
  }
}
