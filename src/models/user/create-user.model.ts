import { IsInstance, IsMongoId, IsString, ValidateNested } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { L10nModel } from '../l10n/l10n.model';
import { LanguageEnum } from '../../enums/language.enum';
import { LocationEnum } from '../../enums/location.enum';
import { Injectable } from '../../framework/injector';
import { RoleModel } from '../role/role.model';
import { BuilderInterface } from '../../generics/builder.interface';
import { AssignMockeries, MockeriesInterface, Retrieve } from '../../framework/mockeries';
import { internet, name } from 'faker';
import { AssignSchema, AssignSchemaOptions } from '../../framework/schema';
import { UserSchema } from '../../schemas/user/user.schema';
import { SchemaName } from '../../enums/schema-name';
import { AssignReadUpdate, AssignReadUpdateOptions } from '../../framework/readUpdate';
import { UserModel } from './user.model';
import { CreateRoleModelMockeries } from '../role/create-role.model';

export abstract class CreateUserBuilderAbstract {
  _id!: string;
  forname!: string;
  surname!: string;
  email!: string;
  password!: string;
  roles!: string[];
  l10n!: L10nModel;
}

@Injectable()
export class CreateUserBuilder extends CreateUserBuilderAbstract implements BuilderInterface<CreateUserModel> {
  public withId(id: string) {
    this._id = id;
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

  public withRoles(roles: string[]) {
    this.roles = roles;
    return this;
  }

  public withL10n(l10n: L10nModel) {
    this.l10n = l10n;
    return this;
  }

  build(): CreateUserModel {
    return new CreateUserModel({
      _id: this._id,
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
export class CreateUserMockeries extends CreateUserBuilder implements MockeriesInterface<CreateUserModel> {
  public static ADMIN = '5ec059ac0d3440f899e635fa';

  public mockId(): CreateUserMockeries {
    this.withId(Types.ObjectId().toHexString());
    return this;
  }

  public mockForname(): CreateUserMockeries {
    this.withForname(name.firstName());
    return this;
  }

  public mockSurname(): CreateUserMockeries {
    this.withSurname(name.lastName());
    return this;
  }

  public mockEmail(): CreateUserMockeries {
    this.withEmail(internet.email());
    return this;
  }

  public mockPassword(): CreateUserMockeries {
    const password = internet.password();
    this.withPassword(password);
    return this;
  }

  @Retrieve(RoleModel)
  public mockRoles(rolesModel: RoleModel[]): CreateUserMockeries {
    // @ts-ignore
    this.withRoles(rolesModel.map((roleModel: RoleModel) => roleModel.id));
    return this;
  }

  @Retrieve(L10nModel)
  public mockL10n(l10nMock: L10nModel): CreateUserMockeries {
    this.withL10n(l10nMock);
    return this;
  }

  mock(): CreateUserModel {
    return (
      this.mockForname()
        .mockId()
        .mockSurname()
        .mockPassword()
        .mockEmail()
        // @ts-ignore
        .mockL10n()
        // @ts-ignore
        .mockRoles()
        .build()
    );
  }

  statics() {
    return [
      this.withId(CreateUserMockeries.ADMIN)
        .withForname('Karel')
        .withSurname('Vomacka')
        .withRoles(['5ec1a27d634e59e52fe0a6ab'])
        // @ts-ignore
        .mockL10n()
        .withEmail('karel@vomacka.com')
        .withPassword('12345')
        .build(),
    ];
  }
}

@AssignReadUpdate(new AssignReadUpdateOptions(UserModel))
@AssignMockeries(CreateUserMockeries)
@AssignSchema(new AssignSchemaOptions(UserSchema, SchemaName.USER))
@Injectable()
export class CreateUserModel {
  @IsMongoId()
  public readonly _id!: string;

  @IsString()
  @ApiModelProperty({
    required: true,
    type: String,
    example: 'James',
  })
  @Expose()
  public readonly forname!: string;

  @ApiModelProperty({
    required: true,
    type: String,
    example: 'Donovan',
  })
  @IsString()
  @Expose()
  public readonly surname!: string;

  @ApiModelProperty({
    required: true,
    type: String,
    example: 'james@donovan.xy',
  })
  @IsString()
  @Expose()
  public readonly email!: string;

  @ApiModelProperty({
    required: true,
    type: String,
    example: '12345',
  })
  @IsString()
  @Expose()
  public readonly password!: string;

  @ApiModelProperty({
    required: true,
    type: [Types.ObjectId],
    isArray: true,
    example: ['5e021e7c909b5abd8afb0ba5'],
  })
  @IsString()
  @Expose()
  public readonly roles!: string[];

  // TODO: Test
  @ApiModelProperty({
    required: true,
    type: L10nModel,
    example: new L10nModel({
      language: LanguageEnum.EN,
      location: LocationEnum.US,
    }),
  })
  @IsInstance(L10nModel)
  @ValidateNested()
  @Type(() => L10nModel)
  @Expose()
  public readonly l10n!: L10nModel;

  public constructor(data: CreateUserModel) {
    Object.assign(this, data);
  }
}
