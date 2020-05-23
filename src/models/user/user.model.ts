import { IsArray, IsInstance, IsMongoId, IsString, ValidateNested } from 'class-validator';
import { RoleModel, RoleModelMockerizer } from '../role/role.model';
import { Exclude, Expose, Type } from 'class-transformer';
import { L10nMockeries, L10nModel } from '../l10n/l10n.model';
import { AssignMockeries, MockeriesInterface, Retrieve } from '../../framework/mockeries';
import { internet, name } from 'faker';
import { BuilderInterface } from '../../generics/builder.interface';
import { Types } from 'mongoose';
import { Injectable } from '../../framework/injector';
import { AssignSchema, AssignSchemaOptions } from '../../framework/schema';
import { UserSchema } from '../../schemas/user/user.schema';
import { SchemaName } from '../../enums/schema-name';

export abstract class UserBuilderAbstract {
  id!: string;
  forname!: string;
  surname!: string;
  email!: string;
  password!: string;
  roles!: RoleModel[];
  l10n!: L10nModel;
}

@Injectable()
export class UserBuilder extends UserBuilderAbstract implements BuilderInterface<UserModel> {
  public withId(id: string) {
    this.id = id;
    return this;
  }
  public withForname(forname: string) {
    this.forname = forname;
    return this;
  }

  public withSurname(surname: string) {
    this.surname = surname;
    return this;
  }

  public withEmail(email: string) {
    this.email = email;
    return this;
  }

  public withPassword(password: string) {
    this.password = password;
    return this;
  }

  public withRoles(roles: RoleModel[]) {
    this.roles = roles;
    return this;
  }

  public withL10n(l10n: L10nModel) {
    this.l10n = l10n;
    return this;
  }

  build(): UserModel {
    return new UserModel({
      id: this.id,
      forname: this.forname,
      surname: this.surname,
      email: this.email,
      password: this.password,
      roles: this.roles,
      l10n: this.l10n,
    });
  }
}

@Injectable()
export class UserMockeries extends UserBuilder implements MockeriesInterface<UserModel> {
  public mockId(): UserMockeries {
    this.withId(Types.ObjectId().toHexString());
    return this;
  }

  public mockForname(): UserMockeries {
    this.withForname(name.firstName());
    return this;
  }

  public mockSurname(): UserMockeries {
    this.withSurname(name.lastName());
    return this;
  }

  public mockEmail(): UserMockeries {
    this.withEmail(internet.email());
    return this;
  }

  public mockPassword(): UserMockeries {
    this.withPassword(internet.password());
    return this;
  }

  @Retrieve(RoleModel)
  public mockRoles(rolesModel?: RoleModel[]): UserMockeries {
    // @ts-ignore
    this.withRoles(rolesModel);
    return this;
  }

  @Retrieve(L10nModel)
  public mockL10n(l10nMock?: L10nModel): UserMockeries {
    // @ts-ignore
    this.withL10n(l10nMock);
    return this;
  }

  mock(): UserModel {
    return this.mockForname()
      .mockId()
      .mockSurname()
      .mockPassword()
      .mockEmail()
      .mockL10n()
      .mockRoles()
      .build();
  }
}

@AssignMockeries(UserMockeries)
@AssignSchema(new AssignSchemaOptions(UserSchema, SchemaName.USER))
export class UserModel {
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
  @ValidateNested()
  @IsInstance(RoleModel, { each: true })
  @Type(() => RoleModel)
  public readonly roles!: RoleModel[];

  // TODO: Test
  @IsInstance(L10nModel)
  @ValidateNested()
  @Type(() => L10nModel)
  @Expose()
  public readonly l10n!: L10nModel;

  constructor(params: Partial<UserModel>) {
    Object.assign(this, params);
  }

  @Exclude()
  public get withoutPassword() {
    return new UserModel({
      id: this.id,
      forname: this.forname,
      surname: this.surname,
      email: this.email,
      roles: this.roles,
      l10n: this.l10n,
    });
  }
}
