import { IsEmail, IsString } from 'class-validator';
import { AssignMockeries, MockeriesInterface } from '../../framework/mockeries';
import { internet } from 'faker';
import { BuilderInterface } from '../../generics/builder.interface';
import { Injectable } from '../../framework/injector';

export abstract class AuthSigninBuilderAbstract {
  protected email!: string;
  protected password!: string;
}

@Injectable()
export class AuthSignInBuilder extends AuthSigninBuilderAbstract implements BuilderInterface<AuthSignInModel> {
  public withEmail(email: string): AuthSignInBuilder {
    this.email = email;
    return this;
  }

  public withPassword(password: string): AuthSignInBuilder {
    this.password = password;
    return this;
  }

  public build(): AuthSignInModel {
    return new AuthSignInModel({ email: this.email, password: this.password });
  }
}

@Injectable()
export class AuthSigninMockeries extends AuthSignInBuilder implements MockeriesInterface<AuthSignInModel> {
  public mockPassword(): AuthSigninMockeries {
    this.withPassword(internet.password());
    return this;
  }

  public mockEmail(): AuthSigninMockeries {
    this.withEmail(internet.email());
    return this;
  }

  public mock(): AuthSignInModel {
    return this.mockEmail()
      .mockPassword()
      .build();
  }
}

@AssignMockeries(AuthSigninMockeries)
export class AuthSignInModel {
  @IsEmail()
  public readonly email!: string;

  @IsString()
  public readonly password!: string;

  public constructor(model: AuthSignInModel) {
    Object.assign(this, model);
  }
}
