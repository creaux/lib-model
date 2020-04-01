import { CreateEntityAbstract } from '../create-entity.abstract';
import { AssignMockeries, MockeriesInterface } from '../../framework/mockeries';
import { FAKE_TOKEN } from './auth-success.model';
import { Types } from 'mongoose';
import { BuilderInterface } from '../../generics/builder.interface';
import { Injectable } from '../../framework/injector';

export abstract class CreateAuthModelAbstract {
  protected id!: string;
  protected user!: string;
  protected token!: string;
}

@Injectable()
export class CreateAuthModelBuilder extends CreateAuthModelAbstract implements BuilderInterface<CreateAuthModel> {
  public withId(id: string) {
    this.id = id;
    return this;
  }

  public withUser(user: string) {
    this.user = user;
    return this;
  }

  public withToken(token: string) {
    this.token = token;
    return this;
  }

  build(): CreateAuthModel {
    return new CreateAuthModel({ user: this.user, token: this.token });
  }
}

@Injectable()
export class CreateAuthMockeries extends CreateAuthModelBuilder implements MockeriesInterface<CreateAuthModel> {
  public mockId() {
    return this.withId(Types.ObjectId().toHexString());
  }

  public mockUser() {
    return this.withUser(Types.ObjectId().toHexString());
  }

  public mockToken() {
    return this.withToken(FAKE_TOKEN);
  }

  mock(): CreateAuthModel {
    return this.mockId()
      .mockUser()
      .mockToken()
      .build();
  }
}

@AssignMockeries(CreateAuthMockeries)
export class CreateAuthModel extends CreateEntityAbstract {
  public readonly user!: string;

  public readonly token!: string;

  constructor(model: Partial<CreateAuthModel>) {
    super();
    Object.assign(this, model);
  }
}
