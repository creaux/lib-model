import { IsDateString, IsMongoId, IsString } from 'class-validator';
import { UserModel } from '../user/user.model';
import { AssignMockeries, MockeriesInterface } from '../../framework/mockeries';
import { Types } from 'mongoose';
import { BuilderInterface } from '../../generics/builder.interface';
import { UserMockeries } from '../user/user.model';
import { Injectable } from '../../framework/injector';

export const FAKE_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoia2FyZWxAdm9tYWNrYS5jeiIsImlhdCI6MTU3MTE2NTE1OX0.ih5PGF04BBOcQlozmfd9DoyKgP4VzFYZh59aD02S3vw';

export abstract class AuthSuccessModelAbstract {
  protected id!: string;
  protected token!: string;
  protected user!: UserModel;
  protected createdAt!: string;
}

@Injectable()
export class AuthSuccessBuilder extends AuthSuccessModelAbstract implements BuilderInterface<AuthSuccessModel> {
  public withId(id: string): AuthSuccessBuilder {
    this.id = id;
    return this;
  }

  public withToken(token: string): AuthSuccessBuilder {
    this.token = token;
    return this;
  }

  public withUser(user: UserModel): AuthSuccessBuilder {
    this.user = user;
    return this;
  }

  public withCreatedAt(createdAt: string): AuthSuccessBuilder {
    this.createdAt = createdAt;
    return this;
  }

  public build(): AuthSuccessModel {
    return new AuthSuccessModel({ id: this.id, token: this.token, user: this.user, createdAt: this.createdAt });
  }
}

@Injectable()
export class AuthSuccessMockeries extends AuthSuccessBuilder implements MockeriesInterface<AuthSuccessModel> {
  constructor(private userMockeries: UserMockeries) {
    super();
  }

  public mockId(): AuthSuccessMockeries {
    this.withId(Types.ObjectId().toHexString());
    return this;
  }

  public mockToken(): AuthSuccessMockeries {
    this.withToken(FAKE_TOKEN);
    return this;
  }

  public mockUser(): AuthSuccessMockeries {
    this.withUser(this.userMockeries.mock());
    return this;
  }

  public mockCreatedAt(): AuthSuccessMockeries {
    this.withCreatedAt(new Date().toDateString());
    return this;
  }

  public mock(): AuthSuccessModel {
    return this.mockId()
      .mockToken()
      .mockUser()
      .mockCreatedAt()
      .build();
  }
}

// TODO: Rename to AuthModel
@AssignMockeries(AuthSuccessMockeries)
export class AuthSuccessModel {
  @IsMongoId()
  public readonly id?: string;

  @IsString()
  public readonly token!: string;

  @IsString()
  public readonly user!: UserModel;

  @IsDateString()
  public readonly createdAt?: string;

  public constructor(partial: Partial<AuthSuccessModel>) {
    Object.assign(this, partial);
  }
}
